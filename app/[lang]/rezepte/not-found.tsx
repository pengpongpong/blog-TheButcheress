import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h2>Recipe not found!</h2>
            <p>Could not find requested resource</p>
            <p>
                View <Link href="/rezepte">all recipes</Link>
            </p>
        </div>
    )
}