import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/user.routes/category.routes.js";
import linkRouter from "./routes/user.routes/link.routes.js";

import "./config/Oauth.config.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_ADDRESS,
        credentials: true,
    })
);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(passport.initialize());
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/link", linkRouter);

app.listen(process.env.PORT , () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
