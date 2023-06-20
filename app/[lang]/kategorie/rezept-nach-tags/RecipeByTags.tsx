"use client"
import React, { lazy } from 'react'

import { Lang } from "@/sanity/lib/sanity-query"
import TagInputs, { TagsProps, useQueryStore } from "./TagInputs"
import { transformLocale } from "@/components/utils/utils"
import Loading from "@/components/loading/Loading"

export interface RecipeByTagsProps {
    tags: TagsProps[];
    lang: Lang
}

const CardContainer = lazy(() => import("@/components/card/Card"))

const RecipeByTags = ({ tags, lang }: RecipeByTagsProps) => {
    const data = useQueryStore((state) => state.data)
    const loading = useQueryStore((state) => state.loading)

    return (
        <>
            <main className="flex flex-col items-center gap-16">
                <TagInputs
                    tags={tags}
                    lang={transformLocale(lang)}
                />
                <section>
                    {loading ? <Loading /> : <CardContainer data={data} />}
                </section>
            </main>
        </>
    )
}

export default RecipeByTags