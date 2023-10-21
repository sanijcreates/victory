import clientPromise from "../../../../mongodb";



import { NextRequest, NextResponse } from "next/server";


export async function GET(request) {
    
    try {
        const client = await clientPromise;
        const db = await client.db('cluster0');
        const collection = await db.collection('activity');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ data: data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    } 
}