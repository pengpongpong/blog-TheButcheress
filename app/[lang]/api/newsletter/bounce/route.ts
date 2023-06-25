import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const data = await req.json()

    return NextResponse.json({ message: JSON.stringify(data) }, { status: 201 })
}