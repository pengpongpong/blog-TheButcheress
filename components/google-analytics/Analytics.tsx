"use client"
import React, { useEffect } from 'react'

import { getCookie } from "cookies-next"


import { GoogleAnalytics, consent, event } from "nextjs-google-analytics"
import { useReportWebVitals } from 'next/web-vitals'
import { useConsentStore } from "../utils/store"

interface WebVitals {
    id: string;
    name: string;
    value: number;
    label: string;
}

// web vitals
export function reportWebVitals({
    id,
    name,
    label,
    value,
}: WebVitals) {
    event(
        name,
        {
            event_category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
            value: Math.round(name === "CLS" ? value * 1000 : value),
            event_label: id, // id unique to current page load
            non_interaction: true, // avoids affecting bounce rate.
        },
    );
}

const Analytics = () => {
    const analytic = useConsentStore(state => state.analyticsConsent)
    const advertisement = useConsentStore(state => state.advertiseConsent)

    // report web vitals
    useReportWebVitals((metric: WebVitals) => {
        const reportMetric = {
            id: metric.id,
            name: metric.name,
            label: metric.label,
            value: metric.value
        }

        reportWebVitals(reportMetric)
    })

    // update consent on change
    useEffect(() => {
        const analyticsCookie = getCookie("cookie-analytics")
        const advertisementCookie = getCookie("cookie-advertise")

        consent({
            arg: "update",
            params: {
                ad_storage: advertisementCookie ? "granted" : "denied",
                analytics_storage: analyticsCookie ? "granted" : "denied",
            },
        })

    }, [analytic, advertisement])


    // google analytics default consent denied
    return (<GoogleAnalytics trackPageViews defaultConsent="denied" strategy="lazyOnload"/>)
}

export default Analytics
