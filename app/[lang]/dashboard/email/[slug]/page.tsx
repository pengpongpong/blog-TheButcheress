import { ParamsProps } from "@/app/[lang]/page"
import EmailPreview from "@/components/email-preview/EmailPreview"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React from 'react'


const EmailPage = async ({ params: {slug} }: ParamsProps) => {
    const data = await client.fetch(groq`*[_type == "emailContent" && slug.current == $slug][0]{
        "title": title,
        "imageUrl": image,
        "body": body
        }`, { slug })

    return (
        <main>
            <EmailPreview body={data.body} />
        </main>
    )
}

export default EmailPage