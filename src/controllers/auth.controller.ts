import { Profile, VerifyCallback } from "passport-google-oauth20";
import { Request, Response } from "express";

import generateToken from "../utils/generateToken.js";
import { TokenPayload } from "../../global.d.js";
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
                console.info("New user created: ", user);
            }
            return done(null, user);
        } catch (err) {
            console.error("Google Strategy Error: ", err);
            return done(err as Error);
        }
    }
    static handleSuccessRedirect(req: Request, res: Response): void {
        try {
            const user = req.user as TokenPayload;
            console.info("User::", user);

            const accessToken = generateToken(
                user,
                process.env.ACCESS_TOKEN_SECRET as string,
                process.env.ACCESS_TOKEN_EXPIRESIN as string
            );
            const refreshToken = generateToken(
                user,
                process.env.REFRESH_TOKEN_SECRET as string,
                process.env.REFRESH_TOKEN_EXPIRESIN as string
            );
            console.log(
                "RefreshToken::",
                refreshToken,
                "\nAccessToken::",
                accessToken
            );
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 10,
            });
            return res.redirect(process.env.CLIENT_ADDRESS as string);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    }
}

export default AuthController;
