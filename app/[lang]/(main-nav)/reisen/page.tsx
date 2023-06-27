import { groq } from "next-sanity"
import React from 'react'
import { Lang } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"

import { Metadata } from "next"
import BlogContainer from "@/components/blog/BlogContainer"
import { client } from "@/sanity/lib/sanity-utils"
import { MetaDataProps, ParamsProps } from "../page"


const travelPostsQuery = (lang: Lang) => {
    return (
        groq`*[_type == "blogPage" && category == "travel"][0]{
            "title": title${lang},
            "blogs": *[_type == "blog" && category == "travel"]{"title": title${lang}, "description": description.description${lang}, "imageUrl": image, "url": slug.current} | order(_createdAt desc)
            }`
    )
}

export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `The Butcheress_ | Travel blog post collection` : `The Butcheress_ | Reise Blog Post Sammlung`
    const description = lang === "en" ? `The Butcheress_ | A collection of all travel blog posts` : `The Butcheress_ | Eine Sammlung von allen Blog Posts über Reisen`

    return {
        title: text,
        description: description
    }
}

const TravelPosts = async ({ params: { lang } }: ParamsProps) => {

    const data = await client.fetch(travelPostsQuery(transformLocale(lang)))
    return (
        <>
            <BlogContainer
                title={data?.title}
                blogData={data?.blogs}
                blogType="travel"
            />
        </>
    )

}

export default TravelPosts