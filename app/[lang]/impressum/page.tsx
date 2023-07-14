import React from 'react'
import { Headline, Text } from "../datenschutz/page"
import Link from "next/link"
import { MetaDataProps, ParamsProps } from "../page"
import { Metadata } from "next"
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/sanity-utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"

// meta data
export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? "TheButcheress_ | Imprint" : "TheButcheress_ | Impressum"
    const description = lang === "en" ? `TheButcheress_ | Information about publisher of website` : `TheButcheress_ | Information über den Herausgeber der Webseite`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["imprint"] : ["Impressum"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/impressum`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'article',
        },
    }
}

// get impressum data from CMS
const getData = async (lang: Lang) => {
    const query = groq`*[_type == "impressum"][0]{"title": title${lang}, "content": content[]{"title": title${lang}, "textContent": content[]{"text": content${lang}, "link": link}}}`

    return await client.fetch(query)
}

// impressum CMS data interface
interface Impressum {
    title: string;
    content: {
        title: string;
        textContent: {
            text: string;
            link: string;
        }[]
    }[]
}

const ImpressumPage = async ({ params: { lang } }: ParamsProps) => {
    const data: Impressum = await getData(transformLocale(lang))
    return (
        <>
            <header>
                <h1 className="my-4 lg:mb-16 lg:mt-12 text-6xl lg:text-8xl text-center font-text">Impressum</h1>
            </header>
            <main className="mx-8 lg:mx-auto mb-8 lg:mb-16 lg:max-w-screen-xl lg:w-2/5 font-text flex-grow">
                {data.content.map(obj => {
                    return (
                        <Headline title={obj.title} key={obj.title}>
                            {obj.textContent.map(textData => {
                                if (textData.link !== null) {
                                    return <Link className="mb-2 inline-block" href={textData.link} key={textData.link}>{textData.text}</Link>
                                } else {
                                    return (
                                        <Text text={textData.text} key={textData.text} />
                                    )
                                }
                            })}
                        </Headline>
                    )
                })}
            </main>
        </>

    )
}

export default ImpressumPage