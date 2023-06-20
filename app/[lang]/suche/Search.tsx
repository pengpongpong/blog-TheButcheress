"use client"
import CardContainer, { CardData } from "@/components/card/Card"
import { client } from "@/sanity/lib/sanity-utils"
import { groq } from "next-sanity"
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Locale } from "../HomePage"
import { create } from "zustand"
import Loading from "@/components/loading/Loading"

const getData = async (query: string) => {
    const searchQuery = groq`*[
        (_type in ["recipe", "blog"] && (tags[]->titleDE match $query || tags[]->titleEN match $query)) || 
        (_type in ["recipe", "blog"] && [titleDE, titleEN] match $query)
        ]{"title": titleDE, "description": description.descriptionDE, "url": slug.current, "imageUrl": image}`

    return await client.fetch(searchQuery, { query: query })
}

interface SearchStore {
    search: string;
    data: CardData[];
    loading: boolean;
    setSearch: (query: string) => void;
    setData: (data: CardData[]) => void;
    setLoading: (current: boolean) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
    search: "",
    data: [],
    loading: false,
    setSearch: ((query) => set(() => ({ search: query }))),
    setData: ((data) => set(() => ({ data: data }))),
    setLoading: ((current) => set(() => ({ loading: current }))),
}))

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

    return (
        <>
            <input type="text" placeholder={lang === "en" ? "Enter search here" : "Gib Suche hier ein"} className="mb-12 input input-bordered w-4/5 lg:w-2/5 mx-auto max-w-content" onChange={onChange} />
            {loading ? <Loading /> : <CardContainer data={data} />}
        </>
    )
}

export default Search