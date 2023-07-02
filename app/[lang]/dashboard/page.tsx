import React from 'react'
import { ParamsProps } from "../page";

import SignOut from "../../../components/auth/SignOut";
import { authOption } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import SignIn from "@/components/auth/SignIn";

const Dashboard = async ({ params: { lang } }: ParamsProps) => {
    const session = await getServerSession(authOption)

    if (session) {
        return (
            <SignOut session={session} />
        );
    }

    return (
        <SignIn callbackUrl={`/de/dashboard`}/>
    )

}

export default Dashboard