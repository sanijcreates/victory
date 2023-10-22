'use client'
import axios from "axios";
import React,{useCallback, useEffect, useState} from "react";
import { auth,db } from "../../../../firebase";
import { collection, doc,getDocs } from "firebase/firestore"; 



function HealthPage() {

    const [heartRate, setHeartRate] = useState('')
    const [energy, setEnergy] = useState('')
    const [steps, setSteps] = useState('')
    const [cal, setCal] = useState('')


    const [user,setUser]=useState();
    const [userName,setUserName]=useState();

    const [isLoading,setIsLoading]=useState(false)

    const fetchData=useCallback(async()=>{
        setIsLoading(true)
        const response = await axios.get("http://localhost:3000/api/mongo")
        setIsLoading(false)
        const data = response.data.data[0]
        setHeartRate(response.data.data[0].heart_rate_data.summary.avg_hr_bpm)
        setEnergy(data.energy_data.energy_kilojoules)
        setSteps(data.distance_data.summary.steps)
        setCal(data.calories_data.net_activity_calories)
        
    })

    const fetchUserData=useCallback(async(uid)=>{
      // const querySnapShot=await db.collection(uid).get();
      const snapshot=await getDocs(collection(db,uid));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserName(data[0].name)
    })
    useEffect (() => {
        fetchData()
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          setIsLoading(true)
          if (authUser) {
            // User is signed in
            setUser(authUser);
            fetchUserData(authUser.uid)
          } else {
            // User is signed out
            setUser(null);
          }
        });
        



    
        // Unsubscribe the listener when the component unmounts
        return () => {
          unsubscribe();
        };
    },[])
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">

    <div className="bg-white p-6 rounded-lg shadow-md">
    {
      isLoading ?<h1 className="text-2xl font-bold mb-4">Fetching User Health Data...</h1>:
      <h1 className="text-2xl font-bold mb-4">Welcome {userName?userName:``}</h1>
    }
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
    

export default HealthPage;