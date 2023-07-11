import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import type { NextRequest } from 'next/server'
import Negotiator from 'negotiator'

const locales = ['en', 'de']

// Get the preferred locale
function getLocale() {
    let headers = { 'accept-language': 'de,en;q=0.5' }
    let languages = new Negotiator({ headers }).languages()
    let defaultLocale = 'de'

    return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        //get language preference from cookie
        const cookie = request.cookies.get("lang")
        if (cookie) {
            return NextResponse.redirect(
                new URL(`/${cookie.value}${pathname}`, request.url)
            )
        }
        const locale = getLocale()

        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        )
    }

//     const nonce = crypto.randomUUID();

//     const csp = `
//     default-src 'self' 'nonce-${nonce}' data: http:;
//     base-uri 'self';
//     block-all-mixed-content;
//     script-src ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "'self'"} 'nonce-${nonce}' fonts.googleapis.com http:;
//     script-src-elem 'self' fonts.googleapis.com 'nonce-${nonce}' https: 'unsafe-hashes' 'sha256-Vpf3jj2ZOAYugET/fOz+UJZIWIhnTDizO95sqKRIX6M=' 'sha256-28MXxCgNj94RIzBIpc3eREOz+iuMPHIaG4ViARoIkKw=' 'sha256-NMXocyAya4wpbaq/B9rxUb92MxWyPbPxdImw/zdMeUo=' 'sha256-WhBmAQBcLnZn36FG0+O+FAyRIJZGeSvP9ZCL0JndlDQ=' 'sha256-OIIoAp9uxb4dQugVmkNgS8nu1plGGubtFkNLe9XEP+c=' 'sha256-VQurI5W7SgqrYJ/Knvlhb3Es9wt32Oc/uExNxZYY/5U=' 'sha256-su9M8ln+f4pk08tmNxZR0YaEQQ4sXgN9YkLgxh6LPpI=' 'sha256-zPI06qkbp8a+revFO1IviE9otSC1a+95YxaDetl2Dio=' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-lBLoJ7cSrwRy3uEF3pDHR9Ltwri0OhE/60fEB20mcOA=' 'sha256-hYduPaIs6quv+gxvD8fD8Cd315GBum34++ywE49r5p0=' 'sha256-oxLVMraq9tY2RFwz+NprM3K5QfSQJmeCzdO8oFtVBLs=' 'sha256-rerFExoWyXT/P4gZEh1hz74dpwWEMuG5tkjymPLxQV8=' 'sha256-sYXTWuDyOsjnR3pVYF20/ZBDLrvfpQeLCikBnOSG488=' 'sha256-TQHq3lFYoRy4g2NeA8GMOGk/2nMsnkKU7Yba91XZivU=' 'sha256-v6fyEBuk7xdEkPuN5A6Ed9KblAGQMg03z9PFJxJNAm8=' 'sha256-8PkT18HKeFuZTR2mm3/H5u/r3co6tsKo1bHCWwaooBk=' 'sha256-IW4KAh+srW2lMp+q9tAv/DK1qhX08i5ZF/tc7AAOxUo=' 'sha256-bGhsnGLhtVmyPSa1m9dzTh94eQQ4uCTYhuxhfgT5CdU=';
//     script-src-attr 'self' 'nonce-${nonce}' http:;
//     child-src 'self' 'nonce-${nonce}' http:;
//     img-src 'self' https://cdn.sanity.io 'nonce-${nonce}' http: data:;
//     style-src 'self' fonts.googleapis.com 'nonce-${nonce}' http: https: 'unsafe-inline';
//     style-src-elem 'self' 'nonce-${nonce}' fonts.googleapis.com data:;
//     style-src-attr 'self' http: 'unsafe-inline';
//     font-src 'self' fonts.gstatic.com data: 'nonce-${nonce}' http: https: http: data:;
//     frame-ancestors 'self';
//     upgrade-insecure-requests;
// `

//     // Clone the request headers
//     const requestHeaders = new Headers(request.headers);

//     // Set the CSP header so that Next.js can read it and generate tags with the nonce
//     requestHeaders.set('content-security-policy', csp.replace(/\s{2,}/g, ' ').trim());
//     requestHeaders.set('x-nonce', nonce);

//     // Create new response
//     const response = NextResponse.next({
//         request: {
//             // New request headers
//             headers: requestHeaders
//         }
//     });

//     // Also set the CSP header in the response so that it is outputted to the browser
//     response.headers.set('content-security-policy', csp.replace(/\s{2,}/g, ' ').trim());
//     response.headers.set('x-nonce', nonce);

//     return response;
}


export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/',
        // "/de/dashboard"
    ],
}


