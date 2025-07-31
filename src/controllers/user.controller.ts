import { createCategoryPayload } from "../../global.js";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";
class UserController {
    static async handleAddCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        const userId = (req as any).user.id;
        const category: createCategoryPayload = req.body;
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

    static async handleDeleteCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        const userId = (req as any).user.id;
        const categoryId = req.params.id;

        try {
            const deletedCategory = await prisma.category.deleteMany({
                where: { 
                    id: categoryId,
                    userId: userId,
                 },
            });
            console.table(deletedCategory);
            if (deletedCategory.count === 0) {
                return res.status(404).json({ error: "Category not found" });
            }

            return res
                .status(200)
                .json({ message: "Category deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async handleUpdateCategory(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const categoryId = req.params.id;
        const { title } = req.body;
        try {
            await prisma.category.update({
                where: {
                    id: categoryId,
                    userId: userId,
                },
                data: {
                    title: title,
                },
            })
            return res.status(200).json({
                message: "Category updated successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default UserController;
