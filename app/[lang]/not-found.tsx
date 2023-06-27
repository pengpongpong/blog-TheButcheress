import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="flex flex-col justify-center items-center">
            <h1>Oops...</h1>
            <p>Leider konnte die angeforderte Seite nicht gefunden werden.</p>
            <p className="btn btn-primary">
                Zeige <Link href="/blog">alle Blogs.</Link>
            </p>
            <p className="btn btn-primary">
                Zeige <Link href="/rezepte">alle Rezepte</Link>
            </p>
        </main>
    )
}