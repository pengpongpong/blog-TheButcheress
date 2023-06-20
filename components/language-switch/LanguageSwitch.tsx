"use client"
import React, { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next';
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useConsentStore } from "../utils/store";

const LanguageSwitch = () => {
    const langCookie = getCookie("lang")
    const pathname = usePathname()
    const params = useParams()
    const [preference, setPreference] = useState<string>("false")

    useEffect(() => {
        const data = localStorage.getItem("cookie-preference")
        setPreference(data!)
    }, [])

    const consent = useConsentStore((state) => state.consent)

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

    //set cookie for language preference for 1 year
    const setLang = () => {
        if (preference === "true" || consent) {
            if (langCookie === "en" || !langCookie && params.lang === "en") {
                setCookie("lang", "de", { maxAge: 60 * 60 * 24 * 365 })
            } else {
                setCookie("lang", "en", { maxAge: 60 * 60 * 24 * 365 })
            }
        }
    }

    return <Link className="inline-block tracking-wide hover:underline cursor-pointer font-text" href={getUrl()} onClick={setLang}>DE/EN</Link>
}

export default LanguageSwitch