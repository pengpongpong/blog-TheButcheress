"use client"
import { Locale } from "@/app/[lang]/HomePage"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import CookieModal from "./CookieModal"
import Image from "next/image"
import CookieIcon from "/public/icons/bx-cookie.svg"
import { useConsentStore } from "../utils/store"
import { setLocalStorage } from "./LocalStorage"

const setConsent = (current: boolean) => {
    useConsentStore.getState().setConsent(current)
}

const CookieBanner = ({ lang }: { lang: Locale }) => {
    const [store, setStore] = useState(true)
    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {
        const data = localStorage.getItem("cookie-preference")
        const result = data === "true" || data === "false"
        setStore(result)
    }, [])

    const acceptConsent = () => {
        setLocalStorage("true")
        setConsent(true)
        setShowBanner(false)
    }

    const denyConsent = () => {
        setLocalStorage("false")
        setConsent(false)
        setShowBanner(false)
    }

    return (
        <>
            {showBanner && !store ? <div className={`flex alert bg-primary fixed bottom-0 left-0 right-0 font-text`}>
                <Link href={lang === "en" ? "en/datenschutz" : "de/datenschutz"} title="Gehe zu Datenschutz">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </Link>
                <span>
                    <Image src={CookieIcon} alt="" />
                    we use cookies for no reason.
                </span>
                <div>
                    <button className="btn btn-sm btn-secondary" onClick={denyConsent}>Deny</button>
                    <CookieModal />
                    <button className="btn btn-sm btn-accent" onClick={acceptConsent}>Accept</button>
                </div>
            </div> : ""}
        </>
    )
}

export default CookieBanner