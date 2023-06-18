import Link from "next/link"

export const ExitPreview = () => {
    return (
        <Link
            className="bg-primary p-6 text-black font-bold fixed bottom-0 right-0"
            href="/de/api/exit-preview"
            prefetch={false}
        >
            Exit Preview
        </Link>
    )
}