import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest,) => {
    let nodemailer = require("nodemailer");
    let aws = require("@aws-sdk/client-ses");

    const data = await req.json()

    const ses = new aws.SES({
        // apiVersion: "2010-12-01",
        region: "eu-central-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });

    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
        SES: { ses, aws },
    });

    transporter.sendMail(
        {
            from: "t.m.phuong@hotmail.com",
            to: "t.m.p.2609@gmail.com",
            subject: "Message",
            // text: "I hope this message gets sent! TEST",
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
                    ${data.body}
                </body>
            </html>
            `,
            attachments: data.attachments,
        },
        (err: any, info: any) => {
            console.log(info.envelope)
            if (err) return NextResponse.json({ message: "Could not send email", error: err }, { status: 500 })
        }
    );
    return NextResponse.json({ message: "Email sent!" })
}