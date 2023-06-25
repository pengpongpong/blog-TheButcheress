"use client"
import React, { useRef, useState } from 'react'


const Unsubscribe = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState<string>("")

    const unsubscribeEmail = async () => {
        const email = inputRef.current?.value

        fetch("/de/api/newsletter/unsubscribe", { method: "POST", body: JSON.stringify({ email }) })
            .then(res => res.json())
            .then(result => {
                setMessage(result.message)
                inputRef.current!.value = ""
            })
    }

    return (
        <>
            <input className="input input-bordered" type="email" placeholder="Enter email here" ref={inputRef} />
            <button className="btn btn-primary" onClick={unsubscribeEmail}>Unsubscribe</button>
            {message ? <span className="text-success text-center">{message}</span> : ""}
        </>
    )
}

export default Unsubscribe