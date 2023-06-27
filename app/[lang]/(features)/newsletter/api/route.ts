import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

// get email data from database
const getEmail = async (id: string) => {
    await connectToDatabase()
    const emailData = await EmailModel.find({ _id: id })

    db.on("open", function () {
        db.close()
    })

    return emailData
}
export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const ObjectId = require('mongoose').Types.ObjectId;

    // check for valid MongoDB ID
    if ((!ObjectId.isValid(data.id)) || (!data.id)) return NextResponse.json({ message: "Invalid or no ID" }, { status: 400 })

    const emailData = await getEmail(data.id) // get email data

    // no email found
    if (!emailData.length) return NextResponse.json({ message: "Email not found!" }, { status: 400 })

    // if already set to active
    if (emailData[0]?.active === "active") {
        return NextResponse.json({ message: "Email already confirmed!" }, { status: 200 })
    } else if (emailData[0]?.active === "pending") {
        const setActive = async (id: string) => {
            await connectToDatabase()
            const emailData = await EmailModel.findOneAndUpdate({ _id: id }, { active: "active" }, { new: true })

            db.on("open", function () {
                db.close()
            })

            return emailData
        }

        const updatedEmail = await setActive(data.id) // set email to active

        // if no updated email return error
        if (!updatedEmail) return NextResponse.json({ message: "Could not confirm email, please refresh!", updatedEmail }, { status: 500 })
        
        return NextResponse.json({ message: "Email successfully confirmed!", updatedEmail }, { status: 200 })
    }
}