import {
    CategoryPayload,
    LinkPayload,
    LinkUpdatePayload,
} from "../../global.js";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";
class UserController {
    static async addCategory(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const category: CategoryPayload = req.body;
        category.userId = userId;
        try {
            const newCategory = await prisma.category.create({
                data: category,
            });
            console.table(newCategory);
            return res
                .status(201)
                .json({ message: "Category created successfully" });
        } catch (error) {
            console.error(error);
            if ((error as any).code === "P2002")
                return res
                    .status(409)
                    .json({ error: "Category already exists" });
            return res.status(500).json({ error: "Internal server error" });
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
                .json({ message: "Category deleted successfully" });
        } catch (error) {
            console.log(error);
            if ((error as any).code === "P2025") {
                return res.status(404).json({ error: "Category not found" });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async updateCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        const categoryId = req.params.id;
        const { title } = req.body;
        try {
            await prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: {
                    title: title,
                },
            });
            return res.status(200).json({
                message: "Category updated successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getCategories(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        try {
            const userCategories = await prisma.category.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                },
            });
            console.table(userCategories);
            return res.status(200).json(userCategories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async addLink(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const link: LinkPayload = req.body;
        link.userId = userId;
        try {
            const newLink = await prisma.savedLink.create({
                data: link,
            });
            console.table(newLink);
            return res.status(201).json({
                message: "Link created successfully",
            });
        } catch (error) {
            console.error(error);
            if ((error as any).code === "P2002")
                return res.status(409).json({ error: "Link already exists" });
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async deleteLink(req: Request, res: Response): Promise<Response> {
        const linkId = req.params.id;

        try {
            const deletedLink = await prisma.savedLink.delete({
                where: {
                    id: linkId,
                },
            });
            console.table(deletedLink);
            return res
                .status(200)
                .json({ message: "Link deleted successfully" });
        } catch (error) {
            console.error(error);
            if ((error as any).code === "P2025") {
                return res.status(404).json({ error: "Link not found" });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async updateLink(req: Request, res: Response): Promise<Response> {
        const linkId = req.params.id;
        const newLink: LinkUpdatePayload = req.body;
        try {
            const updatedLink = await prisma.savedLink.update({
                where: {
                    id: linkId,
                },
                data: newLink,
            });
            console.table(updatedLink);
            return res.status(200).json({
                message: "Link updated successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getSavedLinks(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;

        try {
            const savedLinks = await prisma.savedLink.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    title: true,
                    link: true,
                    note: true,
                    created_at: true,
                    isPinned: true,
                    tags: true,
                    category: {
                        select: {
                            id: true,
                            title: true,
                            created_at: true,
                        }
                    }
                },
            });
            console.table(savedLinks);
            return res.status(200).json(savedLinks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getSavedLinksByCategory(
        req: Request,
        res: Response
    ): Promise<Response>{
        const userId = (req as any).user.id;
        const categoryId = req.params.id;
        try {
            const savedLinks = await prisma.savedLink.findMany({
                where: {
                    userId: userId,
                    categoryId: categoryId,
                },
                select: {
                    id: true,
                    title: true,
                    link: true,
                    note: true,
                    created_at: true,
                    isPinned: true,
                    tags: true,
                },
            });
            console.table(savedLinks);
            return res.status(200).json(savedLinks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default UserController;
