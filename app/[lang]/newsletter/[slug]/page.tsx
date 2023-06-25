import React from 'react'
import { ParamsProps } from "../../page"
import Confirmation from "./Confirmation"


const Page = async ({ params: { slug } }: ParamsProps) => {
    console.log(slug)

    return (
        <main>
            <Confirmation id={slug!} />
        </main>
    )
}

export default Page