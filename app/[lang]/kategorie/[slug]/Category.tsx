import React, { lazy } from 'react'

import { CardData } from "@/components/card/Card";

export interface PageDataProps {
    title: string;
    description: string;
    recipes?: CardData[]
}

export interface CategoryProps {
    pageData: PageDataProps;
}

const CardContainer = lazy(() => import("@/components/card/Card"))

function Category({ pageData }: CategoryProps) {

    return (
        <>
            <header className="m-8 lg:m-16 lg:mb-24 text-center">
                <h1 className="font-headline mb-8 lg:mb-20 text-5xl md:text-7xl lg:text-8xl">{pageData?.title}</h1>
                <p className="font-text text-base lg:text-xl">{pageData?.description}</p>
            </header>
            <main className="m-8 lg:m-16 flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-center flex-wrap">
                <CardContainer data={pageData?.recipes} />
            </main>
        </>
    )

}

export default Category