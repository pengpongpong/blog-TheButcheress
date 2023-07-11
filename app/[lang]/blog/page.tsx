import { transformLocale } from "@/components/utils/utils"
import { client } from "@/sanity/lib/sanity-utils"
import { Metadata } from "next"
import { groq } from "next-sanity"
import React from 'react'
import { MetaDataProps, ParamsProps } from "../page"
import { Lang } from "@/sanity/lib/sanity-query"
import BlogContainer from "@/components/blog/BlogContainer"

// meta data
export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? "TheButcheress_ | A Collection to all blog posts about food and recipes" : "TheButcheress_ | Eine Sammlung zu allen Blog Beiträgen über Nahrung und Rezepte"
    const description = lang === "en" ? "TheButcheress_ | Blog collection about food and recipes" : "TheButcheress_ | Blog Sammlung über Nahrung und Rezepte"
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "blog", "collection"] : ["Essen", "Blog", "Sammlung"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/blog`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

// query for blog posts from CMS
const blogPostsQuery = (lang: Lang) => {
    return (
        groq`*[_type == "blogPage" && category == "blog"][0]{
            "title": title${lang},
            "blogs": *[_type == "blog" && category == "blog"]{"title": title${lang}, "description": description.description${lang}, "imageUrl": image, "url": slug.current, _updatedAt} | order(_updatedAt desc)
            }`
    )
}

const BlogPosts = async ({ params: { lang } }: ParamsProps) => {
    const data = await client.fetch(blogPostsQuery(transformLocale(lang)))

    return (
        <>
            <BlogContainer
                title={data?.title}
                blogData={data?.blogs}
                blogType="blog"
            />
        </>
    )
}


export default BlogPosts