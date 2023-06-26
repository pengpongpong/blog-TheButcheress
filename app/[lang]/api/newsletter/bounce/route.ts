import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { String } from "aws-sdk/clients/appstream";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const bounceData = JSON.parse(data.Message)
    const { destination, messageId } = bounceData.mail
    console.log("messageId", messageId)
    console.log("destination", destination)
    await connectToDatabase()

    if (destination.length) {
        destination.map(async (recipient: string) => {
            const getEmail = async (email: String) => {
                await EmailModel.findOneAndUpdate({ email: email }, { active: "blocked", error: "bounce" })
            }
            return await EmailModel.findOneAndUpdate({ email: recipient }, { active: "blocked", error: "bounce" })
        })
    }

    db.on("open", function () {
        db.close()
    })
    console.log("bounce", data)
    return NextResponse.json({ message: JSON.stringify(data) }, { status: 201 })
}