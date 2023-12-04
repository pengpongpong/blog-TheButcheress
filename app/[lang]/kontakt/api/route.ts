import { NextRequest, NextResponse } from "next/server";

const api = process.env.NEXT_PUBLIC_API_KEY
const url = process.env.NEXT_PUBLIC_API_URL

export const POST = async (req: NextRequest) => {
    const formData = await req.json()
    const { data, lang } = formData
    const { name, email, textField } = data

    // if missing fields return error
    if (!name || !email || !textField) return NextResponse.json({ message: lang === "en" ? "Please fill in all fields!" : "Bitte fülle alle Felder aus!" }, { status: 400 })

    const response = await fetch(url!, {
        method: "POST",
        body: JSON.stringify({ data: { name, email, message: textField } }),
        headers: {
            "x-api-key": `${api}`
        }
    })
        .then(res => res.json())
        .then(result => {
            const { message } = JSON.parse(result.body)

            return message
        })

    return NextResponse.json({ message: response }, { status: 200 })
}