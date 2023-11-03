
export const transformLocale = (lang: string): ("DE" | "EN") => {
    const langUppercase = lang.toUpperCase();

    if (langUppercase === "DE" || langUppercase === "EN") {
        return langUppercase as "DE" | "EN";
    } else {
        return "DE";
    }
}

export function setLocalStorage(item: string, value: string) {
    if(!window) return console.error("no window defined")

    return localStorage.setItem(item, value)
}

export function getLocalStorage(item: string) {
    if (!window) return console.error("no window defined")

    return localStorage.getItem(item)
}