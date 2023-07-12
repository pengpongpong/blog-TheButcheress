"use client"
import React from 'react'
import BlogContainer from "./BlogContainer"
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Preview } from "@/app/[lang]/HomePreview"
import { ExitPreview } from "../preview/ExitPreview"
import { Locale } from "@/app/[lang]/HomePage"


const BlogContainerPreview = ({ pageQuery, lang }: Preview & { blogType: "travel" | "blog", lang: Locale }) => {
    const data = usePreview(null, pageQuery)

    return (
        <>
            <BlogContainer
                title={data?.title}
                blogData={data?.blogs}
                lang={lang}
            />
            <ExitPreview />
        </>
    )
}

export default BlogContainerPreview