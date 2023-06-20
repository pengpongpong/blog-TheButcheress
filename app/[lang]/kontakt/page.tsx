import React from 'react'
import ContactForm from "./ContactForm"
import { Metadata } from "next"
import { MetaDataProps, ParamsProps } from "../page"

export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? "The Butcheress_ | Contact form" : "The Butcheress_ | Kontakt Formular"
    const description = lang === "en" ? "The Butcheress_ | Contact form" : "The Butcheress_ | Kontakt Formular"

    return {
        title: text,
        description: description
    }
}

const ContactPage = ({ params: { lang } }: ParamsProps) => {
    return (
        <>
            <header>
                <h1 className="mx-auto my-4 mb-8 lg:mb-12 font-text text-4xl lg:text-6xl text-center">{lang === "en" ? "Contact me!" : "Kontaktiere mich!"}</h1>
            </header>
            <main className="mb-16 flex-grow">
                <ContactForm lang={lang} />
            </main>
        </>

    )
}

export default ContactPage