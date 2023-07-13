import React, { ReactNode } from 'react'
import { MetaDataProps, ParamsProps } from "../page"
import { Metadata } from "next"
import { Lang } from "@/sanity/lib/sanity-query"
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/sanity-utils"
import { transformLocale } from "@/components/utils/utils"
import CookieBannerSettings from "./CookieBannerSettings"

export const Headline = ({ children, title }: { children: ReactNode, title: string }) => {
    return (
        <>
            <h2 className="mb-4 mt-8 text-lg">{title}</h2>
            {children}
        </>
    )
}

export const Text = ({ text }: { text: string }) => {
    return <p className="mb-2">{text}</p>
}

// meta data
export const generateMetadata = async ({ params: { lang } }: MetaDataProps): Promise<Metadata> => {
    const text = lang === "en" ? "TheButcheress_ | Data privacy" : "TheButcheress_ | Datenschutz"
    const description = lang === "en" ? `TheButcheress_ | Data privacy` : `TheButcheress_ | Datenschutz`
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const keywords = lang === "en" ? ["data privacy"] : ["Datenschutz"]

    return {
        title: text,
        description: description,
        keywords: keywords,
        authors: [{ name: 'TheButcheress_' }],
        openGraph: {
            title: text,
            description: description,
            url: `${domain}/${lang}/datenschutz`,
            siteName: 'TheButcheress_',
            locale: lang,
            type: 'article',
        },
    }
}


// get privacy policy data from CMS
const getData = async (lang: Lang) => {
    const query = groq`*[_type == "privacyPolicy"][0]{"title": title${lang}, "content": content[]{"title": title${lang}, "textContent": content[]{"text": content${lang}, "link": link}}}`

    return await client.fetch(query)
}

// impressum CMS data interface
interface PrivacyPolicy {
    title: string;
    content: {
        title: string;
        textContent: {
            text: string;
            link: string;
        }[]
    }[]
}

const PrivacyPolicyPage = async ({ params: { lang } }: ParamsProps) => {
    const data: PrivacyPolicy = await getData(transformLocale(lang))

    return (
        <>
            <header>
                <h1 className="my-4 xl:mb-16 xl:mt-12 text-6xl xl:text-8xl text-center font-text">Datenschutz</h1>
            </header>
            <main className="mx-8 xl:mx-auto mb-8 xl:mb-16 xl:max-w-screen-xl font-text">
                {data.content.map(obj => {
                    return (
                        <Headline title={obj.title} key={obj.title}>
                            {obj.textContent.map(textData => {
                                return <Text text={textData.text} key={textData.text} />
                            })}
                        </Headline>
                    )
                })}
                <CookieBannerSettings/>
            </main>
        </>

    )
}

export default PrivacyPolicyPage