import React from 'react'
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/sanity-utils"

import { getServerSession } from "next-auth/next"
import { authOption } from "../../api/auth/[...nextauth]/route"
import SignIn from "@/components/auth/SignIn"
import Link from "next/link"
import CardContainer from "@/components/card/Card"
import { ParamsProps } from "../../page"

const getData = async () => {
    const query = (groq`*[_type == "emailContent"]{
        "title": title,
        "imageUrl": image,
        "url": slug.current,
        "type": _type
        }`)

    return await client.fetch(query)
}

const EmailsPage = async ({ params: { lang } }: ParamsProps) => {
    const session = await getServerSession(authOption)

    if (session) {
        const data = await getData()

        return (
            <main className="m-8">
                <header>
                    <h1 className="mb-16 text-6xl text-center font-text">Alle Emails</h1>
                </header>
                <section className="flex flex-col justify-center items-center gap-8">
                    <Link className="btn btn-primary" href="/de/dashboard">Back to dashboard</Link>
                    <CardContainer data={data} lang={lang} />
                </section>
            </main>
        )
    }

    return (
        <SignIn callbackUrl={`/de/api/auth/signin?callbackUrl=/de/dashboard/email`} />
    )
}

export default EmailsPage