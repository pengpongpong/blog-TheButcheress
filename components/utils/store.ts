import { create } from "zustand";
import { CardData } from "../card/Card";

interface Data {
    data: CardData[];
    loading: boolean;
    setData: (data: CardData[]) => void;
    setLoading: (current: boolean) => void;
}

//search page
interface SearchStore extends Data {
    search: string;
    setSearch: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    search: "",
    data: [],
    loading: false,
    setSearch: ((query) => set(() => ({ search: query }))),
    setData: ((result) => set(() => ({ data: result }))),
    setLoading: ((current) => set(() => ({ loading: current }))),
}))

//recipe by tags
interface QueryStore extends Data {
    query: string[];
    addQuery: (url: string) => void;
    setQuery: (url: string[]) => void;
}

export const useQueryStore = create<QueryStore>((set) => ({
    query: [],
    data: [],
    loading: false,
    addQuery: (url) => set((state) => ({ query: [...state.query, url] })),
    setQuery: (url) => set(() => ({ query: url })),
    setData: (result) => set(() => ({ data: result })),
    setLoading: (current) => set(() => ({ loading: current }))
}))

// handle consent for cookie banner & language switch
interface useConsentStore {
    advertiseConsent: boolean,
    analyticsConsent: boolean,
    functionalConsent: boolean,
    open: boolean,
    showBanner: boolean,
    setShowBanner: (current: boolean) => void
    setOpen: (current: boolean) => void
    setAnalyticsConsent: (current: boolean) => void
    setFunctionalConsent: (current: boolean) => void
    setAdvertiseConsent: (current: boolean) => void
}

export const useConsentStore = create<useConsentStore>((set) => ({
    advertiseConsent: false,
    analyticsConsent: false,
    functionalConsent: false,
    open: false,
    showBanner: false,
    setShowBanner: (current) => set(() => ({ showBanner: current })),
    setOpen: (current) => set(() => ({ open: current })),
    setAnalyticsConsent: (current) => set(() => ({ analyticsConsent: current })),
    setFunctionalConsent: (current) => set(() => ({ functionalConsent: current })),
    setAdvertiseConsent: (current) => set(() => ({ advertiseConsent: current })),
}))

// set analytics consent state
export const setAnalyticsConsent = (bool: boolean) => {
    useConsentStore.getState().setAnalyticsConsent(bool)
}

// set functional consent state
export const setFunctionalConsent = (bool: boolean) => {
    useConsentStore.getState().setFunctionalConsent(bool)
}

// set advertise consent state
export const setAdvertiseConsent = (bool: boolean) => {
    useConsentStore.getState().setAdvertiseConsent(bool)
}

// open cookie banner dialog
export const setOpen = (bool: boolean) => {
    useConsentStore.getState().setOpen(bool)
}

// show/hide cookie banner
export const setShowBanner = (bool: boolean) => {
    useConsentStore.getState().setShowBanner(bool)
}