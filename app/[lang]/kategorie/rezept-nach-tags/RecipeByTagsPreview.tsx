"use client"
import { usePreview } from "@/sanity/lib/sanity-preview"
import React from 'react'
import RecipeByTags from "./RecipeByTags";
import { Preview } from "@/app/[lang]/HomePreview";
import { ExitPreview } from "@/components/preview/ExitPreview";




const RecipeByTagsPreview = ({ pageQuery, lang }: Preview) => {
    const data = usePreview(null, pageQuery);

    return (
        <>
            <RecipeByTags tags={data} lang={lang!} />
            <ExitPreview />
        </>
    )
}

export default RecipeByTagsPreview