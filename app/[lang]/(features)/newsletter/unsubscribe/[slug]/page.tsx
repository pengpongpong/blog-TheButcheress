import React from 'react'
import Confirmation from "../../subscribe/[slug]/Confirmation"
import { ParamsProps } from "@/app/[lang]/(main-nav)/page"


const UnsubscribePage = async ({ params: { slug } }: ParamsProps) => {

    return (
        <main className="flex flex-col items-center flex-grow font-text">
            <Confirmation 
            id={slug!} 
            title="TheButcheress_ Newsletter"
            fetchApi="/de/api/newsletter/unsubscribe"
            />
        </main>
    )
}

export default UnsubscribePage