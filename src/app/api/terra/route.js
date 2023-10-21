import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json()

    // Handle data here
    console.log(data)
    return NextResponse.json({ data: data }, { status: 200}); 
}