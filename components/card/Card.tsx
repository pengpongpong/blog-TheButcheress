import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanity-utils";
import { SanityImageAssetDocument } from "@sanity/client";
import { Locale } from "@/app/[lang]/HomePage";

type linkType = "blog" | "recipe" | "travel" | "emailContent"

export interface CardData {
    title: string;
    description: string;
    imageUrl: SanityImageAssetDocument;
    url: string;
    type: linkType;
    category?: "blog" | "travel"
    lang: Locale
}

const Card = ({ title, description, imageUrl, url, type, category, lang }: CardData) => {
    let linkHref;

    if (type === "recipe") {
        linkHref = `rezepte/${url}`
    } else if (type === "blog") {
        if (category === "travel") {
            linkHref = `reisen/${url}`
        } else {
            linkHref = `blog/${url}`
        }
    } else if (type === "emailContent") {
        linkHref = `dashboard/email/${url}`
    }

    return (
        <Link href={`/${lang}/${linkHref}`}>
            <div className="mb-8 p-4 max-w-xs max-h-fit bg-white rounded-xl font-text box-shadow">
                <p className="text-center text-2xl font-bold">{title}</p>
                <Image className="mb-4 mt-4 mx-auto object-scale-down" loading="lazy" style={{ width: "auto", height: "auto" }} width={600} height={400} src={urlFor(imageUrl).size(600, 400).auto("format").url()} alt={title} />
                <p className="text-center text-base font-base">{description}</p>
            </div>
        </Link>
    );
}

// display cards
const CardContainer = ({ data, lang }: { data?: CardData[], lang: Locale }) => {
    const items: Array<Array<CardData>> = [[], [], [], []]
    const itemsMidScreen: Array<Array<CardData>> = [[], []]

    // split data into 4 arrays for styling reason desktop
    data?.map((obj, index) => {
        const ArrayIndex = index % 4
        items[ArrayIndex].push(obj)
    })

    // split data into 2 arrays for styling reason tablet
    data?.map((obj, index) => {
        const ArrayIndex = index % 2
        itemsMidScreen[ArrayIndex].push(obj)
    })

    return (
        <>
            {/* desktop view */}
            <ul className="hidden lg:flex w-full flex-row gap-8 justify-center mx-auto list-none">
                {items.map((item, index) => {
                    if (item.length) {
                        return (<li key={index}>
                            <ul className="list-none">
                                {item.map(obj => (
                                    <li key={obj.url} className="flex justify-center items-center">
                                        <Card title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} type={obj.type} category={obj.category} lang={lang}/>
                                    </li>
                                ))}
                            </ul>
                        </li>)
                    }
                })}
            </ul>
            {/* tablet view */}
            <ul className="hidden md:flex lg:hidden w-full flex-row gap-8 justify-center mx-auto list-none">
                {itemsMidScreen.map((item, index) => {
                    if (item.length) {
                        return (<li key={index}>
                            <ul className="list-none">
                                {item.map(obj => (
                                    <li key={obj.url} className="flex justify-center items-center">
                                        <Card title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} type={obj.type} category={obj.category} lang={lang}/>
                                    </li>
                                ))}
                            </ul>
                        </li>)
                    }
                })}
            </ul>
            {/* mobile view */}
            <ul className="md:hidden w-full flex flex-col justify-center list-none">
                {data?.map(obj => {
                    if (obj.url) {
                        return (
                            <li key={obj.url} className="flex justify-center items-center">
                                <Card title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} type={obj.type} category={obj.category} lang={lang}/>
                            </li>
                        )
                    }
                })}
            </ul>
        </>
    )
}

export default CardContainer