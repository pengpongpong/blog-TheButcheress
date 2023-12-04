"use client"
import React, { ReactElement, Ref, forwardRef, useEffect, useRef } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import { ThemeProvider, createTheme, Slide, DialogContent, DialogActions, Dialog } from "@mui/material";

import { setAdvertiseConsent, setAnalyticsConsent, setFunctionalConsent, setOpen, setShowBanner, useConsentStore } from "../utils/store";
import { denyConsent, } from "./CookieBanner";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { setLocalStorage } from "../utils/utils";
import { Locale } from "@/app/[lang]/HomePage";

// styles for dialog modal
const theme = createTheme({
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: "1rem 0",
                    borderRadius: "0.5rem",
                    fontFamily: "Josefin Slab",
                    backgroundColor: "#FBF7F0",
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    width: "100%",
                    margin: "2rem 1rem 0 0",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-end",
                    gap: "1rem",
                },
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    width: "auto",
                    backgroundColor: "#1FB2A5 !important",
                    fontFamily: "Josefin Slab !important",
                    color: "black !important",
                    fontWeight: "bold !important",
                    '@media (max-width: 600px)': {
                        width: "100%",
                        padding: ".6rem 0"
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    margin: "1rem",
                    '@media (max-width: 600px)': {
                        margin: "0 1rem",
                        paddingBottom: "0"
                    }
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(3px)"
                }
            }
        }
    }
})


