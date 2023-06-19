import { transformLocale } from "@/components/utils/utils"
import { client } from "@/sanity/lib/sanity-utils"
import { Metadata } from "next"
import { groq } from "next-sanity"
import React from 'react'
import { MetaDataProps, ParamsProps } from "../page"
import { Lang } from "@/sanity/lib/sanity-query"
import BlogContainer from "@/components/blog/BlogContainer"


export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? "The Butcheress_ | A Collection to all blog posts about food and recipes" : "The Butcheress_ | Eine Sammlung zu allen Blog Beiträgen über Nahrung und Rezepte"
    const description = lang === "en" ? "The Butcheress_ | Blog collection about food and recipes" : "The Butcheress_ | Blog Sammlung über Nahrung und Rezepte"

    return {
        title: text,
        description: description
    }
}

const blogPostsQuery = (lang: Lang) => {
    return (
        groq`*[_type == "blogPage" && category == "blog"][0]{
            "title": title${lang},
            "blogs": *[_type == "blog" && category == "blog"]{"title": title${lang}, "description": description.description${lang}, "imageUrl": image, "url": slug.current} | order(_createdAt desc)
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