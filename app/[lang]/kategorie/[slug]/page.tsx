import React, { lazy } from 'react'
import { Metadata, ResolvingMetadata } from "next"

import { client } from "@/sanity/lib/sanity-utils"
import { PreviewSuspense } from "next-sanity/preview";

import { transformLocale } from "@/components/utils/utils";

import Category from "@/app/[lang]/kategorie/[slug]/Category";
import { groq } from "next-sanity";
import { MetaDataProps, ParamsProps } from "../../page";
import { draftMode } from "next/headers";
import { Lang } from "@/sanity/lib/sanity-query";
import { notFound } from "next/navigation";

//get category
const categoryQuery = (lang: Lang) => {
    return (
        groq`*[_type == "tags" && slug.current == $slug][0]{
        "title": title${lang},
        "description": description.description${lang},
        "recipes": *[_type == "recipe" && $slug in tags[]->slug.current]
        {
        "title": title${lang},
        "description": description.description${lang},
        "imageUrl": image,
        "url": slug.current,
        _updatedAt
        } | order(_updatedAt desc)}`
    )
}

export async function generateStaticParams() {
    const paths = await client.fetch(groq`*[_type == "tags" && defined(slug.current)][].slug.current`)

    return paths.map((path: string) => ({
        slug: path,
    }))
}

export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps, parent: ResolvingMetadata): Promise<Metadata> => {
    const data = await client.fetch(categoryQuery(transformLocale(lang)), { slug })
    const text = lang === "en" ? `The Butcheress_ | Food category - ${data?.title}` : `The Butcheress_ | Nahrung Kategorie - ${data?.title}`
    const description = `The Butcheress_ | ${data?.description}`

    return {
        title: text,
        description: description
    }
}

const CategoryPreview = lazy(() => import("./CategoryPreview"))

const CategoryPage = async ({ params: { lang, slug } }: ParamsProps) => {

    const { isEnabled } = draftMode()
    const data = await client.fetch(categoryQuery(transformLocale(lang)), { slug })

    // if (!data) return notFound()
    
    return isEnabled ? (
        <>
            <PreviewSuspense fallback="Ladet Preview...">
                <CategoryPreview pageQuery={categoryQuery(transformLocale(lang))} queryParams={{ slug }} />
            </PreviewSuspense>
        </>
    ) :
        <>
            <Category pageData={data} />
        </>

}

export default CategoryPage