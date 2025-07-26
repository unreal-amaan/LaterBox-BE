import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { prisma } from "../prisma.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL as string;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            try {
                let user = await prisma.user.findFirst({
                    where: {
                        google_id: profile.id,
                    },
                });
                
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: profile.emails?.[0].value as string,
                            google_id: profile.id,
                            name: profile.displayName,
                        },
                    })
                    console.info("New user created: ", user);
                }
                return done(null, user);
            } catch (err) {
                console.error("Google Strategy Error: ", err);
                return done(err as Error);
            }
        }
    )
);
