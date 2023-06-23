"use client"
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/sanity-utils"
import CardContainer, { CardData } from "@/components/card/Card"
import Link from "next/link"

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
        return (
            <main className="mx-8 flex flex-col justify-center items-center gap-8">
                <h1 className="text-6xl text-center font-text">Alle Emails</h1>
                <Link className="btn btn-primary" href="/de/dashboard">Back to dashboard</Link>
                <button className="btn btn-warning" onClick={() => signOut()}>Logout</button>
                <pre>{JSON.stringify(session, null, 2)}</pre>
                <CardContainer blog="email" data={data} />
            </main>
        )
    }

    return (
        <main>
            <h1 className="text-6xl text-center font-text">Nicht eingeloggt!</h1>
            <button className="btn btn-primary" onClick={() => signIn()}>Login</button>
        </main>
    )
}

export default EmailsPage