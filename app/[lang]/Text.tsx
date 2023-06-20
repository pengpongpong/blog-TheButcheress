"use client"
import React, { MouseEvent } from 'react'

type Props = {}


const Text = (props: Props) => {

    function setLocal() {
        return localStorage.removeItem("cookie-preference")
        // localStorage.setItem("cookie-preference", "false")
    }

    return (
        <button onClick={setLocal}>SEt local</button>

    )
}

export default Text