import React from 'react'

import { MetaDataProps, ParamsProps } from "../page"
import { Metadata } from "next"
import Search from "./Search"

// meta tags
export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `TheButcheress_ | Search your favorite recipe or blog post` : `TheButcheress_ | Suche nach deinem liebsten Rezept oder Blog Beitrag`
    const description = lang === "en" ? `TheButcheress_ | Search your favorite recipe or find the latest blog post` : `TheButcheress_ | Suche nach deinem liebsten Rezept oder finde den neursten Blog Beitrag`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "recipes", "search"] : ["Essen", "Rezepte", "Suche"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/suche`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

const SearchPage = ({ params: { lang } }: ParamsProps) => {
    return (
        <>
            <header>
                <h1 className="mb-8 font-text text-8xl text-center">
                    {lang === "en" ? "Search" : "Suche"}
                </h1>
            </header>
            <main className="mx-8 lg:mx-16 mb-12 flex flex-col items-center flex-grow">
                <Search lang={lang} />
            </main>
        </>
    )
}


export default SearchPage