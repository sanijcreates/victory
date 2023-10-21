'use client'
import axios from "axios";
import React,{useCallback, useEffect, useState} from "react";


function Page() {

    const [heartRate, setHeartRate] = useState('')
    const [energy, setEnergy] = useState('')
    const [steps, setSteps] = useState('')
    const [cal, setCal] = useState('')

    const fetchData=useCallback(async()=>{
        const response = await axios.get("http://localhost:3000/api/mongo")
        const data = response.data.data[0]
        console.log(data);
        setHeartRate(response.data.data[0].heart_rate_data.summary.avg_hr_bpm)
        setEnergy(data.energy_data.energy_kilojoules)
        setSteps(data.distance_data.summary.steps)
        setCal(data.calories_data.net_activity_calories)
        console.log(response.data.data[0].heart_rate_data.summary.avg_hr_bpm);
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
        <p className="text-gray-600">{heartRate}</p>
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Energy</h2>
        <p className="text-gray-600">{energy}</p>
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Steps</h2>
        <p className="text-gray-600">{steps}</p>
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Net Activity Calories</h2>
        <p className="text-gray-600">{cal}</p>
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