// transition for dialog
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CookieModal({ lang }: { lang: Locale }) {
    const open = useConsentStore(state => state.open) // open state for dialog modal
    const cookieFunctionalState = useConsentStore(state => state.functionalConsent)
    const cookieAnalyticsState = useConsentStore(state => state.analyticsConsent)
    const cookieAdvertiseState = useConsentStore(state => state.advertiseConsent)

    // refs for getting values
    const inputFunctionalRef = useRef<HTMLInputElement>(null)
    const inputAnalyticsRef = useRef<HTMLInputElement>(null)
    const inputAdvertiseRef = useRef<HTMLInputElement>(null)

    // get cookies data
    const cookieFunctional = getCookie("cookie-functional")
    const cookieAnalytics = getCookie("cookie-analytics")
    const cookieAdvertise = getCookie("cookie-advertise")

    // const cookieConsent = getLocalStorage("consent")

    // if cookies detected then set state in consent-store and set input checked value to state
    useEffect(() => {
        if (cookieFunctional) setFunctionalConsent(true)
        if (cookieAnalytics) setAnalyticsConsent(true)
        if (cookieAdvertise) setAdvertiseConsent(true)
        if (inputFunctionalRef.current && inputAnalyticsRef.current && inputAdvertiseRef.current) {
            inputFunctionalRef.current.checked = cookieFunctionalState
            inputAnalyticsRef.current.checked = cookieAnalyticsState
            inputAdvertiseRef.current.checked = cookieAdvertiseState
        }
    }, [cookieFunctionalState, cookieAnalyticsState, cookieAdvertiseState, cookieFunctional, cookieAnalytics, cookieAdvertise])

    // accept all consent
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

    // close modal
    const handleClose = () => {
        setOpen(false);
    };

    // accept user setting consent
    const acceptAdvancedConsent = () => {
        const functionalConsent = inputFunctionalRef?.current?.checked
        const analyticsConsent = inputAnalyticsRef?.current?.checked
        const advertiseConsent = inputAdvertiseRef?.current?.checked

        // setCookie("cookie-preference", "true")
        setLocalStorage("consent", "partial")

        if (functionalConsent === true) {
            setCookie("cookie-functional", "true")
            setFunctionalConsent(true)
        } else {
            if (cookieFunctional) {
                deleteCookie("cookie-functional")
                deleteCookie("lang")
            }
            setFunctionalConsent(false)
        }

        if (analyticsConsent === true) {
            setCookie("cookie-analytics", "true")
            setAnalyticsConsent(true)
        } else {
            if (cookieAnalytics) deleteCookie("cookie-analytics");
            setAnalyticsConsent(false)
        }

        if (advertiseConsent === true) {
            setCookie("cookie-advertise", "true")
            setAnalyticsConsent(true)
        } else {
            if (cookieAdvertise) deleteCookie("cookie-advertise");
            setAdvertiseConsent(false)
        }

        // close dialog & banner
        if (open) setOpen(false);
        setShowBanner(false)
    }

    const cookieText = lang === "en"
        ? {
            requiredHead: "Required cookies",
            requiredText: "Required cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
            functionalHead: "Functional cookies",
            functionalText: "Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language.",
            analyticsHead: "Analytics cookies",
            analyticsText: "Analytics cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.",
            advertiseHead: "Advertising cookies",
            advertiseText: "Our website only uses an advertising cookie for Google Analytics. This cookie helps us analyze user interactions with ads and measure the effectiveness of our advertising campaigns. No personal data is collected or passed on.",
        }
        : {
            requiredHead: "Erforderliche Cookies",
            requiredText: "Erforderliche Cookies helfen dabei, eine Website nutzbar zu machen, indem sie grundlegende Funktionen wie die Seitennavigation und den Zugang zu sicheren Bereichen der Website ermöglichen. Ohne diese Cookies kann die Website nicht richtig funktionieren.",
            functionalHead: "Funktionale Cookies",
            functionalText: "Mit Hilfe von Präferenz-Cookies kann eine Website Informationen speichern, die das Verhalten oder das Aussehen der Website verändern, z. B. Ihre bevorzugte Sprache.",
            analyticsHead: "Analyse Cookies",
            analyticsText: "Analytics-Cookies helfen Website-Betreibern zu verstehen, wie Besucher mit Websites interagieren, indem sie Informationen anonym sammeln und melden.",
            advertiseHead: "Werbe Cookies",
            advertiseText: "Unsere Website verwendet nur ein Werbe-Cookie für Google Analytics. Dieses Cookie hilft uns, die Interaktionen der Nutzer mit Anzeigen zu analysieren und die Wirksamkeit unserer Werbekampagnen zu messen. Es werden keine persönlichen Daten gesammelt oder weitergegeben.",

        }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="cookie-preference-setting"
                > 
                    <h1 className="my-4 text-center text-4xl font-bold tracking-widest" id="cookie-preference-setting">{lang === "en" ? "Cookie Preference" : "Cookie Einstellung"}</h1>
                    <DialogContent>
                        <form>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">{cookieText.requiredHead}</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" checked disabled />
                                </label>
                                <p className="w-4/5 ml-1">{cookieText.requiredText}</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">{cookieText.functionalHead}</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" defaultChecked={Boolean(cookieFunctional) ?? false} ref={inputFunctionalRef} />
                                </label>
                                <p className="w-4/5 ml-1">{cookieText.functionalText}</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">{cookieText.analyticsHead}</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" defaultChecked={Boolean(cookieAnalytics) ?? false} ref={inputAnalyticsRef} />
                                </label>
                                <p className="w-4/5 ml-1">{cookieText.analyticsText}</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">{cookieText.advertiseHead}</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" defaultChecked={Boolean(cookieAdvertise) ?? false} ref={inputAdvertiseRef} />
                                </label>
                                <p className="w-4/5 ml-1">{cookieText.advertiseText}</p>
                            </fieldset>
                        </form>
                    </DialogContent>
                    <DialogActions disableSpacing>
                        <button className="mb-4 hover:underline" onClick={denyConsent}>{lang === "en" ? "Deny" : "Ablehnen"}</button>
                        <button className="mb-4 hover:underline" onClick={acceptAdvancedConsent}>{lang === "en" ? "Save Settings" : "Speicher Einstellungen"}</button>
                        <button className="mb-4 btn btn-sm btn-accent box-shadow" onClick={acceptConsent}>{lang === "en" ? "Accept" : "Akzeptieren"}</button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>

    );
}