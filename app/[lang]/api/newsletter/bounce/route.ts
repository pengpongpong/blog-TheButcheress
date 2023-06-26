import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const bounceData = JSON.parse(data.Message) // get bounce data from "Message" string
    const { destination }: { destination: Array<string> } = bounceData.mail // get bounce recipients list

    // is no bounce data or destination list then return error
    if (!bounceData || !destination) return NextResponse.json({ message: "Missing bounce or destination" }, { status: 400 })

    await connectToDatabase()

     // loop through destination and set recipient to "blocked" with error bounce
    for (let i = 0; i < destination.length; i++) {
        try {
            await EmailModel.findOneAndUpdate({ email: destination[i] }, { active: "blocked", error: "bounce" })
        } catch (error) {
            console.log("Error looping bounce-recipients", error)
            return NextResponse.json({ message: "Error looping bounce-recipients", error: JSON.stringify(error) }, { status: 500 })
        }
    }

    db.on("open", function () {
        db.close()
    })

    return NextResponse.json({ message: JSON.stringify(data) }, { status: 200 })
}