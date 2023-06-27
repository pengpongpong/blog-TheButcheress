import { redirect } from "next/navigation"

type Props = {}

const Index = (props: Props) => {
    redirect("/rezepte")
}

export default Index