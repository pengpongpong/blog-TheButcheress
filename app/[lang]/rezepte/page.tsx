import React from 'react'
import CardContainer, { CardData } from "@/components/card/Card"

import { transformLocale } from "@/components/utils/utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { Metadata, ResolvingMetadata } from "next"

import { MetaDataProps, ParamsProps } from "../page"
import { groq } from "next-sanity"

//get all recipes
const recipesQuery = (lang: Lang) => {
    return (groq`*[_type == "recipe"]{
        "title": title${lang},
        "description": description.description${lang},
        "imageUrl": image,
        "url": slug.current}`
    )
}

export const generateMetadata = async ({ params }: MetaDataProps, parent: ResolvingMetadata): Promise<Metadata> => {
    const { lang } = params
    const text = lang === "en" ? `The Butcheress_ | All recipes` : `The Butcheress_ | Alle Rezepte`
    const description = lang === "en" ? `The Butcheress_ | Browse through all delicious recipes` : `The Butcheress_ | Stöbere durch alle tollen Rezepte`

    return {
        title: text,
        description: `${description}`,
    }
}

const RecipesPage = async ({ params: { lang } }: ParamsProps) => {
    const pageData: CardData[] = await client.fetch(recipesQuery(transformLocale(lang)))

    return (
        <>
            <header>
                <h1 className="mb-12 lg:mb-20 text-center font-text text-6xl lg:text-8xl">
                    {lang === "en" ? "Recipes" : "Rezepte"}
                </h1>
            </header>
            <main className="m-8">
                <CardContainer data={pageData} />
            </main>
        </>
    )
}

export default RecipesPage