import express, { Request, Response } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();
authRouter.get(
    "/signin",
    passport.authenticate("google", {
        scope: ["email", "profile", "openid"],
        session: false,
        failureRedirect: "/api/user/signin", //change the route to FE signin page
    }),
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/user/signin",    //change the route to FE signin page
    }),
    AuthController.handleSuccessRedirect
);

export default authRouter;
