import {
    createLinkSchema,
    updateLinkSchema,
} from "../validation/link.schema.js";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";

class LinkController {
    static async addLink(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const parsedBody = createLinkSchema.safeParse(req.body);
        console.log("req body:");
        console.table(req.body);
        console.log("parsed body:");
        console.table(parsedBody.data);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.issues[0].message });
        }
        const link = parsedBody.data;
        try {
            const newLink = await prisma.savedLink.create({
                data: { ...link, userId },
            });
            console.table(newLink);
            return res.status(201).json(newLink);
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
                .json(deletedLink);
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
        const parsedBody = updateLinkSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.issues[0].message });
        }
        const newLink = parsedBody.data;
        try {
            const updatedLink = await prisma.savedLink.update({
                where: {
                    id: linkId,
                },
                data: newLink,
            });
            console.table(updatedLink);
            return res.status(200).json(updatedLink);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getSavedLinks(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).user.id;
        const categoryId = req.params.id as string;

        try {
            const savedLinks = await prisma.savedLink.findMany({
                where: {
                    userId: userId,
                    ...(categoryId && { categoryId }),
                },
                select: {
                    id: true,
                    title: true,
                    link: true,
                    note: true,
                    isPinned: true,
                    tags: true,
                    created_at: true,
                    category: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                        },
                    },
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

export default LinkController;
