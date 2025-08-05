import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../validation/token.schema.js";
export default function generateToken(
    payload: TokenPayload,
    secret: string,
    expiresIn: string
): string {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"],
    });
}
