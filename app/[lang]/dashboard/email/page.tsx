import React from 'react'
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/sanity-utils"
import EmailContainer from "./EmailContainer"

import { getServerSession } from "next-auth/next"
import { authOption } from "../../api/auth/[...nextauth]/route"
import SignIn from "@/components/auth/SignIn"
import Link from "next/link"

const getData = async () => {
    const query = (groq`*[_type == "emailContent"]{
        "title": title,
        "imageUrl": image,
        "url": slug.current 
        }`)

    return await client.fetch(query)
}

const EmailsPage = async () => {
    const session = await getServerSession(authOption)

    if (session) {
        const data = await getData()
        return (
            <main className="mx-8 flex flex-col justify-center items-center gap-8">
                <h1 className="text-6xl text-center font-text">Alle Emails</h1>
                <Link className="btn btn-primary" href="/de/dashboard">Back to dashboard</Link>
                <EmailContainer session={session} data={data} />
            </main>
        )
    }

    return (
        <SignIn callbackUrl="/de/api/auth/signin?callbackUrl=/de/dashboard/email" />
    )
}

export default EmailsPage