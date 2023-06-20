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

interface ConsentStore {
    consent: boolean | null,
    setConsent: (current: boolean) => void
}

export const useConsentStore = create<ConsentStore>((set) => ({
    consent: null,
    setConsent: (current) => set(() => ({ consent: current }))
}))