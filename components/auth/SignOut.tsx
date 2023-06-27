"use client"
import React from 'react'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Session } from "next-auth"


const SignOut = ({session}: {session: Session}) => {
    return (
        <main className="flex flex-col justify-center items-center gap-8">
            <p>Benutzer: {session?.user?.name}</p>
            <Link className="btn btn-primary" href="/de/dashboard/email">Go to Email</Link>
            <button className="btn btn-warning" onClick={() => signOut()}>Logout</button>
        </main>
    )
}

export default SignOut