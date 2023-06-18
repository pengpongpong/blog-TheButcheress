import Link from "next/link";

export const transformLocale = (lang: string = "de"): ("DE" | "EN") => {
    const langUppercase = lang.toUpperCase();

    if (langUppercase === "DE" || langUppercase === "EN") {
        return langUppercase as "DE" | "EN";
    } else {
        return "DE";
    }

}

export const ExitPreview = () => {
    return (
        <Link
            className="bg-primary p-6 text-black font-bold fixed bottom-0 right-0"
            href="/api/exit-preview"
        >
            Exit Preview
        </Link>
    )
}