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

userRouter.delete(
    "/deleteCategory/:id",
    AuthMiddleware.authenticateUser,
    UserController.handleDeleteCategory
);

userRouter.post(
    "/updateCategory/:id",
    AuthMiddleware.authenticateUser,
    UserController.handleUpdateCategory
);

export default userRouter;
