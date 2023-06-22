import { connectToDatabase } from "@/components/utils/db"
import { UserModel } from "@/models/User"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const bcrypt = require('bcrypt');

export const authOption = {
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await connectToDatabase()

                const userData = await UserModel.find({ name: credentials?.username }).exec()
                const comparePassword = await bcrypt.compare(credentials?.password, userData[0].password);

                if (comparePassword) {
                    return { id: "1", name: userData[0].name, email: "test" }
                } else {
                    return null
                }
            }
        })
    ],
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }