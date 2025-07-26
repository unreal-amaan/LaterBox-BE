import express, { Request, Response } from "express";
import passport from "passport";

const authRouter = express.Router();
authRouter.get(
    "/signin",
    passport.authenticate("google", { scope: ["email", "profile", "openid"] })
);

authRouter.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/");
});

export default authRouter;