"use client"
import React, { useEffect, useState } from 'react'

const Confirmation = ({ id, title, fetchApi }: { id: string, title: string, fetchApi: string }) => {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        fetch(fetchApi, { method: "POST", body: JSON.stringify({ id }) })
            .then(res => res.json())
            .then(result => setMessage(result.message))
    }, [id, fetchApi])

    return (
        <>
            <h1 className="mb-20 text-6xl">{title}</h1>
            {message ? <p className="text-xl">{message}</p> : ""}

        </>
    )
}

export default Confirmation