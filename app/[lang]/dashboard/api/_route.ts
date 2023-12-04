import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../api/auth/[...nextauth]/route";
import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";

const aws = require("@aws-sdk/client-ses")
const nodemailer = require("nodemailer");

// get AWS SES provider
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "eu-central-1",
    credentials: {
        accessKeyId: `${process.env.NEXT_PUBLIC_AWS_ACCESS_KEY}`,
        secretAccessKey: `${process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY}`
    }
});

// create Nodemailer SES transporter
export const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});


// send email
export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOption)

    if (session) {
        const data = await req.json()
        const { emails, subject, body, style } = data
        const domain = process.env.NEXT_PUBLIC_DOMAIN // get domain for adding to unsubscribe link in mail
        const year = new Date().getFullYear() // get year for footer copyright

        if (!emails) return NextResponse.json({ message: "No recipients!" }, { status: 400 })

        for (let i = 0; i < emails.length; i++) {
            try {
                await transporter.sendMail(
                    {
                        from: process.env.NEXT_PUBLIC_EMAIL_TO,
                        to: process.env.NEXT_PUBLIC_EMAIL_FROM,
                        subject: `${subject}`,
                        html: `
                            <!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                            <html xmlns="http://www.w3.org/1999/xhtml" lang="de">
                                <head>
                                <meta charset="UTF-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <meta name="description" content="TheButcheress_ Newsletter - Ein Blog über Nahrung und Reisen." />
                                <meta name="keywords" content="Newsletter, Blog, Essen, Rezepte, Reisen" />
                                <meta name="author" content="TheButcheress_" />
                                <meta name="robots" content="index, follow" />
                                <link rel="preconnect" href="https://fonts.googleapis.com">
                                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                                <link
                                    href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,400;0,700;1,400&family=Sacramento&display=swap"
                                    rel="stylesheet">
                                    ${style}
                                    <style>
                                        body {
                                            max-width: 600px;
                                            margin: 0 auto;
                                        }
                                    </style>
                                </head>
                                <body>
                                    ${body}
                                    <p class="footer">Copyright &copy; ${year} TheButcheress_ - <a href="${domain}/de/newsletter/unsubscribe/${emails[i]._id ?? 0}" target="_blank" rel="noopener noreferrer">Newsletter abmelden</a></p>                  
                                </body>
                            </html>
                            `,
                        // attachments: data.attachments,
                    },
                    (err: any, info: any) => {
                        console.log(info.envelope)
                        if (err) return NextResponse.json({ message: "Could not send email", error: err }, { status: 500 })
                    }
                );
            } catch (error) {
                return NextResponse.json({ message: "Error!", error: error }, { status: 500 })
            }
        }

        return NextResponse.json({ message: "Email sent!" })
    } else {
        return NextResponse.json({ message: "Not Signed in" }, { status: 401 })
    }
}

//get recipients
export const GET = async () => {
    const session = await getServerSession(authOption)

    if (session) {
        const getEmails = async () => {
            await connectToDatabase()
            const emailData = await EmailModel.find({ active: "active" })

            db.on("open", function () {
                db.close()
            })

            return emailData
        }

        const emailData = await getEmails() // get emails

        // if no data return error
        if (!emailData) return NextResponse.json({ message: "Error", error: "Could not fetch emails." }, { status: 500 })

        return NextResponse.json({ message: "Success", emails: emailData }, { status: 200 })
    } else {
        return NextResponse.json({ message: "Not Signed in" }, { status: 401 })
    }
}