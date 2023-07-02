/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' unpkg.com/@tinybirdco/;
    child-src localhost:3000;
    style-src 'self' fonts.googleapis.com;
    font-src fonts.gstatic.com;
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
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*?)',
    //             headers: [
    //                 {
    //                     key: 'Content-Security-Policy',
    //                     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    //                 }
    //             ],
    //         },
    //     ]
    // },
}

module.exports = nextConfig
