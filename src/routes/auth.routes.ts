import express from "express";
import passport from "passport";

import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
const authRouter = express.Router();
authRouter.get(
    "/signin",
    passport.authenticate("google", {
        scope: ["email", "profile", "openid"],
        session: false,
        failureRedirect: `${process.env.CLIENT_ADDRESS}/signin?error=auth_failed`, 
    })
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_ADDRESS}/signin?error=auth_failed`, 
    }),
    AuthController.handleSuccessRedirect
);

authRouter.post(
    "/refreshtoken",
    AuthMiddleware.refreshTokenValidator,
    AuthController.handleRefreshToken
);

authRouter.post(
    "/signout",
    AuthController.handleLogout
);

export default authRouter;
