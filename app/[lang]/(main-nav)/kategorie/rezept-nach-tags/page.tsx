import React from 'react'
import { Metadata } from "next"

import { client } from "@/sanity/lib/sanity-utils"

import { transformLocale } from "@/components/utils/utils"

import { MetaDataProps, ParamsProps } from "../../page"
import RecipeByTags from "@/app/[lang]/kategorie/rezept-nach-tags/RecipeByTags"
import { groq } from "next-sanity"
import { Lang } from "@/sanity/lib/sanity-query"
import { TagsProps } from "./TagInputs"

//get all tags
const tagsQuery = (lang: Lang) => {
    return (
        groq`*[ _type == "tags"]{
        "title": title${lang},
        "url": slug.current,
        } | order(title asc)`
    )
}

export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `The Butcheress_ | Recipes by tags` : `The Butcheress_ | Rezepte nach Tags und Präferenzen`
    const description = lang === "en" ? `The Butcheress_ | A collection of recipes based on preferences` : `The Butcheress_ | Eine Sammlung von Rezepten basierend auf eigene Präferenzen`

    return {
        title: text,
        description: description
    }
}

const RecipeByTagsPage = async ({ params: { lang } }: ParamsProps) => {
    const data: TagsProps[] = await client.fetch(tagsQuery(transformLocale(lang)))

    return (
        <>
            <header>
                <h1 className="mb-8 lg:mb-20 text-center text-5xl lg:text-8xl font-headline">{lang === "en" ? "Recipes by tags" : "Rezepte nach Tags"}</h1>
            </header>
            <RecipeByTags tags={data} lang={transformLocale(lang)} />
        </>
    )
}

export default RecipeByTagsPage