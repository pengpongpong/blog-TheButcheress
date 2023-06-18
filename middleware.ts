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
        const locale = getLocale(request)
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}