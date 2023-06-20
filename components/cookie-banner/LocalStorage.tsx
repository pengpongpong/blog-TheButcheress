"use client"
export const getLocalStorage = (key: string) => {

    if (typeof window !== "undefined") {
        return localStorage.getItem(key)
    } else {
        return null
    }

}
export const setLocalStorage = (value: string) => {
    if (typeof window !== "undefined") {
        return localStorage.setItem("cookie-preference", value)
    }
}

