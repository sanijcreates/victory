'use client'
import axios from "axios";
import React,{useCallback, useEffect, useState} from "react";

function Page() {
    const fetchData=useCallback(async()=>{
        const response = await axios.get("http://localhost:3000/api/mongo")
        console.log(response.data);
    })
    useEffect (() => {
        fetchData()
    })
    return (// Inside your sign-up component
            <h1>ok</h1>
    );
    }
    

export default Page;