import React from 'react'
import Confirmation from "../../subscribe/[slug]/Confirmation"
import { MetaDataProps, ParamsProps } from "@/app/[lang]/page"
import { Metadata } from "next"

// meta tags
export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `TheButcheress_ | Newsletter unsubscribe` : `TheButcheress_ | Newsletter Abmeldung`
    const description = lang === "en" ? `TheButcheress_ | Unsubscribe for newsletter` : `TheButcheress_ | Abmeldung vom Newsletter`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "recipes", "travel", "newsletter", "unsubscribe"] : ["Essen", "Rezepte", "Reisen", "Newsletter", "Abmeldung"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/subscribe/${slug}`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

const UnsubscribePage = async ({ params: { slug } }: ParamsProps) => {

    return (
        <main className="flex flex-col items-center flex-grow font-text">
            <Confirmation
                id={slug!}
                title="TheButcheress_ Newsletter"
                fetchApi="/de/api/newsletter/unsubscribe"
            />
        </main>
    )
}

export default UnsubscribePage