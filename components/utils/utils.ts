export const transformLocale = (lang: string = "de"): ("DE" | "EN") => {
    const langUppercase = lang.toUpperCase();

    if (langUppercase === "DE" || langUppercase === "EN") {
        return langUppercase as "DE" | "EN";
    } else {
        return "DE";
    }

}