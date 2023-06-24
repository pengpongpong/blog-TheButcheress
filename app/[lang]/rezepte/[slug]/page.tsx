import React from 'react'
import Recipe from "./Recipe"
import { client } from "@/sanity/lib/sanity-utils"
import { MetaDataProps, ParamsProps } from "../../page"
import { transformLocale } from "@/components/utils/utils"
import { Metadata, ResolvingMetadata } from "next"
import { draftMode } from "next/headers"
import Preview from "@/components/preview/Preview"
import RecipePreview from "./RecipePreview"
import { groq } from "next-sanity"
import { Lang, navQuery } from "@/sanity/lib/sanity-query"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import { notFound } from "next/navigation"

//get specific recipe
const recipeQuery = (lang: Lang) => {
    return (groq`*[_type == "recipe" && slug.current == $slug][0]{
        ingredients[]{"title": title${lang},
        ingredientsList[]{"title": title${lang},
        "quantity": quantity${lang}}},
        instructions[]{"title": title${lang},"content": content${lang}, image, _id, tipp[]{"title": title${lang}, _id, "content": content${lang}}},
        prepTime,
        totalTime,
        servings,
        "imageUrl": image.asset->url,
        tags[]->{_id, "title": title${lang}, "url": slug.current},
        "title": title${lang},
        "description": description.description${lang},
        "pdf": pdf.pdf${lang}.asset->url
        }
        `)
}

export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "recipe" && defined(slug.current)][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

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
    const { isEnabled } = draftMode()
    const data = await client.fetch(pageQuery, { slug })
    const navData = await client.fetch(navQuery(transformLocale(lang)))

    if (!data) return notFound()

    return isEnabled ? (
        <>
            <Preview>
                <RecipePreview pageQuery={pageQuery} lang={lang} queryParams={{ slug }} />
            </Preview>
        </>
    ) :
        <>
            <Recipe pageData={data} lang={lang} />
        </>
}

export default RecipePage