import React from 'react'
import { ParamsProps } from "../../page"
import Confirmation from "./Confirmation"


const ConfirmationPage = async ({ params: { slug } }: ParamsProps) => {
    console.log(slug)

    return (
        <main>
            <Confirmation id={slug!} />
        </main>
    )
}

export default ConfirmationPage