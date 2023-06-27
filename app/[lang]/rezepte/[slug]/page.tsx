import React, { lazy } from 'react'
import Recipe from "./Recipe"
import { client, urlFor } from "@/sanity/lib/sanity-utils"
import { MetaDataProps, ParamsProps } from "../../page"
import { transformLocale } from "@/components/utils/utils"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import Preview from "@/components/preview/Preview"
import RecipePreview from "./RecipePreview"
import { groq } from "next-sanity"
import { Lang, navQuery } from "@/sanity/lib/sanity-query"
import Navbar from "@/components/navbar/Navbar"
import { notFound } from "next/navigation"

// get recipe by slug
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

// static paths
export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "recipe" && defined(slug.current)][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

// meta data
export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const pageQuery = recipeQuery(transformLocale(lang))
    const data = await client.fetch(pageQuery, { slug })

    const text = lang === "en" ? `The Butcheress_ | Recipes - ${data?.title}` : `The Butcheress_ | Rezepte - ${data?.title}`
    const description = `${data?.description} | The Butcheress_`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "recipe", `${data.title}`] : ["Essen", "Rezept", `${data.title}`]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/rezepte/${slug}`,
            siteName: 'TheButcheress_',
            images: [
                {
                    url: urlFor(data?.imageUrl).size(2560, 1440).auto("format").url(),
                    width: 800,
                    height: 500,
                    alt: data.title
                },
            ],
            locale: lang,
            type: 'website',
        },
    }
}

const Footer = lazy(() => import("@/components/footer/Footer"))

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
            <Navbar navData={navData} lang={lang} />
            <Recipe pageData={data} lang={lang} />
            <Footer lang={lang} tags={data?.tags}/>
        </>
}

export default RecipePage