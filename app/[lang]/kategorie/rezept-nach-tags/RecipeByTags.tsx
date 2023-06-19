"use client"
import React, { lazy, useEffect } from 'react'

import { create } from "zustand"
import { CardData } from "@/components/card/Card"
import clsx from "clsx"
import { Lang } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"

export interface TagsProps {
    title: string;
    url: string;
}

interface QueryStore {
    query: string[];
    data: CardData[];
    addQuery: (url: string) => void;
    setQuery: (url: string[]) => void;
    setData: (result: CardData[]) => void;
}

export interface RecipeByTagsProps {
    tags: TagsProps[];
    lang: Lang
}

//get recipes by selected tags
const selectedTagsQuery = (lang: Lang, tagsQuery: Array<string>) => {
    return groq`*[ _type == "recipe" ${tagsQuery.join(" ")}]{
      "title": title${lang},
      "description": description.description${lang},
      "url": slug.current,
      "imageUrl": image}`
}

const useQueryStore = create<QueryStore>((set) => ({
    query: [],
    data: [],
    addQuery: (url) => set((state) => ({ query: [...state.query, url] })),
    setQuery: (url) => set(() => ({ query: url })),
    setData: (result) => set(() => ({ data: result }))
}))

const CardContainer = lazy(() => import("@/components/card/Card"))

const getSelectedTags = async (lang: Lang, tags: string[]) => {
    const tagsQuery = tags.map(obj => (`&& "${obj}" in tags[]->slug.current`))

    return await client.fetch(selectedTagsQuery(lang, tagsQuery))
}

const RecipeByTags = ({ tags, lang }: RecipeByTagsProps) => {
    const query = useQueryStore((state) => state.query)
    const data = useQueryStore((state) => state.data)

    const addQuery = (url: string) => {
        useQueryStore.getState().addQuery(url)
    }

    const setQuery = (url: string[]) => {
        useQueryStore.getState().setQuery(url)
    }

    const setData = (result: CardData[]) => {
        useQueryStore.getState().setData(result)
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (query.length) {
                getSelectedTags(lang, query).then((res: CardData[]) => setData(res))
            } else if (query.length !== data.length) {
                setData([])
            }
        }, 1000)

        return () => clearTimeout(delaySearch)
    }, [query, data.length, lang])


    const TagInput = ({ title, url }: { title: string, url: string }) => {
        const duplicateItem = query.filter(obj => obj === url)

        const selectTag = () => {
            if (duplicateItem.length > 0) {
                const indexTag = query.indexOf(url)
                const queryData = [...query]
                queryData.splice(indexTag, 1)
                return setQuery(queryData)
            } else {
                return addQuery(url)
            }
        }

        const labelStyle = clsx(!duplicateItem.length && "primary", duplicateItem.length && "base-200")

        return (
            <label className={`py-2 px-4 border rounded-full text-sm lg:text-base cursor-pointer bg-${labelStyle}`} onClick={() => selectTag()}>
                <input type="checkbox" className="sr-only" defaultChecked={Boolean(duplicateItem.length)} />
                <span className="inline-block">{title}</span>
            </label>
        )
    }
    return (
        <>
            <header>
                <h1 className="mb-8 lg:mb-20 text-center text-5xl lg:text-8xl font-headline">{lang === "EN" ? "Recipes by tags" : "Rezepte nach Tags"}</h1>
            </header>
            <main className="flex flex-col items-center gap-16">
                <section className="flex flex-col gap-8 lg:gap-12 justify-center items-center">
                    <div className="mx-8 flex justify-center items-center gap-2 lg:gap-4 flex-wrap lg:w-2/3 lg:mx-auto">
                        {tags.map(obj => {
                            return (
                                <TagInput url={obj.url} title={obj.title} key={obj.url} />
                            )
                        })}
                    </div>
                    <button className="py-2 px-16 border font-text text-center text-xl lg:text-2xl bg-primary hover:bg-base-200 transition duration-200 rounded-full" onClick={() => { setData([]); setQuery([]) }} >Reset</button>
                </section>
                <section>
                    <CardContainer data={data} />
                </section>
            </main>
        </>
    )
}

export default RecipeByTags