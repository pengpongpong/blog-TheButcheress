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
            html: data,
            ses: {
                // optional extra arguments for SendRawEmail
                Tags: [
                    {
                        Name: "tag_name",
                        Value: "tag_value",
                    },
                ],
            },
        },
        (err: any, info: any) => {
            console.log(info.envelope)
            console.log(err)
        }
    );
    return NextResponse.json("bla")
}

