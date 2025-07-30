import { createCategoryPayload } from "../../global.js";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";
class UserController {
    static async handleAddCategory(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const Category: createCategoryPayload = req.body;
        Category.userId = userId;
        try {
            const newCategory = await prisma.category.create({ data: Category });
            console.table(newCategory);
            return res.status(201).json(newCategory);
        } catch (error) {
            console.error(error);
            if((error as any).code === "P2002") return res.status(409).json({ error: "Category already exists" });
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default UserController;