import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import type { NextRequest } from 'next/server'
import Negotiator from 'negotiator'

const locales = ['en', 'de']

// Get the preferred locale
function getLocale(request: NextRequest) {
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
                new URL(`/${cookie.value}/${pathname}`, request.url)
            )
        }
        const locale = getLocale(request)

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }
}

// export function middleware(request: NextRequest) {
//     const nonce = crypto.randomUUID();
//     const csp = `script-src 'nonce-${nonce}';`;

//     // Clone the request headers
//     const requestHeaders = new Headers(request.headers);

//     // Set the CSP header so that Next.js can read it and generate tags with the nonce
//     requestHeaders.set('content-security-policy', csp);
//     requestHeaders.set('x-nonce', nonce);

//     // Create new response
//     const response = NextResponse.next({
//         request: {
//             // New request headers
//             headers: requestHeaders
//         }
//     });

//     // Also set the CSP header in the response so that it is outputted to the browser
//     response.headers.set('content-security-policy', csp);

//     return response;
// }

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/',
        // "/de/dashboard"
    ],
}


