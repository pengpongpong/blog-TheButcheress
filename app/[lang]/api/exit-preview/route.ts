import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    console.log("called")
    draftMode().disable()
    redirect("/")
    // return new Response('Draft mode is enabled')
}