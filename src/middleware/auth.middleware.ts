import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
class AuthMiddleware {
    static authenticateUser(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        try {
            const decodedToken = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as JwtPayload;
            (req as any).user = decodedToken;
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: "Authentication failed" });
        }
    }

    static refreshTokenValidator(req: Request, res: Response, next: NextFunction) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token not found" });
        }
        try {
            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
            (req as any).user = decodedToken;
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: "Invalid/Expired refresh token" });
        }

    }


}

export default AuthMiddleware;