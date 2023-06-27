import { redirect } from "next/navigation"
import React from 'react'

type Props = {}

const Index = (props: Props) => {
    redirect("/rezepte")
}

export default Index