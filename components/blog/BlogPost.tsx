import Image from "next/image"
import React from 'react'
import { urlFor } from "@/sanity/lib/sanity-utils"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { PortableTextBlock } from "sanity"
import { TagsType } from "@/app/[lang]/rezepte/[slug]/Recipe"
import SocialShare from "../socials/SocialShare"
import { Locale } from "@/app/[lang]/HomePage"
import Blog from "./Blog"

export interface BlogProps {
    pageData: {
        title: string;
        author: string;
        publishedAt: string;
        _updatedAt: string;
        description: string;
        image: SanityImageSource,
        body: PortableTextBlock,
        tags: TagsType[],
    };
    lang: Locale
}

const styles = {
    main: "mt-8 flex gap-6 justify-center items-center w-full",
    second: "pr-6 pl-6 border-r-2 border-l-2 border-solid",
    iconSize: 26
}

const BlogPost = ({ pageData, lang }: BlogProps) => {
    let publishedDate;
    let updatedDate;

    if (pageData?.publishedAt && lang === "en") {
        publishedDate = new Intl.DateTimeFormat("en-US", { dateStyle: 'full' }).format(new Date(pageData?.publishedAt))
        updatedDate = new Intl.DateTimeFormat("en-US", { dateStyle: 'full' }).format(new Date(pageData?._updatedAt))
    } else if (pageData?.publishedAt && lang === "de") {
        publishedDate = new Intl.DateTimeFormat("de-DE", { dateStyle: 'full' }).format(new Date(pageData?.publishedAt))
        updatedDate = new Intl.DateTimeFormat("de-DE", { dateStyle: 'full' }).format(new Date(pageData?._updatedAt))
    }

    return (
        <>
            <header className="m-8 lg:mt-16 lg:ml-16 lg:mr-16 text-center">
                <h1 className="mx-auto mb-8 lg:mb-20 font-text text-5xl lg:text-8xl">
                    {pageData?.title}
                </h1>
                {pageData?.image ? <Image className="mx-auto" priority style={{ width: "auto", height: "auto" }} width={1000} height={600} src={urlFor(pageData?.image).size(2560, 1440).auto("format").url()} alt="Blog image" /> : ""}
                <SocialShare blog lang={lang} title={pageData?.title} styles={styles} />
                <address className="mt-8 flex flex-col justify-center items-center text-lg font-text">
                    <p>{lang === "en" ? "Published" : "Veröffentlicht am"} <time dateTime="YYYY-MM-DD">{publishedDate}</time></p>
                    <p>{lang === "en" ? "Last updated on" : "Zuletzt geändert am"} <time dateTime="YYYY-MM-DD">{updatedDate}</time></p>
                    <p>{lang === "en" ? "By" : "Von"} {pageData?.author}</p>
                </address>
            </header>
            <main className="m-8 mb-20 lg:ml-16 lg:mr-16 lg:mb-16">
                <Blog body={pageData?.body} />
            </main>
        </>
    )
}

export default BlogPost