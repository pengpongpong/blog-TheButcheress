import { connectToDatabase, db } from "@/components/utils/db"
import UserModel from "@/models/UserModel";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const bcrypt = require('bcrypt');

// get user data from database
const getUserData = async (credentials: Record<"username" | "password", string> | undefined) => {
    await connectToDatabase()
    const userData = await UserModel.find({ name: credentials?.username }).exec();
    db.on('open', function () {
        db.close();
    });
    return userData;
}

// options for next-auth
export const authOption = {
    site: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            name: "Login Daten",
            credentials: {
                username: { label: "Benutzername", type: "text", placeholder: "Benutzername" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const userData = await getUserData(credentials) // get user data
                const comparePassword: boolean = await bcrypt.compare(credentials?.password, userData[0].password); // check password

                if (comparePassword) {
                    return { id: "1", name: userData[0].name }
                } else {
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }