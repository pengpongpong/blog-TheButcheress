"use client"
import { handleCookieModal } from "@/components/cookie-banner/CookieBanner"
import CookieModal from "@/components/cookie-banner/CookieModal"
import React from 'react'


const CookieBannerSettings = () => {

    return (
        <div>
            <button className="mt-4 btn btn-outline" onClick={handleCookieModal}>Change cookie preference here</button>
            <CookieModal/>
        </div>
    )
}

export default CookieBannerSettings