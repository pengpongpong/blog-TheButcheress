"use client"
import CookieModal from "@/components/cookie-banner/CookieModal"
import { useConsentStore } from "@/components/utils/store"
import React from 'react'

const setOpen = (bool: boolean) => {
    useConsentStore.getState().setOpen(bool)
}

const CookieBannerSettings = () => {

    const openCookieBanner = () => {
        setOpen(true)
    }
    return (
        <div>
            <button className="mt-4 btn btn-outline" onClick={openCookieBanner}>Change cookie preference here!</button>
            <CookieModal/>
        </div>
    )
}

export default CookieBannerSettings