"use client"
import React from 'react'
import { ParamsProps } from "../page";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

const Dashboard = ({ params: { lang } }: ParamsProps) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/de/api/auth/signin?callbackUrl=/de/dashboard")
        }
    })

    if (session) {
        return (
            <main className="flex flex-col justify-center items-center gap-8">
                <p>Signed in as {session?.user?.email}</p>
                <Link className="btn btn-primary"  href="/de/dashboard/email">Go to Email</Link>
                <button className="btn btn-warning" onClick={() => signOut()}>Logout</button>
            </main>

        );
    }
    return (
        <main className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-6xl text-center font-text">Nicht eingeloggt!</h1>
            <button className="btn btn-primary" onClick={() => signIn()}>Login</button>
        </main>
    )

}

export default Dashboard