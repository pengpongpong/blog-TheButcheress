import { ReactNode } from "react";
import { Locale } from "../HomePage";

const RecipeLayout = async ({ children, params }: { children: ReactNode, params: { lang: Locale } }) => {
    return (
        <>
            {children}
        </>
    )
} 

export default RecipeLayout