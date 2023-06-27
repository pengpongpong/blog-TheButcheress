import { groq } from "next-sanity"
import React from 'react'
import { Lang } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"
import { MetaDataProps, ParamsProps } from "../page"
import { Metadata } from "next"
import BlogContainer from "@/components/blog/BlogContainer"
import { client } from "@/sanity/lib/sanity-utils"


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
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["travel", "blog", "collection"] : ["Reisen", "Blog", "Sammlung"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/reisen`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
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