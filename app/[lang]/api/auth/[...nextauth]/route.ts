import { connectToDatabase, db } from "@/components/utils/db"
import UserModel from "@/models/UserModel";
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
                const getUserData = async (credentials: Record<"username" | "password", string> | undefined) => {
                    await connectToDatabase()
                    const userData = await UserModel.find({ name: credentials?.username }).exec();
                    db.on('open', function () {
                        db.close();
                    });
                    return userData;
                }

                const userData = await getUserData(credentials)
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