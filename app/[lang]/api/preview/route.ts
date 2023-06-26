import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from "next/server"

// enter preview mode
export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams

    // preview for recipe
    if (params.has("rezept")) {
        const id = params.get("rezept")
        const data = await client.fetch(groq`*[_type == "recipe" && _id == $id][0]{"url": slug.current}`, { id })
        draftMode().enable()
        redirect(`/de/rezepte/${data.url}`)
    }
    // preview for blog
    if (params.has("blog")) {
        const id = params.get("blog")
        const data = await client.fetch(groq`*[_type == "blog" && _id == $id][0]{"url": slug.current, category}`, { id })
        draftMode().enable()
        redirect(`/de/${data.category === "travel" ? "reisen" : "blog"}/${data.url}`)
    }

    // preview home page
    draftMode().enable()
    redirect("/")
}