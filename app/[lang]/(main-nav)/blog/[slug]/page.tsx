import { transformLocale } from "@/components/utils/utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React, { lazy } from 'react'

import BlogPost from "@/components/blog/BlogPost"
import { draftMode } from "next/headers"
import Preview from "@/components/preview/Preview"
import { Metadata } from "next"
import { MetaDataProps, ParamsProps } from "../../page"

const blogQuery = (lang: Lang) => {
    return (groq`*[_type == "blog" && slug.current == $slug && category == "blog"][0]{
        "author": author->name,
        "title": title${lang},
        image,
        "body": body${lang},
        publishedAt,
        _updatedAt,
        "description": description.description${lang},
        "tags": tags[]->{_id, "title": title${lang}, "url": slug.current}
        }`)
}

export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "blog" && defined(slug.current) && category == "blog"][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const data = await client.fetch(blogQuery(transformLocale(lang)), { slug })

    const text = lang === "en" ? `The Butcheress_ | A blog about food and recipes - ${data?.title}` : `The Butcheress_ | Ein Blog über Nahrung and Rezepte - ${data?.title}`
    const description = `The Butcheress_ | ${data?.description}`

    return {
        title: text,
        description: description
    }
}

const BlogPreview = lazy(() => import("@/components/blog/BlogPreview"))

const BlogPage = async ({ params: { lang, slug } }: ParamsProps) => {
    const { isEnabled } = draftMode()
    const data = await client.fetch(blogQuery(transformLocale(lang)), { slug })

    return isEnabled ? (
        <>
            <Preview>
                <BlogPreview pageQuery={blogQuery(transformLocale(lang))} lang={lang} queryParams={{ slug }} />
            </Preview>
        </>

    ) :
        <>
            <BlogPost pageData={data} lang={lang} />
        </>
}

export default BlogPage