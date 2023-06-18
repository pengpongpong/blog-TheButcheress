import React from 'react'
import Recipe from "./Recipe"
import { recipeQuery } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { MetaDataProps, ParamsProps } from "../../page"
import { transformLocale } from "@/components/utils/utils"
import { Metadata, ResolvingMetadata } from "next"


export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps, parent: ResolvingMetadata): Promise<Metadata> => {
    const pageQuery = recipeQuery(transformLocale(lang))
    const data = await client.fetch(pageQuery, { slug })

    const text = lang === "en" ? `The Butcheress_ | Recipes - ${data?.title}` : `The Butcheress_ | Rezepte - ${data?.title}`
    const description = `${data?.description} | The Butcheress_`


    return {
        title: text,
        description: `${description}`,
    }
}


const RecipePage = async ({ params: { lang, slug } }: ParamsProps) => {
    const pageQuery = recipeQuery(transformLocale(lang))

    const data = await client.fetch(pageQuery, { slug })

    return (
        <>
            <Recipe pageData={data} lang={lang} />
        </>
    )
}

export default RecipePage