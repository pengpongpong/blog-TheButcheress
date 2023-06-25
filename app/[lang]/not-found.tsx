import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="flex flex-col justify-center items-center">
            <h2>Recipe not found!</h2>
            <p>Could not find requested resource</p>
            <p className="btn btn-primary">
                View <Link href="/blog">all blogs</Link>
            </p>
        </main>
    )
}