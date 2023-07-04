/** @type {import('next').NextConfig} */

const csp = process.env.NODE_ENV === "development" ?
    `
        default-src 'self';
        script-src 'unsafe-eval';
        script-src-elem 'self 'unsafe-inline' 
        child-src 'self';
        img-src 'self' https://cdn.sanity.io;
        style-src 'self' https://fonts.googleapis.com 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-JV/eMXzwmHy9FObWpjEq5SnqTSFO6rb48LrneVsSOtQ=' 'sha256-9AiQz0CIsitLjOV2LyhymN1v1OCT8nEOV13n9XLu0MI=' 'sha256-tINK7v4BcAkEquGhYlT1lGdZfdLbTl56WvG0c+/mKeY=' 'sha256-/LBb8qNgLEheaszRsvEd2pjLP316ILD8R1PDaGyB3m4=';
        font-src 'self' https://fonts.gstatic.com data:;
    `
    :
    `
        default-src 'self';
        script-src 'self';
        script-src-elem 'self 'unsafe-inline' 
        child-src 'self';
        img-src 'self' https://cdn.sanity.io;
        style-src 'self' https://fonts.googleapis.com 'unsafe-hashes' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk=' 'sha256-JV/eMXzwmHy9FObWpjEq5SnqTSFO6rb48LrneVsSOtQ=' 'sha256-9AiQz0CIsitLjOV2LyhymN1v1OCT8nEOV13n9XLu0MI=' 'sha256-tINK7v4BcAkEquGhYlT1lGdZfdLbTl56WvG0c+/mKeY=' 'sha256-/LBb8qNgLEheaszRsvEd2pjLP316ILD8R1PDaGyB3m4=';
        font-src 'self' https://fonts.gstatic.com data:;
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
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
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
    productionBrowserSourceMaps: true,
}

module.exports = nextConfig


//script
//'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-lBLoJ7cSrwRy3uEF3pDHR9Ltwri0OhE/60fEB20mcOA=' 'sha256-hYduPaIs6quv+gxvD8fD8Cd315GBum34++ywE49r5p0=' 'sha256-C4BUUpTfv76uvvBr9+Lo6zTVlW0i/8Bzt4dsF0gl7ug=' 'sha256-yB8XG1kX2jCwXQ/HHFXYXICg/OQls3wGFo9X0Oopi+Q=' 'sha256-KBsIp5fU+h2g9rWNs//ZPI5ujKPP0dtS4eaRknTS7Qs=' 'sha256-TQHq3lFYoRy4g2NeA8GMOGk/2nMsnkKU7Yba91XZivU=' 'sha256-v6fyEBuk7xdEkPuN5A6Ed9KblAGQMg03z9PFJxJNAm8=' 'sha256-8PkT18HKeFuZTR2mm3/H5u/r3co6tsKo1bHCWwaooBk=' 'sha256-IW4KAh+srW2lMp+q9tAv/DK1qhX08i5ZF/tc7AAOxUo=' 'sha256-Zz3H11fnnhzSqH4rTsQlAD/+8I9OLzB/Y33e2Bzolc4=' 'sha256-o7uc18GiNI33VadiIdNU3Kj0KgCWJafGb+ez5reqxNA=' 'sha256-GIKhsLHKvd36jpxhiyVqOwTk4ixxwcFCHdc0IG027nc=' 'sha256-JQXB+1WoFOHhwuW0bZWU2GH7S3lGdGAH+QsMWxn7IRQ=' 'sha256-5kwsmRDqOfJNm2d7hX5qJjoun+Unuj/oKiuYcV3inJE=' 'sha256-lSoButsUhb0qcvlvqZwCSovj0hdSlaiYqfR2iTmQ8IA=' 'sha256-8VBtofNXXA6UlWFo1sdvh8Y0HeJlcmBNFIKOX/MMU5I=' 'sha256-NYZ5h2mGqoYszdafyu+ggIbrIGsKMR9tycst9g8QHp4=' 'sha256-rYROccgK85MOlpVOH6irqv5roFKu/3oyWUQVkMJpm50=' 'sha256-sW3dgzdvghxQT54fPjMZ8/YxsmScxeKCwgkNY19oUGw=' 'sha256-IrnEBE7SLlepIRb1CuDbtYeGffvy5xGIhPNvRa/yDik=' 'sha256-QIohF9pz2mU6aKc17jH487SNgu44inFSQuJKs97ayV8=' 'sha256-K0v2ATvFGGBVxi42siUpIeGvq2X9WD4uVzmUH4Vkvew=' 'sha256-gJp1RZsHsX/J1KjsAXs/jroSRCIniJLVTnaeTcwfoRY=' 'sha256-oxFCxCScy4WJv8yHFNU4EIgwvBD08LKxQvLHmzWUZU0=' 'sha256-pYcUzGot8x/cEvp521Usy8xa1ag6q/ou+yhThkqoz2k=' 'sha256-smAENzUCTluTpAcb152yrvdLWwAp3bNmWvNELxCM4do=' 'sha256-NHe7WZId9S1gZ5hGd9qquGnCv3HZMYOt8KCTOXJZWZU=';
//src-element
//'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-lBLoJ7cSrwRy3uEF3pDHR9Ltwri0OhE/60fEB20mcOA=' 'sha256-hYduPaIs6quv+gxvD8fD8Cd315GBum34++ywE49r5p0=' 'sha256-C4BUUpTfv76uvvBr9+Lo6zTVlW0i/8Bzt4dsF0gl7ug=' 'sha256-yB8XG1kX2jCwXQ/HHFXYXICg/OQls3wGFo9X0Oopi+Q=' 'sha256-SKHX2gKTSCHe+AeKKj/hiJew8ngE84vw8N1w+JYSlts=' 'sha256-TQHq3lFYoRy4g2NeA8GMOGk/2nMsnkKU7Yba91XZivU=' 'sha256-v6fyEBuk7xdEkPuN5A6Ed9KblAGQMg03z9PFJxJNAm8=' 'sha256-8PkT18HKeFuZTR2mm3/H5u/r3co6tsKo1bHCWwaooBk=' 'sha256-IW4KAh+srW2lMp+q9tAv/DK1qhX08i5ZF/tc7AAOxUo=' 'sha256-S6Y5v9ueB4Sy9cRcAVzM0ksq/14mEbtHQqS/3xayY1M=' 'sha256-o7uc18GiNI33VadiIdNU3Kj0KgCWJafGb+ez5reqxNA=' 'sha256-SvKxVPUWIXiPL2W4AiFVnmzoX4n9Wdd0n1foyMJaKeo=' 'sha256-JQXB+1WoFOHhwuW0bZWU2GH7S3lGdGAH+QsMWxn7IRQ=' 'sha256-JCHfU5WFAFFivOP6ttmdxgglV/4UgSj31wYX1ttOJBw=' 'sha256-lSoButsUhb0qcvlvqZwCSovj0hdSlaiYqfR2iTmQ8IA=' 'sha256-dLh8QP99+lHHI5mW2M5VSfcLnEhl6WngHUD1Otixd5o=' 'sha256-NYZ5h2mGqoYszdafyu+ggIbrIGsKMR9tycst9g8QHp4=' 'sha256-Di/sCgzvyI+WTHlr34SwzPGcUAq509WiN9Ihk9gp5Rg=' 'sha256-4053e1LCfqwVeDhQhcm/8IvU07OaBK4y+tnMUyeqUdg=' 'sha256-/g6MKZknsTGgppnt41AdWmN5OnihtdVmzFppg95oX+c=' 'sha256-lKC8l/GY0OA+dYosXE7pztQOb2fHoq7dUhYN9ywVO3s=' 'sha256-TqpkceSvJCcBBlGSqyO9Mn7nA76xNptRCmnydTdbCCI=' 'sha256-cWaI4qUohOHrXfM4JeLAhduutL3fgVvrskl8/89CIoM=' 'sha256-NtHPWzo8rqqziL9IULrdaUYC8nnvVeBdvp1HUw8IiFk=' 'sha256-1lpMcOouVbJG2069fcTS6qrITg3y0ujY+UkULOKaNQI=' 'sha256-hzMXvhrr6Eoqt0K/lcgrx6pUqF5m0opChxRUw6BrPMA=' 'sha256-7yi1L+ikWdD1Q9qusNTB1ft1u622hS18YkA9mrX2jTw=' 'sha256-pxvJY2efco5vuKAe7xdUXZ+IZt0SvyrsokS9Rh7UKd8=' 'sha256-aEFqz8XsYYXWdi0LPWeYeBR2S080ZPbqbW5uAB5PDIM=' 'sha256-/BjsEit557maYZaViJgXird+7RykvfRvL4Ubdi81UVU=' 'sha256-vsVB++k8GhmB1kNiDe23EDmKdMGFtiKJTHFRGdvcFhA=' 'sha256-/tcZRSn5ggA4nC6LT59FbOdgTL8Pyk3ovjq7pXgT77A=' 'sha256-7iRZiK5lt2syMMeupbmihoXlv+DA2UpcSb58/JubCv8=' 'sha256-8ybdYkOOwk1OEUlZ8/QdRpK3+eYvSSZo0eDWhoeHiws=' 'sha256-K0v2ATvFGGBVxi42siUpIeGvq2X9WD4uVzmUH4Vkvew=' 'sha256-6V0tdabtxen6NUAR9f0TpOZBev4p5sMNNdTjUxRAV9o=' 'sha256-AxDWoNbXkPtPZZVlOE5MTznedDnKHc1E8XqQNagenag=' 'sha256-G60ixcl2N5awiHfxBesyMcjFjyYdJSV6XmhYu0gdAPE=' 'sha256-ADw7VehL/ejAHJZSB5aef1OPOKjij2NHecqWrGT8xGM=' 'sha256-lnRGiNywtaVhTE8zKtd6yOcd9o4fZ2BPFSd0orZRS9w=' 'sha256-G3DUm3FtacQ5WD6evDklZYgqGBSXjI7bwJZU3hq9xvw=' 'sha256-8C8o+6lALkXTMd0+gLk/pV6r0MinoGVyNQ8eOMUXzwE=' 'sha256-Ry5zN1SW5+hRFB7aH7SF67aaM1+YOLfh6kuRoSEMNOc=' 'sha256-K0ndoEtKSWmKhLXmWTkGU6EpUs//4Rpi7Tq10VxyAks=' 'sha256-ASrRl7dl5MUBfeViZT2fUOgmhnlMBvpRB1uRw4QmVxQ=' 'sha256-pYcUzGot8x/cEvp521Usy8xa1ag6q/ou+yhThkqoz2k=' 'sha256-smAENzUCTluTpAcb152yrvdLWwAp3bNmWvNELxCM4do=' 'sha256-AIVSoRwUDQJmIJeW5lVgdto8nKgizdBmiXJ8Ark/sdA=' 'sha256-8gajys97AwW3MllQUX96r/oLuB3yLZdVDo/7W0dJF/8=' 'sha256-DE3/8kf4DFS3wuqaWqcla3QWNQPzvCBc6i9X/nwB/Vg=' 'sha256-mOdPEQi7VnUyM48VwuBNTpaUflA52YPU6TF+aNn+ccs=' 'sha256-MYfURAFEF/RHqmrsTRgamUjtbWCXTWlIPfclsjw+X7A=' 'sha256-WnG0MGXW/CEspvL+kwb6gQm5LfvJc5aU/IncQ2XJyts=' 'sha256-VYBGIw3idsNGusJPOTrMw44K8Kc8mBiCWZyOK7rdOis=' 'sha256-hp5nXn1PwWcJyAYG0Lk7AMAAXCJBHX67aylpn/cbHLg=' 'sha256-CaekzdWPVirUlfdNEJ2qxeFmHlnRDTfXQwYdluZXZaU=' 'sha256-oj91W5Y53vV5x6F+NLEqTu15y05nSKcpI33xWlywG8I=' 'sha256-NHe7WZId9S1gZ5hGd9qquGnCv3HZMYOt8KCTOXJZWZU=' 'sha256-3aOsqQe1J/beG2Za7oY2axssq5JpOkKgWrSAt+bW7EY=' 'sha256-TlvWGUDqRCL3IjV3P3z30icJ8hGNS0YrF/YEkJGnz4c=' 'sha256-WSFNM6ZmQQfnmSOC8WMfKnNZmRUP3eZOGJIp5HIXm9w=' 'sha256-TWZ5WU3aOS7AIW6wHnWP1uPKuJnWAlZL3gix7IabJAo=' 'sha256-vSOxOncJW3PI53bJ4fkoMzz1BSiIQpFPSpuOJFgopfA=' 'sha256-w3RRfuOXZxbi9EalyD7mpV0UErPRAeTfzxU7is7nk0E=' 'sha256-JBg4xbuB0IRLTxRI/aRU4estl2pyFsmB74ff781cgVw=' 'sha256-/7RdQc8oievYzE0+LwDLDNelirp2VZN90CrcPL3U9iI=' 'sha256-QkfOJJevBBPI89tOtdQEsOHvkteYE7R0CJxwiZaFQw0=' 'sha256-/VAYZesKKVhV49Doh60fouioc8n4hWD++Q+/XNg4jUk=' 'sha256-Wip/MTTooYlHFq4uRnlSuoTiwSWjF2pwgs3w0w2kNpo=' 'sha256-lP9B+EBIArx5iq5tLjGfOaiQcutmsWocuondpRpNWQ4=' 'sha256-aGLGWx92eGS2eSplWiizr/pvCJL/W9YAYRyc8pYw4nU=' 'sha256-VaDfo2Q5PAsJJruE+5R4itiGjRNTjOOFYrl2wFNeZYk=' 'sha256-+DUlFXlsw5jGtTBSq23qqiR0zB7vpWRgBDBPV9X6g1M=' 'sha256-+TSv5uuPHJkOHSD8taKCTsatXVGQ0aPL9V+STk2f3Nw=' 'sha256-0vXozOM4cWRrE2O/m6xyVZYKe3UIiqudpTH+0LrrdDw=' 'sha256-ixlUAc7bHMbPY9hjFtqdawzSMcmdVeNFyPvGGdAq4/A=' 'sha256-11Jxhb3/Jd8OECaYpqCQpbrVoXWpI5ecFqAOsofMFD0=' 'sha256-iwSXz2YdAL+ORLO1ja+CYEYhBXBnc8GJQmW3r40wCHQ=' 'sha256-2lKYyEsU3ekP5Cr7jb0e/biwFnkHj24EkWS7PzMjTQM=' 'sha256-qQGEaFXEsdz2yuLlggxo4F2PN7GZ6nRoT0a8Hp7/n+w=' 'sha256-MOJDv5pQB2CwEsPHt/tysvGwLi62bgdafFINz2L0NFQ=' 'sha256-YWv/YGLXgg0ZSsJtZXS6Qa8Ckc1Ij5t5CZQh/kRrBFg=' 'sha256-3pEDec+F9sqR+5aTGp/8OkHgZ+uzbltZgPNbqyKH94Y=' 'sha256-cj/fNgC5EKPEL9ZBL5Ss9IdhdUeZliVrG+YMC3nCNyk=' 'sha256-u2krWnUqzy6HHmeAin0KZjGzD3+GDrCxB2DPs7ifh0w=' 'sha256-E+dMuuWYvcfPtrD4pbWMSj6vx+ZjM2jP3AH6mQbPrEI=';
