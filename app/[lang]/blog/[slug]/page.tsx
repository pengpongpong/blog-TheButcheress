import { transformLocale } from "@/components/utils/utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { client, urlFor } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React, { lazy } from 'react'

import { MetaDataProps, ParamsProps } from "../../page"
import BlogPost from "@/components/blog/BlogPost"
import { draftMode } from "next/headers"
import Preview from "@/components/preview/Preview"
import { Metadata } from "next"

// query for blog by slug from CMS
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

// static paths
export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "blog" && defined(slug.current) && category == "blog"][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

// meta data
export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const data = await client.fetch(blogQuery(transformLocale(lang)), { slug })

    const text = lang === "en" ? `TheButcheress_ | A blog about food and recipes - ${data?.title}` : `TheButcheress_ | Ein Blog über Nahrung and Rezepte - ${data?.title}`
    const description = `TheButcheress_ | ${data?.description}`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "blog", "recipe"] : ["Essen", "Blog", "Rezept"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/blog/${slug}`,
            images: [{
                url: urlFor(data?.image).size(2560, 1440).auto("format").url(),
                width: 1000,
                height: 600,
                alt: data.title
            }],
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'article',
        },
    }
}

const BlogPreview = lazy(() => import("@/components/blog/BlogPreview"))
const Footer = lazy(() => import("@/components/footer/Footer"))

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
            <Footer lang={lang} tags={data?.tags}/>
        </>
}

export default BlogPage