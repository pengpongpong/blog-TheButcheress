import React from 'react'
import Category from "./Category"
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Preview } from "@/app/[lang]/HomePreview";
import { ExitPreview } from "@/components/preview/ExitPreview";
import { Locale } from "../../HomePage";



const CategoryPreview = ({ pageQuery, queryParams, lang }: Preview & { lang: Locale }) => {
    const data = usePreview(null, pageQuery, queryParams);

    return (
        <>
            <Category pageData={data} lang={lang} />
            <ExitPreview />
        </>
    )
}

export default CategoryPreview