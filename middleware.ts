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
}


export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
}


