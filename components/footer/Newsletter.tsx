"use client"
import React, { FormEvent, useRef, useState } from 'react'
import { Locale } from "@/app/[lang]/HomePage"

export const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const Newsletter = ({ lang }: { lang: Locale }) => {
    const newsletterInput = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState<string>("")
    const [error, setError] = useState<string>("")

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = newsletterInput?.current?.value

        if (checkEmail.test(email!)) {
            fetch("/de/api/newsletter/subscribe", { method: "POST", body: JSON.stringify({ email, lang }) })
                .then(res => res.json())
                .then(result => {
                    setMessage(result.message)
                    newsletterInput.current!.value = ""
                })
        } else {
            return setError(lang === "en" ? "Invalid email" : "Ungültige Email")
        }
    }

    return (
        <div className="flex flex-col text-center lg:text-left">
            <span className="ml-1 mb-3 footer-title tracking-wider">Newsletter</span>
            <form className="flex flex-col md:flex-row md:justify-center" onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    id="newsletterInput"
                    placeholder={lang === "en" ? "your@email.com" : "deine@email.com"}
                    className="input-bordered input w-full pr-16 max-w-lg"
                    autoComplete="email"
                    ref={newsletterInput}
                />
                <button className="ml-4 btn-outline btn hover:bg-primary hover:text-neutral">
                    Subscribe
                </button>
            </form>
            {message ? <span className="my-2text-success">{message}</span> : ""}
            {error ? <span className="my-2 text-error">{error}</span> : ""}
            <span className="mt-3 ml-1">{lang === "en" ? "Stay in contact!" : "Bleibe in Kontakt!"} </span>
        </div>
    )
}

export default Newsletter