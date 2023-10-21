import { NextRequest, NextResponse } from "next/server";
import Terra from "terra-api";

const terra = new Terra("teamvictory-testing-MVNMTVakEO", "P9cNY2JqfTZkwn-xVv3Y6CSVyC1BwFY2","mongodb+srv://cluster0.yqef2wq.mongodb.net");
export async function POST(request) {
    const data = await terra.getNutrition({userId:"6799b7d8-a857-4783-98bd-136e38b3621c",startDate: new Date("2023-03-10"), endDate: new Date(), toWebhook: false })

    // Handle data here
    console.log("Hello World")
    console.log(data)
    return NextResponse.json({ data: data }, { status: 200}); 
}