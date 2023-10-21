import { response } from "express";
import { NextRequest, NextResponse } from "next/server";
import Terra from "terra-api";

const terra = new Terra("teamvictory-testing-MVNMTVakEO", "P9cNY2JqfTZkwn-xVv3Y6CSVyC1BwFY2","mongodb+srv://cluster0.yqef2wq.mongodb.net");

export async function GET(request) {
    const resp = await terra.generateWidgetSession({
        referenceID: "HelloHarvard",
        providers:["GARMIN"],
        language: "en",
        authSuccessRedirectUrl: "http://localhost:3000",
        authFailureRedirectUrl: "http://localhost:3000"
    })
    console.log(resp)
    return NextResponse.json({ url: resp.url }, { status: 200}); 
}