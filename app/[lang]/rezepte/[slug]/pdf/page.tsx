import React from 'react'
import { Metadata } from "next";

import { client } from "@/sanity/lib/sanity-utils";
import { groq } from "next-sanity";
import { MetaDataProps, ParamsProps } from "@/app/[lang]/page";
import { transformLocale } from "@/components/utils/utils";

// meta data
export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `TheButcheress_ | Download or print the recipe as PDF version` : `TheButcheress_ | Lade oder drucke das Rezept als PDF Version`
    const description = lang === "en" ? `TheButcheress_ | Download or print the recipe as PDF version` : `TheButcheress_ | Drucke das Rezept als PDF Version oder lade es downloade es.`

    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "recipe", "pdf"] : ["Essen", "Rezept", "pdf"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/rezepte/${slug}/pdf`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

// static paths
export const generateStaticParams = async () => {
    const paths = await client.fetch(groq`*[_type == "recipe" && defined(slug.current)][].slug.current`)

    return paths.map((path: string) => ({
        slug: path
    }))
}

const Index = async ({ params: { lang, slug } }: ParamsProps) => {
    const locale = transformLocale(lang)
    const data = await client.fetch(groq`*[_type == "recipe" && slug.current == $slug][0]{
        "title": title${locale},
        "url": pdf.pdf${locale}.asset->url
        }`, { slug })

    if (data) {
        return <iframe src={`${data?.url}#view=fitH`} title={data?.title} width={"100%"} height={"100%"} />
    } else {
        return <h1 className="font-text text-xl text-center">Oops... no PDF here sorry!</h1>
    }
}

export default Index

