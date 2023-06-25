import { NextRequest, NextResponse } from "next/server";
import { emailRegex } from "../subscribe/route";
import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const { email } = data

    //check if email format
    if (!emailRegex.test(data.email)) return NextResponse.json({ message: "Invalid email" }, { status: 400 })

    //remove email from database
    const removeEmail = async (email: string) => {
        await connectToDatabase()

        const emailData = await EmailModel.deleteOne({ email: email })
        db.on("open", function () {
            db.close()
        })
        return emailData
    }

    const emailData = await removeEmail(email)

    //if not found return
    if (emailData.deletedCount <= 0) return NextResponse.json({ message: "No email found!" }, { status: 201 })

    return NextResponse.json({ message: "Successfully unsubscribed!" }, { status: 201 })

}