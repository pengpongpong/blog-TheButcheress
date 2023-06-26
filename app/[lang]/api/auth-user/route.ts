import { connectToDatabase } from "@/components/utils/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";
import UserModel from "@/models/UserModel";

const bcrypt = require('bcrypt');
const saltRounds = 14;

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOption)

    // only grant access if valid session
    if (session) {
        const params = req.nextUrl.searchParams
        const email = params.get("email")
        const checkEmail = process.env.NEXT_PUBLIC_EMAIL // get whitelisted email
        const password = params.get("password")

        // if no data return error
        if (!email || !password) return NextResponse.json({ error: "No email or password" }, { status: 400 })

        // check if whitelisted, else return error
        if (email !== checkEmail) return NextResponse.json({ error: "Not allowed" }, { status: 405 })

        const hash = await bcrypt.hash(password, saltRounds) // hash password

        if (hash) {
            await connectToDatabase();

            // save user
            const newUser = await UserModel.create({
                name: email,
                password: hash
            })
            if (!newUser) return NextResponse.json({ message: 'Could not save user' }, { status: 500 }) // if user data not saved, return error
            return NextResponse.json({ message: 'User saved' }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'Could not hash password' }, { status: 500 }) // if ho hash, return error
        }
    } else {
        return NextResponse.json({ message: "Not allowed" }, { status: 405 }) // if no session, return error
    }
}
