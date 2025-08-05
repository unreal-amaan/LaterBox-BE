import express, { Request, Response } from "express";
import CategoryController from "../../controllers/category.controller.js";
import AuthMiddleware from "../../middleware/auth.middleware.js";
import OwnershipVerificationMiddleware from "../../middleware/Verification.middleware.js";

const categoryRouter = express.Router();

categoryRouter.post(
    "/add",
    AuthMiddleware.authenticateUser,
    CategoryController.addCategory
);

categoryRouter.delete(
    "/delete/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    CategoryController.deleteCategory
);

categoryRouter.put(
    "/update/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    CategoryController.updateCategory
);

categoryRouter.get(
    "/get",
    AuthMiddleware.authenticateUser,
    CategoryController.getCategories
);

categoryRouter.get("/public/:id", CategoryController.getSharedCategory);

export default categoryRouter;
