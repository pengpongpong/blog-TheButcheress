import { ParamsProps } from "@/app/[lang]/(main-nav)/page"
import { authOption } from "@/app/[lang]/api/auth/[...nextauth]/route"
import SignIn from "@/components/auth/SignIn"
import EmailPreview from "@/components/email-preview/EmailPreview"
import { client } from "@/sanity/lib/sanity-utils"
import { getServerSession } from "next-auth/next"
import { groq } from "next-sanity"
import Link from "next/link"
import React from 'react'

//!adding main image to email?
const EmailPage = async ({ params: { slug } }: ParamsProps) => {
    const session = await getServerSession(authOption)

    if (session) {
        const data = await client.fetch(groq`*[_type == "emailContent" && slug.current == $slug][0]{
            "title": title,
            "imageUrl": image,
            "body": body
            }`, { slug })

        return (
            <main className="m-8">
                <Link className="btn btn-primary" href="/de/dashboard/email">Zurück zu Emails</Link>
                <EmailPreview body={data.body} title={data.title} />
            </main>
        )
    }
    return (
        <SignIn callbackUrl={`/de/api/auth/signin?callbackUrl=/de/dashboard/email/${slug}`} />
    )
}

export default EmailPage