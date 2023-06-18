"use client"
import React from "react"

import Home from "./HomePage";


import { Params } from "next-sanity/preview";
import { Lang } from "@/sanity/lib/sanity-query";
import { usePreview } from "@/sanity/lib/sanity-preview";
import { ExitPreview } from "@/components/preview/ExitPreview";

export interface Preview {
    pageQuery: string;
    queryParams?: Params;
    lang?: Lang
}

export default function HomePreview({ pageQuery, lang }: Preview) {
    const data = usePreview(null, pageQuery);

    return (
        <>
            <Home pageData={data} lang={lang as Lang} />
            <ExitPreview />
        </>
    );
}