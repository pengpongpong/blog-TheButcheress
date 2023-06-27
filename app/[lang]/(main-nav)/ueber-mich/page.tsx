import Image from "next/image"
import React from 'react'
import { groq } from "next-sanity"
import { client, urlFor } from "@/sanity/lib/sanity-utils"
import { Lang } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"
import { ParamsProps } from "../page"


const getData = async (lang: Lang) => {
    const query = groq`*[_type == "aboutMe"][0]{"title": title${lang}, "subTitle": subTitle${lang}, "text": text${lang}, "image": image}`

    return await client.fetch(query)
}

const AboutMePage = async ({ params: { lang } }: ParamsProps) => {
    const data = await getData(transformLocale(lang))

    return (
        <>
            <header className="mb-8 flex flex-col justify-center items-center">
                <Image src={urlFor(data.image).size(2560, 1440).auto("format").url()} priority width={1000} height={700} style={{ width: "100vw", height: "auto" }} alt="about me" />
            </header>
            <main className="my-8 lg:my-36 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center">
                <h1 className="lg:mr-12 text-9xl lg:text-[17rem] -rotate-12 font-headline">{data?.title}</h1>
                <section className="m-8 lg:m-0 flex flex-col">
                    <p className="mb-6 text-6xl lg:text-8xl uppercase tracking-wide whitespace-pre">{data?.subTitle}</p>
                    <p className="lg:max-w-xl text-lg lg:text-xl">{data?.text}</p>
                </section>
            </main>
        </>
    )
}

export default AboutMePage