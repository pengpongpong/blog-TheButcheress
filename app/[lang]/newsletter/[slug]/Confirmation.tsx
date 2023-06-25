"use client"
import React, { useEffect, useState } from 'react'

const Confirmation = ({ id }: { id: string }) => {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        fetch("/de/newsletter/api", { method: "POST", body: JSON.stringify({ id }) })
            .then(res => res.json())
            .then(result => setMessage(result.message))
    }, [id])

    return (
        <>
            <h1>Confirm Newsletter</h1>
            <p>{message}</p>
        </>
    )
}

export default Confirmation