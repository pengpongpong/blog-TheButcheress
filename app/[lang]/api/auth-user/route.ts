import { connectToDatabase } from "@/components/utils/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";
import UserModel from "@/models/UserModel";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOption)

    if (session) {
        const params = req.nextUrl.searchParams
        const email = params.get("email")
        const checkEmail = process.env.NEXT_PUBLIC_EMAIL
        const password = params.get("password")

        if (!email || !password) return NextResponse.json({ error: "No email or password" }, { status: 401 })
        if (email !== checkEmail) return NextResponse.json({ error: "Not allowed" }, { status: 405 })

        const hash = await bcrypt.hash(password, saltRounds);

        if (hash) {
            await connectToDatabase();
            const newUser = await UserModel.create({
                name: email,
                password: hash
            })
            if (!newUser) return NextResponse.json({ message: 'Could not save user' }, { status: 500 })
            return NextResponse.json({ message: 'User saved' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Could not save user' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: "Not allowed" }, { status: 405 })
    }
}
