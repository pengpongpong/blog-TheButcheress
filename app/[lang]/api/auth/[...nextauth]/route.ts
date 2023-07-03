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
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }: any) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }