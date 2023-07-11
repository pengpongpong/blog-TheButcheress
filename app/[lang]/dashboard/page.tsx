import React from 'react'

import SignOut from "../../../components/auth/SignOut";
import { authOption } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import SignIn from "@/components/auth/SignIn";

const Dashboard = async () => {
    const session = await getServerSession(authOption)

    if (session) {
        return (
            <SignOut session={session} />
        );
    }

    return (
        <SignIn callbackUrl={`/de/api/auth/signin?callbackUrl=/de/dashboard`}/>
    )

}

export default Dashboard