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
}

const Card = ({ title, description, imageUrl, url, blog }: CardData & { blog?: string }) => {
    let linkHref;

    if (blog === "blog") {
        linkHref = `blog/${url}`
    } else if (blog === "travel") {
        linkHref = `reisen/${url}`
    } else {
        linkHref = `rezepte/${url}`
    }

    return (
        <Link href={`/${linkHref}`}>
            <div className="mb-8 p-4 max-w-xs max-h-fit bg-white rounded-xl font-text">
                <p className="text-center text-2xl font-bold">{title}</p>
                <Image className="mb-4 mt-4 mx-auto object-scale-down" loading="lazy" style={{width: "auto", height: "auto"}} width={600} height={400} src={urlFor(imageUrl).size(600, 400).auto("format").url()} alt={title} />
                <p className="text-center text-base font-base">{description}</p>
            </div>
        </Link>
    );
}


const CardContainer = ({ data, blog }: { data?: CardData[], blog?: string }) => {
    const items: Array<Array<CardData>> = [[], [], [], []]

    data?.map((obj, index) => {
        const ArrayIndex = index % 4
        items[ArrayIndex].push(obj)
    })

    return (
        <>
            <ul className="hidden lg:flex w-full flex-row gap-8 justify-center mx-auto list-none">
                <li>
                    <ul className="list-none">
                        {items[0]?.map(obj => (
                            <li key={obj.url} className="flex justify-center items-center">
                                <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} />
                            </li>
                        ))}
                    </ul>
                </li>
                {items[1].length ? <li>
                    <ul className="list-none">
                        {items[1]?.map(obj => (
                            <li key={obj.url} className="flex justify-center items-center">
                                <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} />
                            </li>
                        ))}
                    </ul>
                </li> : ""}
                {items[2].length ? <li>
                    <ul className="list-none">
                        {items[2]?.map(obj => (
                            <li key={obj.url} className="flex justify-center items-center">
                                <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} />
                            </li>
                        ))}
                    </ul>
                </li> : ""}
                {items[3].length ? <li>
                    <ul className="list-none">
                        {items[3]?.map(obj => (
                            <li key={obj.url} className="flex justify-center items-center">
                                <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} />
                            </li>
                        ))}
                    </ul>
                </li> : ""}
            </ul>
            <ul className="lg:hidden w-full flex flex-col justify-center list-none">
                {data?.map(obj => (
                    <li key={obj.url} className="flex justify-center items-center">
                        <Card blog={blog} title={obj.title} description={obj.description} imageUrl={obj.imageUrl} url={obj.url} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CardContainer