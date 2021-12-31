import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../config/connectDB";
import { verifyPassword } from '../../../lib/auth';
import User from "../../../models/userModel";

connectDB();

export default NextAuth({
    session: {
        jwt: true,
    } as any,
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
                return { fullName: user.fullName, email: user.email };
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        session: async (session: any, user: any, token: any) => {
            // const resUser = await Users.findById(user.sub)
            // session.emailVerified = resUser.emailVerified
            // session.user = user.user;
            return Promise.resolve(session);
        }
    } as any
});