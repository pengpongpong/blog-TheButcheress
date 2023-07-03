"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const SignIn = ({ callbackUrl }: { callbackUrl: string }) => {

    const submitLogin = () => {
        signIn("Credentials", { callbackUrl: callbackUrl })
    }

    return (
        <main className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-6xl text-center font-text">Nicht eingeloggt!</h1>
            <button className="btn btn-primary" onClick={submitLogin}>LOGIN</button>
        </main>
    )
}


export default SignIn