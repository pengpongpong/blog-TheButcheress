import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="flex flex-col justify-center items-center">
            <h1>Oops...</h1>
            <p>Leider konnte die Kategorie nicht gefunden werden.</p>
            <p className="btn btn-primary">
                Zeige <Link href="/kategorie/rezept-nach-tags">alle Tags</Link>
            </p>
        </main>
    )
}