import express, { Request, Response } from "express";


const userRouter = express.Router();
userRouter.get("/signin", (req: Request, res: Response) => {
    res.send("<a href='/api/auth/signin'>Sign In</a>");
});

export default userRouter;