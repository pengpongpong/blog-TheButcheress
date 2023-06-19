import { transformLocale } from "@/components/utils/utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { Metadata } from "next"
import { groq } from "next-sanity"
import React, { lazy } from 'react'
import { MetaDataProps, ParamsProps } from "../../page"
import { draftMode } from "next/headers"
import BlogPost from "@/components/blog/BlogPost"
import Preview from "@/components/preview/Preview"

const travelPostQuery = (lang: Lang) => {
    return (
        groq`*[_type == "blog" && slug.current == $slug && category == "travel"][0]{
            "title": title${lang},
            "author": author->name,
            image,
            "body": body${lang},
            publishedAt,
            _updatedAt,
            "description": description.description${lang},
            "tags": tags[]->{_id, "title": title${lang}, "url": slug.current},
        }`
    )
}

export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "travel" && defined(slug.current) && category == "travel"][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const data = await client.fetch(travelPostQuery(transformLocale(lang)), { slug })
    const text = lang === "en" ? `The Butcheress_ | A blog about travel - ${data?.title}` : `The Butcheress_ | Ein Blog über Reisen - ${data?.title}`
    const description = `The Butcheress_ | ${data?.description}`

    return {
        title: text,
        description: description
    }
}

const BlogPreview = lazy(() => import("@/components/blog/BlogPreview"))

const TravelPost = async ({ params: { lang, slug } }: ParamsProps) => {
    const { isEnabled } = draftMode()
    const data = await client.fetch(travelPostQuery(transformLocale(lang)), { slug })

    return isEnabled ? (
        <>
            <Preview>
                <BlogPreview pageQuery={travelPostQuery(transformLocale(lang))} lang={lang} queryParams={{ slug }} />
            </Preview>
        </>
    ) :
        <>
            <BlogPost pageData={data} lang={lang} />
        </>
}

export default TravelPost