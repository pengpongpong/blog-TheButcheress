import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanity-utils";
import { SanityImageAssetDocument } from "@sanity/client";

export interface CardData {
    title: string;
    description: string;
    imageUrl: SanityImageAssetDocument;
    url: string;
    type: string;
    blogCategory?: "blog" | "travel";
}

const Card = ({ title, description, imageUrl, url, blog, type, blogCategory }: CardData & { blog?: string }) => {
    let linkHref;

    if (type === "recipe") {
        linkHref = `rezepte/${url}`
    } else if (type === "blog" && blogCategory === "blog") {
        linkHref = `blog/${url}`
    } else if (type === "blog" && blogCategory === "travel") {
        linkHref = `reisen/${url}`
    }

    return (
        <Link href={`/${linkHref}`}>
            <div className="mb-8 p-4 max-w-xs max-h-fit bg-white rounded-xl font-text">
                <p className="text-center text-2xl font-bold">{title}</p>
                <Image className="mb-4 mt-4 mx-auto object-scale-down" loading="lazy" style={{ width: "auto", height: "auto" }} width={600} height={400} src={urlFor(imageUrl).size(600, 400).auto("format").url()} alt={title} />
                <p className="text-center text-base font-base">{description}</p>
            </div>
        </Link>
    );
}

// display cards
const CardContainer = ({ data, blog }: { data?: CardData[], blog?: string }) => {
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
                                        <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} type={obj.type} blogCategory={obj?.blogCategory} />
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
                                        <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} type={obj.type} blogCategory={obj?.blogCategory} />
                                    </li>
                                ))}
                            </ul>
                        </li>)
                    }
                })}
            </ul>
            {/* mobile view */}
            <ul className="md:hidden w-full flex flex-col justify-center list-none">
                {data?.map(item => {
                    if (item.url) {
                        return (
                            <li key={item.url} className="flex justify-center items-center">
                                <Card blog={blog} title={item.title} description={item.description} imageUrl={item.imageUrl} url={item.url} type={item.type} blogCategory={item?.blogCategory} />
                            </li>
                        )
                    }
                })}
            </ul>
        </>
    )
}

export default CardContainer