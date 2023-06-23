"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/sanity-utils"
import CardContainer, { CardData } from "@/components/card/Card"
import { getServerSession } from "next-auth/next"
import { authOption } from "../../api/auth/[...nextauth]/route"





const EmailsPage = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/de/api/auth/signin?callbackUrl=/de/dashboard/email")
        }
    })
    const [data, setData] = useState<CardData[]>()

    useEffect(() => {
        const getData = async () => {
            const query = (groq`*[_type == "emailContent"]{
                "title": title,
                "imageUrl": image,
                "url": slug.current 
                }`)


            const result = await client.fetch(query)
            setData(result)
        }
        getData()
    }, [])

    if (session) {
        console.log(data)
        return (
            <main>
                <h1>Email</h1>
                <pre>{JSON.stringify(session, null, 2)}</pre>
                <CardContainer blog="email" data={data} />
            </main>
        )
    }

    return (
        <h1>Not logged in!</h1>
    )
}

export default EmailsPage