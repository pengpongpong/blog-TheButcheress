"use client"
import { Locale } from "@/app/[lang]/HomePage"
import Link from "next/link"
import React, { useEffect } from 'react';
import Image from "next/image"
import CookieIcon from "/public/icons/bx-cookie.svg"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { useConsentStore } from "../utils/store";
import CookieModal from "./CookieModal";

// set analytics consent state
export const setAnalyticsConsent = (bool: boolean) => {
    useConsentStore.getState().setAnalyticsConsent(bool)
}

// set functional consent state
export const setFunctionalConsent = (bool: boolean) => {
    useConsentStore.getState().setFunctionalConsent(bool)
}

// open cookie banner dialog
export const setOpen = (bool: boolean) => {
    useConsentStore.getState().setOpen(bool)
}

// show/hide cookie banner
export const setShowBanner = (bool: boolean) => {
    useConsentStore.getState().setShowBanner(bool)
}

// open cookie modal preference setting
export const handleCookieModal = () => {
    setOpen(true);
};

// accept consent
const acceptConsent = () => {
    setCookie("cookie-preference", "true")
    setCookie("cookie-functional", "true")
    setCookie("cookie-analytics", "true")
    setFunctionalConsent(true)
    setAnalyticsConsent(true)

    setOpen(false);
    setShowBanner(false)
}

// deny consent
export const denyConsent = () => {
    setCookie("cookie-preference", "true")
    deleteCookie("cookie-functional")
    deleteCookie("cookie-analytics");
    deleteCookie("lang")

    setAnalyticsConsent(false)
    setFunctionalConsent(false)

    setOpen(false);
    setShowBanner(false)
}

const CookieBanner = ({ lang }: { lang: Locale }) => {
    const showBanner = useConsentStore(state => state.showBanner)

    // show cookie banner if no consent cookie
    useEffect(() => {
        const data = getCookie("cookie-preference")

        if (data === true) return setShowBanner(false)

        setShowBanner(true)
    }, [])

    return (
        <>
            {showBanner ? <div className={`flex alert bg-primary fixed bottom-0 left-0 right-0 font-text`}>
                <Link className="hover:underline" href={lang === "en" ? "/en/datenschutz" : "/de/datenschutz"} title={`${lang === "en" ? "Go to privacy policy" : "Gehe zu Datenschutz"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{lang === "en" ? "Privacy policy" : "Datenschutz"}</span>
                </Link>
                <span>
                    <Image src={CookieIcon} alt="" />
                    we use cookies for no reason.
                </span>
                <div>
                    <button className="btn btn-sm btn-secondary" onClick={denyConsent}>Deny</button>
                    <button className="btn btn-sm btn-secondary" onClick={handleCookieModal}>Preference</button>
                    <button className="btn btn-sm btn-accent" onClick={acceptConsent}>Accept</button>
                    <CookieModal />
                </div>
            </div > : ""
            }
        </>
    )
}

export default CookieBanner