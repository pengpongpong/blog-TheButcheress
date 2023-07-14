import { Locale } from "@/app/[lang]/HomePage";
import CardContainer, { CardData } from "@/components/card/Card"
import React from 'react'

interface BlogContainerProps {
    title: string;
    blogData: CardData[];
    lang: Locale
}

const BlogContainer = ({title, blogData, lang}: BlogContainerProps) => {
    return (
        <>
            <header className="m-8 lg:m-16 lg:mb-20 text-center">
                <h1 className="mx-auto font-text text-5xl lg:text-8xl">
                    {title}
                </h1>
            </header>
            <main className="flex-grow">
                <CardContainer data={blogData} lang={lang}/>
            </main>
        </>
    )
}

export default BlogContainer