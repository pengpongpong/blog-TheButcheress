
export const transformLocale = (lang: string): ("DE" | "EN") => {
    const langUppercase = lang.toUpperCase();

    if (langUppercase === "DE" || langUppercase === "EN") {
        return langUppercase as "DE" | "EN";
    } else {
        return "DE";
    }
}
