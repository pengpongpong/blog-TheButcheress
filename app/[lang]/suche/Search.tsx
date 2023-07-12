"use client"
import CardContainer, { CardData } from "@/components/card/Card"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React, { ChangeEventHandler, useEffect } from 'react'
import { Locale } from "../HomePage"
import Loading from "@/components/loading/Loading"
import { useSearchStore } from "@/components/utils/store"

const getData = async (query: string) => {
    const formattedQuery = query.split(" ").map(obj => (`"${obj}*"`))
    
    const searchQuery = groq`*[
        (_type in ["recipe", "blog"] && (tags[]->titleDE match [${formattedQuery}]|| tags[]->titleEN match [${formattedQuery}])) || 
        (_type in ["recipe", "blog"] && [titleDE, titleEN] match [${formattedQuery}])
        ]{"title": titleDE, "description": description.descriptionDE, "url": slug.current, "imageUrl": image, "type": _type, category}`

    return await client.fetch(searchQuery)
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

    // set input 
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        // e.preventDefault()
        if (e.target.value === "") {
            setSearch("")
        } else {
            setSearch(`${e.target.value}`)
        }
    }

    // fetch data is search input with 1s delay
    useEffect(() => {
        if (search !== "") {
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

    useEffect(() => {
        setSearch("")
    }, [])

    return (
        <>
            <input type="text" placeholder={lang === "en" ? "Enter search here" : "Gib Suche hier ein"} className="mb-12 w-4/5 lg:w-2/5 mx-auto max-w-content input input-bordered " onChange={onChange} />
            {loading ? <Loading /> : <CardContainer data={data} lang={lang}/>}
        </>
    )
}

export default Search