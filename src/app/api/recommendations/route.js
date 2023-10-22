import { NextRequest, NextResponse } from "next/server";
import {OpenAI} from "openai"

const openai=new OpenAI({
    apiKey:process.env.API_SECRET
})

export async function POST(request) {
    const prompt=await request.json();
    const content=prompt.prompt
    const chatCompletion=await openai.chat.completions.create({
        messages:[{role:'user',content:content}],
        model:'gpt-3.5-turbo'
    })
    console.log(chatCompletion.choices[0].message.content)
    return NextResponse.json({ data: "Sorry ! Try Again later" }, { status: 200}); 
}