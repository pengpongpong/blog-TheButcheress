"use client"
import CardContainer from "@/components/card/Card"
import { signOut } from "next-auth/react"
import React from 'react'


const EmailContainer = ({ session, data }: any) => {
    return (
        <>
            <button className="btn btn-warning" onClick={() => signOut()}>Logout</button>
            <CardContainer blog="email" data={data} />
        </>
    )
}

export default EmailContainer