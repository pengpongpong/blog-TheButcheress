import React, { useEffect } from 'react'
import { getCookie, setCookie } from 'cookies-next';
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const LanguageSwitch = () => {
    const langCookie = getCookie("lang")
    const pathname = usePathname()
    const params = useParams()
    const router = useRouter()

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

    //check if url locale === language set by cookie
    useEffect(() => {
        if ((langCookie === "en" && params.lang !== "en") || (langCookie === "de" && params.lang !== "de")) {
            router.push(getUrl())
        }
    }, [])

    //set cookie for language preference for 1 year
    const setLang = () => {
        if (langCookie === "en") {
            setCookie("lang", "de", { maxAge: 60 * 60 * 24 * 365 })
            // pushNav()
        } else {
            setCookie("lang", "en", { maxAge: 60 * 60 * 24 * 365 })
            // pushNav()
        }
    }

    return <Link className="inline-block tracking-wide hover:underline cursor-pointer font-text" href={getUrl()} onClick={setLang}>DE/EN</Link>
}

export default LanguageSwitch