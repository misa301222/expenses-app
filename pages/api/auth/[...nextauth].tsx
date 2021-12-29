import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

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
                const client: any = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();
                return { email: user.email };

            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    // SQL or MongoDB database (or leave empty)
    //database: process.env.DATABASE_URL,
});

/*
const loginUser = async ({ password, user }: any) => {
    if (!user.password) {
        throw new Error("Accounts have to login with OAuth or Email.")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Password Incorrect.");
    }

    if (!user.emailVerified) {
        throw new Error("Success! Check your email.");
    }

    return user;
}

const registerUser = async ({ email, password }: any) => {
    const hashPass = await bcrypt.hash(password, 12)
    const newUser = new Users({ email, password: hashPass })
    await newUser.save()
    throw new Error("Success! Check your email.");
}*/