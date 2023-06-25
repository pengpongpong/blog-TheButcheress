import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../../dashboard/api/route";

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const { name, email, textField } = data

    if (!name || !email || !textField) return NextResponse.json({ message: "Missing fields" }, { status: 400 })

    transporter.sendMail(
        {
            from: process.env.NEXT_PUBLIC_EMAIL_FROM,
            to: process.env.NEXT_PUBLIC_EMAIL_TO,
            subject: `Neue Kontaktanfrage | TheButcheress_`,
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,400;0,700;1,400&family=Sacramento&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font-family: Josefin Slab
                        }
                    </style>
                </head>
                <body>
                    <h1>Neue Kontaktanfrage:</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Nachricht:</strong> ${textField}</p>
                </body>
            </html>
            `,
        },
        (err: any, info: any) => {
            console.log(info.envelope)
            if (err) return NextResponse.json({ message: "Could not send email", error: err }, { status: 500 })
        }
    )

    return NextResponse.json({ message: "success" }, { status: 201 })
}