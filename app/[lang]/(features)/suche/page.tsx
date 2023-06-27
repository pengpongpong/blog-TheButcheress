import React from 'react'

import { MetaDataProps, ParamsProps } from "../../page"
import { Metadata } from "next"
import Search from "./Search"

export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `The Butcheress_ | Search your favorite recipe or blog post` : `The Butcheress_ | Suche nach deinem liebsten Rezept oder Blog Beitrag`
    const description = lang === "en" ? `The Butcheress_ | Search your favorite recipe or find the latest blog post` : `The Butcheress_ | Suche nach deinem liebsten Rezept oder finde den neursten Blog Beitrag`

    return {
        title: text,
        description: description
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