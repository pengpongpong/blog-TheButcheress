"use client"
import React from "react"

import Home, { Locale } from "./HomePage";

import { Params } from "next-sanity/preview";
import { usePreview } from "@/sanity/lib/sanity-preview";
import { ExitPreview } from "@/components/preview/ExitPreview";

export interface Preview {
    pageQuery: string;
    queryParams?: Params;
    lang?: Locale
}

export default function HomePreview({ pageQuery, lang }: Preview) {
    const data = usePreview(null, pageQuery);

    return (
        <>
            <Home pageData={data} lang={lang!} />
            <ExitPreview />
        </>
    );
}