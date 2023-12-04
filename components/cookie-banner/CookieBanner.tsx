"use client"
import { Locale } from "@/app/[lang]/HomePage"
import Link from "next/link"
import React, { useEffect } from 'react';
import Image from "next/image"
import CookieIcon from "/public/icons/bx-cookie.svg"
import { deleteCookie, setCookie } from "cookies-next"
import { setAdvertiseConsent, setAnalyticsConsent, setFunctionalConsent, setOpen, setShowBanner, useConsentStore } from "../utils/store";
import CookieModal from "./CookieModal";
import { getLocalStorage, setLocalStorage } from "../utils/utils";


// open cookie modal preference setting
export const handleCookieModal = () => {
    setOpen(true);
};

// accept consent
const acceptConsent = () => {
    setLocalStorage("consent", "granted")

    setCookie("cookie-functional", "true")
    setCookie("cookie-analytics", "true")
    setCookie("cookie-advertise", "true")

    setFunctionalConsent(true)
    setAnalyticsConsent(true)
    setAdvertiseConsent(true)

    setOpen(false);
    setShowBanner(false)
}

// deny consent
export const denyConsent = () => {
    setLocalStorage("consent", "denied")

    deleteCookie("cookie-functional")
    deleteCookie("cookie-analytics");
    deleteCookie("cookie-advertise");
    deleteCookie("lang")

    setAnalyticsConsent(false)
    setFunctionalConsent(false)
    setAdvertiseConsent(false)

    setOpen(false);
    setShowBanner(false)
}

const CookieBanner = ({ lang }: { lang: Locale }) => {
    const showBanner = useConsentStore(state => state.showBanner)

    // show cookie banner if no consent cookie
    useEffect(() => {
        const data = getLocalStorage("consent")

        if (data) return setShowBanner(false)

        setShowBanner(true)
    }, [])

    return (
        <>
            {showBanner ? <div className="flex alert bg-primary fixed bottom-0 left-0 right-0 font-text z-50">
                <Link className="hover:underline cursor-pointer" href={lang === "en" ? "/en/datenschutz" : "/de/datenschutz"} title={`${lang === "en" ? "Go to privacy policy" : "Gehe zu Datenschutz"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{lang === "en" ? "Privacy policy" : "Datenschutz"}</span>
                </Link>
                <span>
                    <Image src={CookieIcon} alt="Cookie icon" />
                    {lang === "en"
                        ? "Cookies enhance your experience on our food blog. Enjoy our recipes and culinary adventures!"
                        : "Cookies verbessern Ihr Erlebnis in unserem Food-Blog. Genießen Sie unsere Rezepte und kulinarischen Erlebnisse!"}
                </span>
                <div className="flex gap-4">
                    <button className="hover:underline" onClick={denyConsent}>{lang === "en" ? "Deny" : "Ablehnen"}</button>
                    <button className="hover:underline" onClick={handleCookieModal}>{lang === "en" ? "Settings" : "Einstellungen"}</button>
                    <button className="btn btn-sm btn-accent box-shadow" onClick={acceptConsent}>{lang === "en" ? "Accept" : "Akzeptieren"}</button>
                    <CookieModal lang={lang}/>
                </div>
            </div > : ""
            }
        </>
    )
}

export default CookieBanner