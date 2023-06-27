import React from 'react'
import { MetaDataProps, ParamsProps } from "../../../page"
import Confirmation from "./Confirmation"
import { Metadata } from "next"

// meta tags
export const generateMetadata = async ({ params: { lang, slug } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? `The Butcheress_ | Newsletter subscription` : `The Butcheress_ | Newsletter Anmeldung`
    const description = lang === "en" ? `The Butcheress_ | Confirm your email for newsletter subscription` : `The Butcheress_ | Bestätige deine Email für die Newsletter Anmeldung`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["food", "recipes", "travel", "newsletter", "subscribe"] : ["Essen", "Rezepte", "Reisen", "Newsletter", "Anmeldung"]

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


const ConfirmationPage = async ({ params: { slug } }: ParamsProps) => {

    return (
        <main className="flex flex-col items-center flex-grow font-text">
            <Confirmation 
            id={slug!} 
            title="TheButcheress_ Newsletter"
            fetchApi="/de/newsletter/api"
            />
        </main>
    )
}

export default ConfirmationPage