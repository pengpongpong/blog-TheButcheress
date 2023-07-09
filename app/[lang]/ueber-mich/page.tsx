import Image from "next/image"
import React from 'react'
import { groq } from "next-sanity"
import { client, urlFor } from "@/sanity/lib/sanity-utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"
import { MetaDataProps, ParamsProps } from "../page"
import { Metadata } from "next"

// get page data from CMS
const getData = async (lang: Lang) => {
    const query = groq`*[_type == "aboutMe"][0]{"title": title${lang}, "subTitle": subTitle${lang}, "text": text${lang}, "image": image}`

    return await client.fetch(query)
}

// meta data
export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const data = await getData(transformLocale(lang))
    const text = lang === "en" ? "TheButcheress_ | About me" : "TheButcheress_ | Über mich"
    const description = `TheButcheress_ | ${data?.text}`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["about me"] : ["Ueber mich"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/ueber-mich`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'website',
        },
    }
}

const AboutMePage = async ({ params: { lang } }: ParamsProps) => {
    const data = await getData(transformLocale(lang))

    return (
        <>
            <header className="mb-8 flex flex-col justify-center items-center">
                <Image src={urlFor(data.image).size(2560, 1440).auto("format").url()} priority width={1000} height={700} style={{ width: "100vw", height: "auto" }} alt="about me" />
            </header>
            <main className="m-8 lg:my-36 max-w-7xl lg:mx-auto flex flex-col md:flex-row justify-center items-center">
                <h1 className="lg:mr-12 text-9xl lg:text-[17rem] -rotate-12 font-headline w-auto">{data?.title}</h1>
                <section className="m-4 md:m-8 lg:m-0 flex flex-col w-auto">
                    <p className="mb-6 mt-4 md:mt-0 text-5xl md:text-6xl lg:text-8xl uppercase tracking-wide whitespace-pre">{data?.subTitle}</p>
                    <p className="lg:max-w-xl md:text-lg lg:text-xl">{data?.text}</p>
                </section>
            </main>
        </>
    )
}

export default AboutMePage