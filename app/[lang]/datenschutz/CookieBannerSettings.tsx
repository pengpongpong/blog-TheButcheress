"use client"
import { handleCookieModal } from "@/components/cookie-banner/CookieBanner"
import CookieModal from "@/components/cookie-banner/CookieModal"
import React from 'react'
import { Locale } from "../HomePage"


const CookieBannerSettings = ({lang}: {lang: Locale}) => {

    return (
        <div className="mt-8 text-center">
            <button className="mt-4 btn btn-outline hover:bg-primary hover:text-neutral box-shadow" onClick={handleCookieModal}>Change cookie preference here</button>
            <CookieModal lang={lang}/>
        </div>
    )
}

export default CookieBannerSettings