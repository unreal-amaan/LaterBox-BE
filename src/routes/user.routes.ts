import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const userRouter = express.Router();
userRouter.get("/signin", (req: Request, res: Response) => {
    res.send("<a href='/api/auth/signin'>Sign In</a>");
});

userRouter.post(
    "/addCategory",
    AuthMiddleware.authenticateUser,
    UserController.handleAddCategory
);

export default userRouter;
