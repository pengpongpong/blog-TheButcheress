import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");

const ses = new aws.SES({
    // apiVersion: "2010-12-01",
    region: "eu-central-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    }
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});

const getEmail = async (email: string) => {
    await connectToDatabase()
    const emailData = await EmailModel.find({ email: email })
    db.on("open", function () {
        db.close()
    })

    return emailData
}
const saveEmail = async (email: string) => {
    await connectToDatabase()
    const emailData = await EmailModel.create({
        email: email
    })
    db.on("open", function () {
        db.close()
    })

    return emailData
}

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//!include lang
export const POST = async (req: NextRequest) => {
    const data = await req.json()

    if (!emailRegex.test(data.email)) return NextResponse.json({ message: "Invalid email" }, { status: 400 })

    const checkEmailData = await getEmail(data.email)

    if (checkEmailData.length) return NextResponse.json({ message: "Email already registered!" }, { status: 201 })

    const emailData = await saveEmail(data.email)

    if (!emailData) return NextResponse.json({ message: "Could not save email" }, { status: 500 })

    const { _id } = emailData
    const domain = process.env.NEXT_PUBLIC_DOMAIN

    const mailHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,400;0,700;1,400&family=Sacramento&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: Josefin Slab, Helvetica;
                }
                h1 {
                    font-size: 3rem;
                }
            </style>
        </head>
        <body>
            <h1>Danke für das Anmelden vom Newsletter!</h1>
            <p>Bitte Link bestätigen!</p>
            <a href="${domain}/de/newsletter/subscribe/${_id}" target="_blank" rel="noopener noreferrer">id: ${_id}</a>
        </body>
    </html>
    `
    console.log("mail", mailHtml)

    const mailData = {
        from: process.env.NEXT_PUBLIC_EMAIL_FROM,
        to: process.env.NEXT_PUBLIC_EMAIL_TO,
        subject: `Newsletter | TheButcheress_`,
        html: mailHtml,
    }
    console.log("mailData", mailData)

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) {
                console.error(err);
                reject(err);
                return NextResponse.json({ message: "Could not send email", error: err }, { status: 500 })
            } else {
                resolve(info);
            }
        });
    });

    return NextResponse.json({ message: "Success! Please check inbox", emailData }, { status: 201 })
}