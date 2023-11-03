/** @type {import('next').NextConfig} */

const csp = `
    base-uri 'self';
    child-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    img-src 'self' https://cdn.sanity.io data:;
    style-src 'self' fonts.googleapis.com https: 'unsafe-inline' data:;
    style-src-elem 'self' fonts.googleapis.com data: 'unsafe-inline';
    style-src-attr 'self' 'unsafe-inline' data:;
    font-src 'self' fonts.gstatic.com data: https: data:;
    frame-src 'self' https://cdn.sanity.io;
    frame-ancestors 'self';
`

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/images/94y9p2mz/production/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*?)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: csp.replace(/\s{2,}/g, ' ').trim()
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: "camera=(), microphone=(), geolocation=(), fullscreen=(self)",
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    }
                ]
            },
        ]
    },
}

module.exports = nextConfig
