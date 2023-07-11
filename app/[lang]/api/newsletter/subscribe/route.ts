import { Locale } from "@/app/[lang]/HomePage";
import { connectToDatabase, db } from "@/components/utils/db";
import EmailModel from "@/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

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

// check email on database
const getEmail = async (email: string) => {
    await connectToDatabase()
    const emailData = await EmailModel.find({ email: email })
    db.on("open", function () {
        db.close()
    })

    return emailData
}

// save email to database
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

// email regex
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const { email, lang }: { email: string, lang: Locale } = data

    // check if right email format
    if (!emailRegex.test(email)) return NextResponse.json({ message: lang === "en" ? "Invalid email" : "Ungültige Email" }, { status: 400 })

    // get email data on database
    const checkEmailData = await getEmail(email)

    // if data then already registered and return
    if (checkEmailData.length) {
        if (checkEmailData[0].active === "pending") return NextResponse.json({ message: lang === "en" ? "Email already submitted. Please check inbox!" : "Email bereits übermittelt. Bitte Mailbox checken!" }, { status: 200 })
        if (checkEmailData[0].active === "blocked") return NextResponse.json({ message: lang === "en" ? "Email blocked. Please fill contact form!" : "Email leider geblockt. Bitte fülle das Kontaktformular aus! " }, { status: 200 })
        if (checkEmailData[0].active === "active") return NextResponse.json({ message: lang === "en" ? "Email already registered!" : "Email bereits registriert!" }, { status: 200 })
    }

    // save email data to database
    const emailData = await saveEmail(email)

    // if no data returned from saving, then return error
    if (!emailData) return NextResponse.json({ message: lang === "en" ? "Could not save email. Please try again!" : "Konnte Email nicht übermitteln. Bitte wiederholen!" }, { status: 500 })

    // get ID from saved data in database
    const { _id } = emailData
    const domain = `${process.env.NEXT_PUBLIC_DOMAIN}`// get domain for adding to confirmation link in mail

    // mail template to send
    const mailHtml = `
    <!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="de">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Pending confirmation for TheButcheress_ newsletter subscription." />
            <meta name="keywords" content="Newsletter, austehende Bestätigung" />
            <meta name="author" content="TheButcheress_" />
            <meta name="robots" content="index, follow" />
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,400;0,700;1,400&family=Sacramento&display=swap"
                rel="stylesheet">
            <style>
                html {
                    background-color: #FBF7F0;
                }
                body {
                    max-width: 800px;
                    margin: 5rem auto;
                    font-family: Josefin Slab, Helvetica;
                    text-align: center;
                }

                h1 {
                    width: auto;
                    display: inline;
                    font-family: Sacramento, Helvetica;
                    font-size: 5rem;
                }

                .content {
                    max-width: 700px;
                    margin: 4rem auto;
                    font-size: 1.5rem;
                    text-align: center;
                }

                .content > a {
                    display: inline-block;
                    margin: 3rem 0;
                }

                .content > p {
                    margin: 2rem 0;
                }

                .socials {
                    margin: 5rem 0 2rem 0;
                    text-align: center;
                }

                .socials > a {
                    margin: 0 1rem;
                }
            </style>
        </head>
        <body>
            <h1>TheButcheress_ Newsletter</h1>
            <div class="content">
                <p>Willkommen und danke für das Anmelden vom Newsletter!</p>
                <p>Bitte bestätige noch diesen <a href="${domain}/de/newsletter/subscribe/${_id}" target="_blank" rel="noopener noreferrer">Link</a>, damit ich
                    weiß, dass du echt bist.</p>
                <p>Alternativ kannst du auch diesen Link besuchen:</p>
                <a href="${domain}/de/newsletter/subscribe/${_id}" target="_blank" rel="noopener noreferrer">${domain}/de/newsletter/subscribe/${_id}</a>
            </div>
            <div class="socials">
                <a href="" rel="noopener noreferrer" target="_blank"><img src="https://res.cloudinary.com/pengpengong/image/upload/v1687794395/TheButcheress_%20Blog/bxl-facebook_amausa.svg" alt="facebook" /></a>
                <a href="" rel="noopener noreferrer" target="_blank"><img src="https://res.cloudinary.com/pengpengong/image/upload/v1687794395/TheButcheress_%20Blog/bxl-instagram_lqovxj.svg" /></a>
                <a href="" rel="noopener noreferrer" target="_blank"><img src="https://res.cloudinary.com/pengpengong/image/upload/v1687794395/TheButcheress_%20Blog/bxl-tiktok_yqvhby.svg" alt="tiktok" /></a>
                <a href="" rel="noopener noreferrer" target="_blank"><img src="https://res.cloudinary.com/pengpengong/image/upload/v1687794395/TheButcheress_%20Blog/bxl-twitch_ggguic.svg" alt="twitch" /></a>
                <a href="" rel="noopener noreferrer" target="_blank"><img src="https://res.cloudinary.com/pengpengong/image/upload/v1687794395/TheButcheress_%20Blog/bxl-youtube_ze1lwx.svg" alt="youtube" /></a>
                <a href="" rel="noopener noreferrer" target="_blank"><img src="https://res.cloudinary.com/pengpengong/image/upload/v1687794395/TheButcheress_%20Blog/bxl-twitter_idz0lh.svg" alt="twitter" /></a>
            </div>
            <p>Copyright &copy; <span id="year">2023</span> TheButcheress_</p>
            <script>
                const time = new Date().getFullYear()
                const span = document.getElementById("year")
                span.innerText = time
            </script>
        </body>
    </html>
    `

    // mail header
    const mailData = {
        from: process.env.NEXT_PUBLIC_EMAIL_FROM,
        to: process.env.NEXT_PUBLIC_EMAIL_TO,
        subject: `Newsletter | TheButcheress_`,
        html: mailHtml,
    }

    // send mail to subscriber
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) {
                reject(err);
                return NextResponse.json({ message: lang === "en" ? "Could not send email. Please try again!" : "Konnte Email nicht senden. Bitter wiederholen!", error: err }, { status: 500 })
            } else {
                resolve(info);
            }
        });
    });

    return NextResponse.json({ message: lang === "en" ? "Successfully submitted. Please check inbox!" : "Erfolgreich übermittelt. Bitte Mailbox checken!", emailData }, { status: 201 })
}