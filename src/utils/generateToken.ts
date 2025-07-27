import jwt, { SignOptions } from "jsonwebtoken";
import { type TokenPayload } from "../../global.d.js";
export default function generateToken(
    payload: TokenPayload,
    secret: string,
    expiresIn: string
): string {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"],
    });
}
