import React from 'react'
import { authOption } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"


const Protected = async () => {
    const session = await getServerSession(authOption)

    if (!session) {
        redirect("/de/api/auth/signin?callbackUrl=/de/protected")
    }

    return (
        <div>Protected!</div>
    )
}

export default Protected