"use client"
import CardContainer, { CardData } from "@/components/card/Card"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Locale } from "../HomePage"

const getData = async (query: string) => {
    const searchQuery = groq`*[
        (_type in ["recipe", "blog"] && (tags[]->titleDE match $query || tags[]->titleEN match $query)) || 
        (_type in ["recipe", "blog"] && [titleDE, titleEN] match $query)
        ]{"title": titleDE, "description": description.descriptionDE, "url": slug.current, "imageUrl": image}`

    return await client.fetch(searchQuery, { query: query })
}

const Search = ({ lang }: { lang: Locale }) => {
    const [search, setSearch] = useState<string>("")
    const [data, setData] = useState<CardData[]>([])


    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value === "") {
            setSearch("")
        } else {
            setSearch(`${e.target.value}*`)
        }
    }

    useEffect(() => {
        if (search) {
            const delaySearch = setTimeout(() => {
                getData(search).then((res: CardData[]) => setData(res))
            }, 1000)

            return () => clearTimeout(delaySearch)
        } else if (!search && data.length) {
            setData([])
        }
    }, [search, data.length])

    return (
        <>
            <input type="text" placeholder={lang === "en" ? "Enter search here" : "Gib Suche hier ein"} className="mb-12 input input-bordered w-4/5 lg:w-2/5 mx-auto max-w-content" onChange={onChange} />
            {data?.length ? <CardContainer data={data} /> : ""}
        </>
    )
}

export default Search