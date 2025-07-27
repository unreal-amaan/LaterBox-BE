import express, { Request, Response } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
const authRouter = express.Router();
authRouter.get(
    "/signin",
    passport.authenticate("google", {
        scope: ["email", "profile", "openid"],
        session: false,
        failureRedirect: "/api/user/signin", //change the route to FE signin page
    })
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/user/signin", //change the route to FE signin page
    }),
    AuthController.handleSuccessRedirect
);

authRouter.post(
    "/refreshtoken",
    AuthMiddleware.refreshTokenValidator,
    AuthController.handleRefreshToken
);

authRouter.post(
    "/logout",
    AuthMiddleware.authenticateUser,
    AuthController.handleLogout
);

export default authRouter;
