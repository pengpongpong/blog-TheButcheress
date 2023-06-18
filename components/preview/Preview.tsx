"use client"
import { PreviewSuspense } from "next-sanity/preview"
import React, { ReactNode } from 'react'


const Preview = ({ children }: { children: ReactNode }) => {
    return (
        <PreviewSuspense fallback="Ladet Preview...">
            {children}
        </PreviewSuspense>

    )
}

export default Preview