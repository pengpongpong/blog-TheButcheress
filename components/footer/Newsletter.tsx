"use client"
import React, { useRef, useState } from 'react'
import { Locale } from "@/app/[lang]/HomePage"

const Newsletter = ({ lang }: { lang: Locale }) => {
    const newsletterInput = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState<string>("")

    const onSubmit = () => {
        const email = newsletterInput?.current?.value
        const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (checkEmail.test(email!)) {
            fetch("/de/api/newsletter", { method: "POST", body: JSON.stringify({email}) })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                newsletterInput.current!.value = ""
            })
        } else {
            setMessage(lang === "en" ? "Invalid email" : "Ungültige Email")
        }

    }

    return (
        <div className="flex flex-col text-center md:text-left">
            <span className="ml-2 footer-title">Newsletter</span>
            <div className="flex flex-col gap-4 md:flex-row">
                <input
                    type="email"
                    placeholder={lang === "en" ? "your@email.com" : "deine@email.com"}
                    className="input-bordered input w-full pr-16"
                    autoComplete="email"
                    ref={newsletterInput}
                />
                <button onClick={onSubmit} className="btn-outline btn hover:bg-primary hover:text-neutral">
                    Subscribe
                </button>
            </div>
            <span className="my-2 ml-2 text-error">{message}</span>
            <span className="ml-2">{lang === "en" ? "Stay in contact!" : "Bleibe in Kontakt!"} </span>
        </div>
    )
}

export default Newsletter