import { ReactNode } from "react"


export const metadata = {
    title: 'TheButcheress | Blog',
    description: "A blog about food, recipes and travel",
}

export default async function PdfLayout({
    children,
}: {
    children: ReactNode,
}) {

    return (
        <main className="w-screen h-screen">
            {children}
        </main>
    )
}
