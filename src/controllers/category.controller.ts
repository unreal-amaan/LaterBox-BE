import {
    createCategorySchema,
    updateCategorySchema,
} from "../validation/category.schema.js";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import { Category } from "../../global.js";

const nanoid = customAlphabet(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    12
);

class CategoryController {
    static async addCategory(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const parsedBody = createCategorySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.issues[0].message });
        }
        const category = parsedBody.data;

        const shareLink = nanoid();
        try {
            const newCategory = await prisma.category.create({
                data: {
                    ...category,
                    userId,
                    shareLink,
                },
            });
            console.table(newCategory);
            return res
                .status(201)
                .json(newCategory);
        } catch (error) {
            console.error(error);
            if ((error as any).code === "P2002")
                return res
                    .status(409)
                    .json({ message: "Category already exists" });
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        const categoryId = req.params.id;

        try {
            const deletedCategory = await prisma.category.delete({
                where: {
                    id: categoryId,
                },
            });
            console.table(deletedCategory);

            return res
                .status(200)
                .json(deletedCategory);
        } catch (error) {
            console.log(error);
            if ((error as any).code === "P2025") {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        const categoryId = req.params.id;
        const parsedBody = updateCategorySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.issues[0].message });
        }
        const category = parsedBody.data;
        try {
            const updatedCategory = await prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: category,
            });
            return res.status(200).json(updatedCategory);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getCategories(req: Request, res: Response): Promise<Response> {
        const userId = (req as any)?.user?.id;
        try {
            const userCategories = await prisma.category.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    created_at: true,
                    isPinned: true,
                    isPublic: true,
                    shareLink: true,
                    _count: {
                        select: {
                            savedLinks: true,
                        },
                    },
                },
                orderBy: { isPinned: "desc" },
            });
            const categories: Category[] = userCategories.map((c:any) => {
                return {
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    created_at: c.created_at ? c.created_at.toISOString(): "",
                    isPinned: c.isPinned,
                    isPublic: c.isPublic,
                    shareLink: c.shareLink ?? null,
                    count: c._count.savedLinks ?? 0,
                };
            })
            console.table(categories);
            return res.status(200).json( categories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getSharedCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        const categoryLink = req.params.id;
        try {
            const sharedCategory = await prisma.category.findFirst({
                where: {
                    shareLink: categoryLink,
                },
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                    isPublic: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                    savedLinks: {
                        select: {
                            title: true,
                            link: true,
                            note: true,
                            created_at: true,
                            isPinned: true,
                            tags: true,
                        },
                    },
                },
            });
            if (!sharedCategory)
                return res.status(404).json({ message: "Invalid link" });
            if (!sharedCategory.isPublic)
                return res
                    .status(403)
                    .json({
                        message: "This category is private and cannot be accessed",
                    });
            console.table(sharedCategory);
            return res.status(200).json(sharedCategory);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default CategoryController;
