"use client"
import React from 'react'
import { ParamsProps } from "../page";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = ({ params: { lang } }: ParamsProps) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/de/api/auth/signin?callbackUrl=/de/dashboard")
        }
    })

    if (session) {
        return (
            <>
                Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )

}

export default Dashboard