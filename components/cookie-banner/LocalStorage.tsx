export const setLocalStorage = (value: string) => {
    if (typeof window !== "undefined") {
        return localStorage.setItem("cookie-preference", value)
    }
}

