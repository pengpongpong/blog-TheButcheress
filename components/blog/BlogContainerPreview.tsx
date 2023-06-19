"use client"
import React from 'react'
import BlogContainer from "./BlogContainer"
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Preview } from "@/app/[lang]/HomePreview"
import { ExitPreview } from "../preview/ExitPreview"


const BlogContainerPreview = ({ pageQuery, blogType }: Preview & { blogType: "travel" | "blog" }) => {
    const data = usePreview(null, pageQuery)
    
    return (
        <>
            <BlogContainer
                title={data?.title}
                blogData={data?.blogs}
                blogType={blogType}
            />
            <ExitPreview />
        </>
    )
}

export default BlogContainerPreview