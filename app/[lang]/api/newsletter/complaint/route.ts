import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const complaintData = JSON.parse(data.Message)
    const { destination } = complaintData.mail

    await connectToDatabase()

    for (let i = 0; i < destination.length; i++) {
        try {
            await EmailModel.findOneAndUpdate({ email: destination[i] }, { active: "blocked", error: "complaint" })
        } catch (error) {
            console.log(error)
        }
    }

    db.on("open", function () {
        db.close()
    })

    return NextResponse.json({ message: JSON.stringify(data) }, { status: 201 })
}