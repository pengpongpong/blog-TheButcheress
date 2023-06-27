import React from 'react'
import Category from "./Category"
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Preview } from "@/app/[lang]/HomePreview";
import { ExitPreview } from "@/components/preview/ExitPreview";



const CategoryPreview = ({pageQuery, queryParams}: Preview) => {
    const data = usePreview(null, pageQuery, queryParams);
    
    return (
        <>
            <Category pageData={data} />
            <ExitPreview />
        </>
    )
}

export default CategoryPreview