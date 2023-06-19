"use client"
import React from 'react'
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Preview } from "@/app/[lang]/HomePreview"
import { ExitPreview } from "../preview/ExitPreview"
import BlogPost from "./BlogPost"


const BlogPreview = ({ pageQuery, lang, queryParams }: Preview) => {
    const data = usePreview(null, pageQuery, queryParams)
    
    return (
        <>
            <BlogPost pageData={data} lang={lang!} />
            <ExitPreview />
        </>
    )
}

export default BlogPreview