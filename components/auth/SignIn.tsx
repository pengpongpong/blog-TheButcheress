"use client"
import React from 'react'
import { signIn } from "next-auth/react"
import Link from "next/link"


const SignIn = ({ callbackUrl }: { callbackUrl: string }) => {

    const onSubmit = () => {
        signIn("Credentials", { callbackUrl: callbackUrl })
    }
    return (
        <main className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-6xl text-center font-text">Nicht eingeloggt!</h1>
            <Link className="btn btn-primary" href={`${process.env.NEXT_PUBLIC_DOMAIN}/de/api/auth/signin?callbackUrl=${callbackUrl}`}>LOGIN</Link>
            <button className="btn btn-primary" onClick={onSubmit}>LOGIN</button>
        </main>
    )
}


export default SignIn