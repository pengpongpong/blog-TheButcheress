"use client"
import React from 'react'
import { getCookie, setCookie } from 'cookies-next';
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useConsentStore } from "../utils/store";

const LanguageSwitch = () => {
    const langCookie = getCookie("lang")
    const functionalCookie = getCookie("cookie-functional")
    const functionalConsent = useConsentStore(state => state.functionalConsent)
    const pathname = usePathname()
    const params = useParams()

    //get updated url for other language de/en
    const getUrl = (): string => {
        if (params.lang === "en") {
            if (pathname === "/en") {
                return "/de"
            } else {
                const regex = new RegExp(`${params.lang}`)
                return pathname.replace(regex, "de")
            }
        } else {
            if (pathname === "/de") {
                return "/en"
            } else {
                const regex = new RegExp(`${params.lang}`)
                return pathname.replace(regex, "en")
            }
        }
    }

    //set cookie for language preference for 1 year if cookie consent
    const setLang = () => {
        if (functionalCookie === true || functionalConsent === true) {
            if (langCookie === "en" || !langCookie && params.lang === "en") {
                setCookie("lang", "de", { maxAge: 60 * 60 * 24 * 365 })
            } else {
                setCookie("lang", "en", { maxAge: 60 * 60 * 24 * 365 })
            }
        }
    }

    return <Link className="inline-block tracking-wide hover:underline cursor-pointer font-text" href={getUrl()} onClick={setLang} prefetch>DE/EN</Link>
}

export default LanguageSwitch