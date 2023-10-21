'use client'
import axios from "axios";
import React,{useCallback, useEffect, useState} from "react";

function Page() {

    const [heartRate, setHeartRate] = useState({})

    const fetchData=useCallback(async()=>{
        const response = await axios.get("http://localhost:3000/api/mongo")
        console.log(response.data);
    })
    useEffect (() => {
        fetchData()
    })
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Fetching User Health Data...</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Heart Rate</h2>
        <p className="text-gray-600">75 BPM</p>
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Energy</h2>
        <p className="text-gray-600">2500 kcal</p>
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Steps</h2>
        <p className="text-gray-600">10,000 steps</p>
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Net Activity Calories</h2>
        <p className="text-gray-600">500 kcal</p>
      </div>
    </div>
    <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      What can you do to improve your health?
    </button>
  </div>
  </div>
      );
    };
    

export default Page;