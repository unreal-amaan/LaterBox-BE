import { Profile, VerifyCallback } from "passport-google-oauth20";
import { Request, Response } from "express";

import { tokenSchema } from "../validation/token.schema.js";
import generateToken from "../utils/generateToken.js";
import { prisma } from "../prisma.js";
class AuthController {
    static async handleGoogleLogin(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ) {
        try {
            let user = await prisma.user.findFirst({
                where: {
                    google_id: profile.id,
                },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email: profile.emails?.[0].value as string,
                        google_id: profile.id,
                        name: profile.displayName,
                    },
                });
                console.log("New User Created");
                console.table(user);
            }
            return done(null, user);
        } catch (err) {
            console.error("Google Strategy Error: ", err);
            return done(err as Error);
        }
    }
    static handleSuccessRedirect(req: Request, res: Response): void {
        try {
            const parsedBody = tokenSchema.safeParse(req.user);
            if (!parsedBody.success) {
                res.status(400).json({
                    error: parsedBody.error.issues[0].message,
                });
                return;
            }
            const userPayload = parsedBody.data;
            console.info("User::");
            console.table(userPayload);

            const accessToken = generateToken(
                userPayload,
                process.env.ACCESS_TOKEN_SECRET as string,
                process.env.ACCESS_TOKEN_EXPIRESIN as string
            );
            const refreshToken = generateToken(
                userPayload,
                process.env.REFRESH_TOKEN_SECRET as string,
                process.env.REFRESH_TOKEN_EXPIRESIN as string
            );
            console.log("Access Token::   ", accessToken);
            console.log("Refresh Token:: ", refreshToken);

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 3,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 10,
            });
            return res.redirect(`${process.env.CLIENT_ADDRESS}/home`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    }

    static async handleRefreshToken(req: Request, res: Response) {
        try {
            const parsedBody = tokenSchema.safeParse(req.user);
            if (!parsedBody.success) {
                res.status(400).json({
                    error: parsedBody.error.issues[0].message,
                });
                return;
            }
            const userPayload = parsedBody.data;
            console.log("decoded :: ");
            console.table(userPayload);

            const newaccessToken = generateToken(
                userPayload,
                process.env.ACCESS_TOKEN_SECRET as string,
                process.env.ACCESS_TOKEN_EXPIRESIN as string
            );
            res.cookie("accessToken", newaccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 3,
            });
            return res.status(200).json({
                message: "Access Token Refreshed",
            });
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: "Invalid Token" });
        }
    }

    static handleLogout(req: Request, res: Response) {
        try {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            console.log("Logout successful");
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default AuthController;
