"use client"
import { getCookie } from "cookies-next"
import Script from "next/script"
import React, { useEffect } from 'react'
import { useConsentStore } from "../utils/store"

const setConsent = (bool: boolean) => {
    useConsentStore.getState().setAnalyticsConsent(bool)
}

const Analytics = () => {
    const token = process.env.NEXT_PUBLIC_TINYBIRD
    const consent = useConsentStore(state => state.analyticsConsent)

    // get consent cookie & set consent state
    useEffect(() => {
        const cookieConsent = getCookie("cookie-analytics")

        setConsent(Boolean(cookieConsent))
    }, [])

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