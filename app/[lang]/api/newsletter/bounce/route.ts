import { connectToDatabase } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { String } from "aws-sdk/clients/appstream";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const data = await req.json()

    await connectToDatabase()

    if (data.mail?.destination?.length) {
        data.mail.destination.map((recipient: string) => {
            const getEmail = async (email: String) => {
                await EmailModel.findOneAndUpdate({ email: email }, { active: "blocked", error: "bounce" })
            }
            getEmail(recipient)
        })
    }

    console.log("bounce", data)
    return NextResponse.json({ message: JSON.stringify(data) }, { status: 201 })
}