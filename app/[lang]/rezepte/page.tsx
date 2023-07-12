import React, { lazy } from 'react'
import CardContainer, { CardData } from "@/components/card/Card"

import { transformLocale } from "@/components/utils/utils"
import { Lang, navQuery } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { Metadata } from "next"

import { MetaDataProps, ParamsProps } from "../page"
import { groq } from "next-sanity"
import Navbar from "@/components/navbar/Navbar"

// get all recipes
const recipesQuery = (lang: Lang) => {
    return (groq`*[_type == "recipe"]{
        "title": title${lang},
        "description": description.description${lang},
        "imageUrl": image,
        "url": slug.current,
        "type": _type,
        _updatedAt} | order(_updatedAt desc)`
    )
}

// meta data
export const generateMetadata = async ({ params }: MetaDataProps): Promise<Metadata> => {
    const { lang } = params
    const text = lang === "en" ? `TheButcheress_ | All recipes` : `TheButcheress_ | Alle Rezepte`
    const description = lang === "en" ? `TheButcheress_ | Browse through all delicious recipes` : `TheButcheress_ | Stöbere durch alle tollen Rezepte`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "recipes", "collection"] : ["Essen", "Rezepte", "Sammlung"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/rezepte`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

const Footer = lazy(() => import("@/components/footer/Footer"))

const RecipesPage = async ({ params: { lang } }: ParamsProps) => {
    const pageData: CardData[] = await client.fetch(recipesQuery(transformLocale(lang)))
    const navData = await client.fetch(navQuery(transformLocale(lang)))

    return (
        <>
            <Navbar navData={navData} lang={lang} />
            <header>
                <h1 className="mb-12 lg:mb-20 text-center font-text text-6xl lg:text-8xl">
                    {lang === "en" ? "Recipes" : "Rezepte"}
                </h1>
            </header>
            <main className="m-8">
                <CardContainer data={pageData} lang={lang}/>
            </main>
            <Footer lang={lang} />
        </>
    )
}

export default RecipesPage