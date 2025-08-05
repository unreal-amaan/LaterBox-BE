import express from "express";
import LinkController from "../../controllers/link.controller.js";
import AuthMiddleware from "../../middleware/auth.middleware.js";
import OwnershipVerificationMiddleware from "../../middleware/Verification.middleware.js";
const linkRouter = express.Router();


linkRouter.post(
    "/add",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.categoryOwnership,
    LinkController.addLink
);

linkRouter.delete(
    "/delete/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.linkOwnership,
    LinkController.deleteLink
);

linkRouter.put(
    "/update/:id",
    AuthMiddleware.authenticateUser,
    OwnershipVerificationMiddleware.linkOwnership,
    LinkController.updateLink
);

linkRouter.get(
    "/getLinks",
    AuthMiddleware.authenticateUser,
    LinkController.getSavedLinks
);





export default linkRouter;