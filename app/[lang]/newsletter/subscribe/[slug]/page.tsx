import React from 'react'
import { ParamsProps } from "../../../page"
import Confirmation from "./Confirmation"


const ConfirmationPage = async ({ params: { slug } }: ParamsProps) => {

    return (
        <main className="flex flex-col items-center flex-grow font-text">
            <Confirmation 
            id={slug!} 
            title="TheButcheress_ Newsletter"
            fetchApi="/de/newsletter/api"
            />
        </main>
    )
}

export default ConfirmationPage