"use client"
import CardContainer, { CardData } from "@/components/card/Card"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React, { ChangeEventHandler, useEffect, useRef } from 'react'
import { Locale } from "../HomePage"
import Loading from "@/components/loading/Loading"
import { useSearchStore } from "@/components/utils/store"

const getData = async (query: string) => {
    const searchQuery = groq`*[
        (_type in ["recipe", "blog"] && (tags[]->titleDE match $query || tags[]->titleEN match $query)) || 
        (_type in ["recipe", "blog"] && [titleDE, titleEN] match $query)
        ]{"title": titleDE, "description": description.descriptionDE, "url": slug.current, "imageUrl": image}`

    return await client.fetch(searchQuery, { query: query })
}

const Search = ({ lang }: { lang: Locale }) => {
    const data = useSearchStore((state) => state.data)
    const search = useSearchStore((state) => state.search)
    const loading = useSearchStore((state) => state.loading)

    const setSearch = (query: string) => {
        useSearchStore.getState().setSearch(query)
    }

    const setData = (data: CardData[]) => {
        useSearchStore.getState().setData(data)
    }

    const setLoading = (current: boolean) => {
        useSearchStore.getState().setLoading(current)
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value === "") {
            setSearch("")
        } else {
            setSearch(`${e.target.value}*`)
        }
    }

    useEffect(() => {
        if (search) {
            setLoading(true)
            const delaySearch = setTimeout(() => {
                getData(search)
                    .then((res: CardData[]) => setData(res))
                    .then(() => setLoading(false))
            }, 1000)

            return () => clearTimeout(delaySearch)
        } else if (!search && data.length) {
            setData([])
            setLoading(false)
        }
    }, [search, data.length])

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault()
                }
            })
        }
    }, [])
    return (
        <>
                <input ref={inputRef} type="text" placeholder={lang === "en" ? "Enter search here" : "Gib Suche hier ein"} className="mb-12 w-4/5 lg:w-2/5 mx-auto max-w-content input input-bordered " onChange={onChange} />
            {loading ? <Loading /> : <CardContainer data={data} />}
        </>
    )
}

export default Search