import { NextRequest, NextResponse } from "next/server";
import Terra from "terra-api";

const terra = new Terra("teamvictory-testing-MVNMTVakEO", "P9cNY2JqfTZkwn-xVv3Y6CSVyC1BwFY2","mongodb+srv://cluster0.yqef2wq.mongodb.net");
export async function POST(request) {
    const data = await terra.getNutrition({userId:"5d4556b2-85ab-4fe4-b606-694ef95be4e9",startDate: new Date("2023-03-10"), endDate: new Date(), toWebhook: false })

    // Handle data here
    console.log(data)
    return NextResponse.json({ data: data }, { status: 200}); 
}