import { redirect } from "next/navigation"

// redirect to all recipes
const Index = () => {
    redirect("/rezepte")
}

export default Index