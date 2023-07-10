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

// query for travel blog by slug from CMS
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

// static paths
export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "travel" && defined(slug.current) && category == "travel"][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

// meta data
export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const data = await client.fetch(travelPostQuery(transformLocale(lang)), { slug })
    const text = lang === "en" ? `TheButcheress_ | A blog about travel - ${data?.title}` : `TheButcheress_ | Ein Blog über Reisen - ${data?.title}`
    const description = `TheButcheress_ | ${data?.description}`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["travel", "blog", "review"] : ["Reisen", "Blog", "Bericht"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/travel/${slug}`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'article',
        },
    }
}

const BlogPreview = lazy(() => import("@/components/blog/BlogPreview"))
const Footer = lazy(() => import("@/components/footer/Footer"))

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
            {/* <Footer lang={lang} tags={data?.tags} /> */}
        </>
}

export default TravelPost