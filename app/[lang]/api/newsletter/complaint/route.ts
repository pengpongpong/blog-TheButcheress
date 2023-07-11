import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const complaintData = JSON.parse(data.Message) // get complaint data from "Message" string
    const { destination }: { destination: Array<string> } = complaintData.mail // get complaint recipients

    // if no data then return
    if (!complaintData || !destination) return NextResponse.json({ message: "Missing complaint or destination" }, { status: 400 })

    await connectToDatabase()

    // loop through destination and set recipient to "blocked" with error complaint
    for (let i = 0; i < destination.length; i++) {
        try {
            await EmailModel.findOneAndUpdate({ email: destination[i] }, { active: "blocked", error: "complaint" })
        } catch (error) {
            return NextResponse.json({ message: "Error looping complaint-recipients", error: JSON.stringify(error) }, { status: 500 })
        }
    }

    db.on("open", function () {
        db.close()
    })

    return NextResponse.json({ message: JSON.stringify(data) }, { status: 200 })
}