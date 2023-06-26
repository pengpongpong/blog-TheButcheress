import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";

// remove email from database
const removeEmail = async (id: string) => {
    await connectToDatabase()

    const emailData = await EmailModel.deleteOne({ _id: id })
    db.on("open", function () {
        db.close()
    })
    return emailData
}

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const { id } = data
    const ObjectId = require('mongoose').Types.ObjectId;

    // check for valid MongoDB ID
    if ((!ObjectId.isValid(id)) || (!id)) return NextResponse.json({ message: "Invalid or no ID" }, { status: 400 })

    // remove email and return deletedCount
    const emailData = await removeEmail(id)

    // if not found return
    if (emailData.deletedCount <= 0 || !emailData) return NextResponse.json({ message: "Email not found!" }, { status: 404 })

    return NextResponse.json({ message: "Successfully unsubscribed!" }, { status: 200 })

}