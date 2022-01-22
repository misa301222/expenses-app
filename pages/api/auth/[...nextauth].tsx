import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../config/connectDB";
import { verifyPassword } from '../../../lib/auth';
import User from "../../../models/userModel";

connectDB();

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: process.env.SECRET,
    jwt: {
        encryption: true,
        secret: '4bq94PigRikFXJWsMoPjm0krYNAVW3dZBNCt/sJvOSyihYjW5kF1uflmbI4q1pVrecel/mtwXPeHTYisfm9TIw==',
        signingKey: process.env.JWT_SIGNING_KEY,
        encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    } as any,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('Invalid username or password. Please check the data!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error('Invalid username or password. Please check the data!');
                }

                return user;
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        //FIX CALLBACKS
        jwt: async ({ token, user, account, profile, isNewUser }: any) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            if (user) {
                token.id = user.id;
                const { role } = user;
                const { email } = user;
                const { fullName } = user;

                token.email = email;
                token.role = role;
                token.fullName = fullName;
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.id = token.id;
                session.user.role = token.role;
                session.user.fullName = token.fullName;
            }

            return session;
        }
    } as any
});