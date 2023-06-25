"use client"
import React from 'react'
import { signIn } from "next-auth/react"


const SignIn = ({callbackUrl}: {callbackUrl: string}) => {
    return (
        <main className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-6xl text-center font-text">Nicht eingeloggt!</h1>
            <button className="btn btn-primary" onClick={() => signIn("Credentials", { callbackUrl: callbackUrl })}>Login</button>
        </main>
    )
}


export default SignIn