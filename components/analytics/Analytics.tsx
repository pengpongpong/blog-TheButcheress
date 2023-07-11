"use client"
import { getCookie } from "cookies-next"
import Script from "next/script"
import React from 'react'


const Analytics = async () => {
    const token = process.env.NEXT_PUBLIC_TINYBIRD
    const consent = await getCookie("cookie-preference")
    
    console.log(consent)

    return (
        <>
            {consent === true ? <Script
                defer
                src="https://unpkg.com/@tinybirdco/flock.js"
                data-host="https://api.tinybird.co"
                data-token={token}
                id="tinybird"
            /> : ""}
        </>
    )
}

export default Analytics