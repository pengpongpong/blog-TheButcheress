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
            fetch("/de/api/newsletter/subscribe", { method: "POST", body: JSON.stringify({ email }) })
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
        <div className="flex flex-col text-center md:text-left">
            <span className="ml-2 footer-title">Newsletter</span>
            <form className="flex flex-col gap-4 md:flex-row" onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder={lang === "en" ? "your@email.com" : "deine@email.com"}
                    className="input-bordered input w-full pr-16"
                    autoComplete="email"
                    ref={newsletterInput}
                />
                <button className="btn-outline btn hover:bg-primary hover:text-neutral">
                    Subscribe
                </button>
            </form>
            {message ? <span className="my-2 ml-2 text-success">{message}</span> : ""}
            {error ? <span className="my-2 ml-2 text-error">{error}</span> : ""}
            <span className="ml-2 mt-2">{lang === "en" ? "Stay in contact!" : "Bleibe in Kontakt!"} </span>
        </div>
    )
}

export default Newsletter