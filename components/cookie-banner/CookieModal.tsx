"use client"
import React, { ReactElement, Ref, forwardRef, useEffect, useRef } from 'react';
import Image from "next/image";

import { TransitionProps } from '@mui/material/transitions';
import { Button, ThemeProvider, createTheme, Slide, DialogContent, DialogActions, Dialog } from "@mui/material";

import { useConsentStore } from "../utils/store";
import { denyConsent, setAnalyticsConsent, setFunctionalConsent, setOpen, setShowBanner } from "./CookieBanner";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import cookieIcon from "/public/icons/bx-cookie.svg"
import closeIcon from "/public/icons/bx-x-circle.svg"

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
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: "1rem",
                    '@media (max-width: 600px)': {
                        width: "auto",
                        margin: "1rem",
                        padding: 0,
                        flexDirection: "column-reverse",
                        alignItems: "center",
                    }
                },
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    width: "auto",
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

// cookie icon for MUI buttons
const CookieImage = () => (<Image src={cookieIcon} alt="" />)

export default function CookieModal() {
    const open = useConsentStore(state => state.open) // open state for dialog modal
    const cookieFunctionalState = useConsentStore(state => state.functionalConsent)
    const cookieAnalyticsState = useConsentStore(state => state.analyticsConsent)

    // refs for getting values
    const inputFunctionalRef = useRef<HTMLInputElement>(null)
    const inputAnalyticsRef = useRef<HTMLInputElement>(null)

    // get cookies data
    const cookieFunctional = getCookie("cookie-functional")
    const cookieAnalytics = getCookie("cookie-analytics")
    const cookiePreference = getCookie("cookie-preference")

    // if cookies detected then set state in consent-store and set input checked value to state
    useEffect(() => {
        if (cookieFunctional) setFunctionalConsent(true)
        if (cookieAnalytics) setAnalyticsConsent(true)
        if (inputFunctionalRef.current && inputAnalyticsRef.current) {
            inputFunctionalRef.current.checked = cookieFunctionalState
            inputAnalyticsRef.current.checked = cookieAnalyticsState
        }
    }, [cookieFunctionalState, cookieAnalyticsState, cookieFunctional, cookieAnalytics, cookiePreference])

    // accept all consent
    const acceptConsent = () => {
        setCookie("cookie-preference", "true")
        setCookie("cookie-functional", "true")
        setCookie("cookie-analytics", "true")
        setFunctionalConsent(true)
        setAnalyticsConsent(true)

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

        setCookie("cookie-preference", "true")

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

        // close dialog & banner
        if (open) setOpen(false);
        setShowBanner(false)
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
                    <button onClick={handleClose} className="absolute top-4 right-4 lg:hidden">
                        <Image src={closeIcon} width={35} height={35} alt="" />
                    </button>
                    <h1 className="my-4 text-center text-4xl font-bold tracking-widest" id="cookie-preference-setting">Preference</h1>
                    <DialogContent>
                        <form>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">Required cookies</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" checked disabled />
                                </label>
                                <p className="w-4/5 ml-1">Required cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">Functional cookies</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" defaultChecked={!cookiePreference ? true : Boolean(cookieFunctional)} ref={inputFunctionalRef} />
                                </label>
                                <p className="w-4/5 ml-1">Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language.</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">Analytics cookies cookies</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" defaultChecked={Boolean(cookieAnalytics) ?? false} ref={inputAnalyticsRef} />
                                </label>
                                <p className="w-4/5 ml-1">Analytics cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.</p>
                            </fieldset>
                        </form>
                    </DialogContent>
                    <DialogActions disableSpacing>
                        <Button variant="contained" className="bg-secondary text-neutral" endIcon={<CookieImage />} onClick={denyConsent}>Deny All</Button>
                        <Button variant="contained" className="bg-secondary text-neutral" endIcon={<CookieImage />} onClick={acceptAdvancedConsent}>Save Settings</Button>
                        <Button variant="contained" className="bg-accent text-neutral" endIcon={<CookieImage />} onClick={acceptConsent}>Accept All</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>

    );
}