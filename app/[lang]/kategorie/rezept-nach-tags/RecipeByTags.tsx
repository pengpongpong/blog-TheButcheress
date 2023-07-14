"use client"
import React, { lazy } from 'react'

import TagInputs, { TagsProps } from "./TagInputs"
import { transformLocale } from "@/components/utils/utils"
import { useQueryStore } from "@/components/utils/store"
import Loading from "@/components/loading/Loading"
import { Locale } from "../../HomePage"

export interface RecipeByTagsProps {
    tags: TagsProps[];
    lang: Locale
}

const CardContainer = lazy(() => import("@/components/card/Card"))

const RecipeByTags = ({ tags, lang }: RecipeByTagsProps) => {
    const data = useQueryStore((state) => state.data)
    const loading = useQueryStore((state) => state.loading)

    return (
        <>
            <main className="flex flex-col items-center gap-16 flex-grow">
                <TagInputs
                    tags={tags}
                    lang={transformLocale(lang)}
                />
                <section>
                    {loading ? <Loading /> : <CardContainer data={data} lang={lang}/>}
                </section>
            </main>
        </>
    )
}

export default RecipeByTags