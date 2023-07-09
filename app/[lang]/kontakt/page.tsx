import React from 'react'
import ContactForm from "./ContactForm"
import { Metadata } from "next"
import { MetaDataProps, ParamsProps } from "../page"

// meta data
export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? "TheButcheress_ | Contact form" : "TheButcheress_ | Kontakt Formular"
    const description = lang === "en" ? "TheButcheress_ | Contact form" : "TheButcheress_ | Kontakt Formular"
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["contact me"] : ["Kontaktiere mich"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/kontakt`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

const ContactPage = ({ params: { lang } }: ParamsProps) => {
    return (
        <>
            <header>
                <h1 className="mx-auto my-4 mb-8 lg:mb-12 font-text text-4xl md:text-5xl lg:text-6xl text-center">{lang === "en" ? "Contact me!" : "Kontaktiere mich!"}</h1>
            </header>
            <main className="mb-16 flex-grow">
                <ContactForm lang={lang} />
            </main>
        </>

    )
}

export default ContactPage