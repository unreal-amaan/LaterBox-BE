import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma.js";

class OwnershipVerificationMiddleware {
    static async categoryOwnership(req: Request, res: Response, next: NextFunction) {
        const userId = (req as any).user.id;
        const categoryId = req.body?.categoryId || req.params?.id;
        try {
            if (!categoryId) {
                return res.status(400).json({ error: "Category ID not provided" });
            }
            const category = await prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
                select: {
                    userId: true,
                },
            }) 
            if(!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            if (category.userId !== userId) {
                return res.status(403).json({ error: "Forbidden: You do not own this category" });
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async linkOwnership(req: Request, res: Response, next: NextFunction) {
        const userId = (req as any).user.id;
        const linkId = req.body?.linkId || req.params?.id;
        try {
            if (!linkId) {
                return res.status(400).json({ error: "Link ID not provided" });
            }
            const link = await prisma.savedLink.findUnique({
                where: {
                    id: linkId,
                },
                select: {
                    userId: true,
                },
            });
            if (!link) {
                return res.status(404).json({ error: "Link not found" });
            }
            if (link.userId !== userId) {
                return res.status(403).json({ error: "Forbidden: You do not own this link" });
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default OwnershipVerificationMiddleware;