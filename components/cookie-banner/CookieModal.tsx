import React, { ReactElement, Ref, forwardRef, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ThemeProvider, createTheme } from "@mui/material";
import { useConsentStore } from "../utils/store";
import { acceptConsent, denyConsent, setAnalyticsConsent, setFunctionalConsent, setOpen, setShowBanner } from "./CookieBanner";
import { setCookie } from "cookies-next";

// styles for dialog modal
const theme = createTheme({
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: "1rem 0",
                    borderRadius: "0.5rem",
                    fontFamily: "Josefin Slab",
                    backgroundColor: "#FBF7F0"
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    margin: "2rem 1rem 0 0"
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

export default function CookieModal() {
    const cookieFunctionalRef = useRef<HTMLInputElement>(null)
    const cookieAnalyticsRef = useRef<HTMLInputElement>(null)
    const open = useConsentStore(state => state.open)

    // close modal & accept advanced setting
    const handleClose = () => {
        setOpen(false);
    };

    // accept user setting consent
    const acceptAdvancedConsent = () => {
        const functionalConsent = cookieFunctionalRef?.current?.checked
        const analyticsConsent = cookieAnalyticsRef?.current?.checked

        setCookie("cookie-preference", "true")
        
        // !change to delete cookie!
        if (functionalConsent === true) {
            setCookie("cookie-functional", "true")
            setFunctionalConsent(true)
        } else {
            setCookie("cookie-functional", "false")
            setFunctionalConsent(false)
        }

        if (analyticsConsent === true) {
            setCookie("cookie-analytics", "true")
            setAnalyticsConsent(true)
        } else {
            setCookie("cookie-analytics", "false")
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
                                    <input type="checkbox" className="checkbox checkbox-accent" ref={cookieFunctionalRef} />
                                </label>
                                <p className="w-4/5 ml-1">Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language.</p>
                            </fieldset>
                            <fieldset>
                                <label className="cursor-pointer label mb-2 mt-4 font-bold">
                                    <span className="label-text text-xl">Analytics cookies cookies</span>
                                    <input type="checkbox" className="checkbox checkbox-accent" ref={cookieAnalyticsRef} />
                                </label>
                                <p className="w-4/5 ml-1">Analytics cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.</p>
                            </fieldset>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-sm btn-secondary" onClick={denyConsent}>Deny all</button>
                        <button className="btn btn-sm btn-secondary" onClick={acceptAdvancedConsent}>Save user setting</button>
                        <button className="btn btn-sm btn-accent" onClick={acceptConsent}>Accept</button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>

    );
}