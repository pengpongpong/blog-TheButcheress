"use client"
import React, { useEffect } from 'react'
import clsx from "clsx"
import { CardData } from "@/components/card/Card";
import { Lang } from "@/sanity/lib/sanity-query";
import { client } from "@/sanity/lib/sanity-utils";
import { groq } from "next-sanity";
import { useQueryStore } from "@/components/utils/store";

export interface TagsProps {
    title: string;
    url: string;
}

interface TagInputsProps {
    tags: TagsProps[];
    lang: Lang,
}

// get recipes by selected tags
const selectedTagsQuery = (lang: Lang, tagsQuery: Array<string>) => {
    return groq`*[ _type == "recipe" ${tagsQuery.join(" ")}]{
    "title": title${lang},
    "description": description.description${lang},
    "url": slug.current,
    "imageUrl": image,
    "type": _type,
    _updatedAt
    } | order(_updatedAt desc)`
}

// fetch data from CMS 
const getSelectedTags = async (lang: Lang, tags: string[]) => {
    const tagsQuery = tags.map(obj => (`&& "${obj}" in tags[]->slug.current`))

    return await client.fetch(selectedTagsQuery(lang, tagsQuery))
}

const TagInputs = ({ tags, lang }: TagInputsProps) => {
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

    // fetch data with 1s delay
    useEffect(() => {
        const setLoading = (current: boolean) => {
            useQueryStore.getState().setLoading(current)
        }

        if (query.length) setLoading(true)
        const delaySearch = setTimeout(() => {
            if (query.length) {
                getSelectedTags(lang, query)
                    .then((res: CardData[]) => setData(res))
                    .then(() => setLoading(false))
            } else if (query.length !== data.length) {
                setData([])
                setLoading(false)
            }
        }, 1000)

        return () => clearTimeout(delaySearch)
    }, [query, lang, data.length])

    // tag input
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
            <label htmlFor={title} className={`py-2 px-4 border rounded-full text-sm lg:text-base cursor-pointer bg-${labelStyle}`} onClick={() => selectTag()}>
                <input id={title} type="checkbox" className="sr-only" defaultChecked={Boolean(duplicateItem.length)} />
                <span className="inline-block">{title}</span>
            </label>
        )
    }

    return (
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
    )
}

export default TagInputs