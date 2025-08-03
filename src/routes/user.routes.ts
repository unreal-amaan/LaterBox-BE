import express, { Request, Response } from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import OwnershipVerificationMiddleware from "../middleware/Verification.middleware.js";

const userRouter = express.Router();
userRouter.get("/signin", (req: Request, res: Response) => {
    res.send("<a href='/api/auth/signin'>Sign In</a>");
});

userRouter.post(
    "/addCategory",
    AuthMiddleware.authenticateUser,
    UserController.addCategory
);

userRouter.delete(
    "/deleteCategory/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    UserController.deleteCategory
);

userRouter.put(
    "/updateCategory/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    UserController.updateCategory
);

userRouter.get(
    "/getCategories",
    AuthMiddleware.authenticateUser,
    UserController.getCategories
);

userRouter.post(
    "/addLink",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    UserController.addLink
);

userRouter.delete(
    "/deleteLink/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.linkOwnership,
    UserController.deleteLink
);

userRouter.put(
    "/updateLink/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.linkOwnership,
    UserController.updateLink
);

userRouter.get(
    "/getSavedLinks",
    AuthMiddleware.authenticateUser,
    UserController.getSavedLinks
);

userRouter.get(
    "/getSavedLinksByCategory/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    UserController.getSavedLinksByCategory
)
export default userRouter;
