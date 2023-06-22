import { connectToDatabase } from "@/components/utils/db";
import { UserModel } from "@/models/User";
import { setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const bcrypt = require('bcrypt');

export const POST = async (req: NextRequest, session: any) => {
    const data = await req.json()

    const { email, password } = data

    const checkEmail = process.env.NEXT_PUBLIC_EMAIL

    if (!email || !password) return NextResponse.json({ error: "No email or password" }, { status: 401 })
    if (email !== checkEmail) return NextResponse.json({ error: "Not allowed" }, { status: 405 })

    await connectToDatabase()

    const userData = await UserModel.find({ name: email }).exec()

    const comparePassword = await bcrypt.compare(password, userData[0].password);

    if (comparePassword) {
        const sessionId = uuidv4();
        req.cookies.set('sessionId', sessionId)
        return NextResponse.json({ message: "success", sessionId: sessionId }, { status: 200 })
    } else {
        return NextResponse.json({ error: "Not allowed" }, { status: 401 })
    }
}

