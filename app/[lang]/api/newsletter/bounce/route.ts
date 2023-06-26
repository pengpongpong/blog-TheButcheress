import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const bounceData = JSON.parse(data.Message)
    const { destination, messageId } = bounceData.mail
    console.log("messageId", messageId)
    console.log("destination", destination)
    await connectToDatabase()

    for (let i = 0; i < destination.length; i++) {
        try {
            await EmailModel.findOneAndUpdate({ email: destination[i] }, { active: "blocked", error: "bounce" })
        } catch (error) {
            console.log(error)
        }
    }

    db.on("open", function () {
        db.close()
    })

    console.log("bounce", data)
    return NextResponse.json({ message: JSON.stringify(data) }, { status: 201 })
}