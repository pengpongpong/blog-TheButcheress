import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../api/auth/[...nextauth]/route";
import { transporter } from "../../api/newsletter/subscribe/route";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(authOption)

    if (session) {
        const data = await req.json()
        //send email
        transporter.sendMail(
            {
                from: process.env.NEXT_PUBLIC_EMAIL_TO,
                to: process.env.NEXT_PUBLIC_EMAIL_FROM,
                subject: `${data.subject}`,
                html: `
                <!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
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
    } else {
        return NextResponse.json({ message: "Not Signed in" }, { status: 401 })
    }
}