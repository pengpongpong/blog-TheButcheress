import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../../dashboard/api/route";

const getEmail = async (email: string) => {
    await connectToDatabase()
    const emailData = await EmailModel.find({ email: email })
    db.on("open", function() {
        db.close()
    })

    return emailData
}
const saveEmail = async (email: string) => {
    await connectToDatabase()
    const emailData = await EmailModel.create({
        email: email
    })
    db.on("open", function() {
        db.close()
    })

    return emailData
}

//!include lang
export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!checkEmail.test(data.email)) return NextResponse.json({ message: "Invalid email" }, { status: 400 })

    const checkEmailData = await getEmail(data.email)

    if (checkEmailData.length) return NextResponse.json({ message: "Email already registered!" }, { status: 201 })

    const emailData = await saveEmail(data.email)

    if (!emailData) return NextResponse.json({ message: "Could not save email" }, { status: 500 })

    const { _id } = emailData
    const domain = process.env.NEXT_PUBLIC_DOMAIN

    //!fix lang in anchor
    transporter.sendMail(
        {
            from: process.env.NEXT_PUBLIC_EMAIL_FROM,
            to: process.env.NEXT_PUBLIC_EMAIL_TO,
            subject: `Newsletter | TheButcheress_`,
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,400;0,700;1,400&family=Sacramento&display=swap" rel="stylesheet">
                    ${data.style}
                </head>
                <body>
                    <h1>Danke für das Anmelden vom Newsletter!</h1>
                    <p>Bitte Link bestätigen!</p>
                    <a href="${domain}/de/newsletter/${_id}" target="_blank" rel="noopener noreferrer">id: ${_id}</a>
                </body>
            </html>
            `,
        },
        (err: any, info: any) => {
            console.log(info.envelope)
            if (err) return NextResponse.json({ message: "Could not send email", error: err }, { status: 500 })
        }
    )

    return NextResponse.json({ message: "Success! Please check inbox", emailData }, { status: 201 })
}