import { usePreview } from "@/sanity/lib/sanity-preview"
import React from 'react'
import Recipe from "./Recipe"
import { ExitPreview } from "@/components/preview/ExitPreview"
import { Preview } from "../../HomePreview"

const RecipePreview = ({ pageQuery, queryParams, lang }: Preview) => {
    const data = usePreview(null, pageQuery, queryParams);

    return (
        <>
            <Recipe pageData={data} lang={lang!}/>
            <ExitPreview />
        </>
    )
}

export default RecipePreview