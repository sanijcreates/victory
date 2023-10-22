'use client'
import { useSearchParams } from 'next/navigation'

import React, { useCallback, useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import axios from 'axios';



function Page(props) {

  const searchParams = useSearchParams()
  const [food, setFood] = useState('')
  const [result,setResult]=useState("")
  const sleep = searchParams.get('sleep')
  const heartRate = searchParams.get('heartRate')
  const energy = searchParams.get('energy')
  const cal = searchParams.get('cal')
  const steps = searchParams.get('steps')

  let prompt = ""

  const fetchRecommendation=useCallback(async(prompt)=>{
    const response=await axios.post("http://localhost:3000/api/recommendations",{"prompt":prompt});
    const data=response.data
    setResult(data.data)
})

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //   setIsLoading(true)
      if (authUser) {
        // User is signed in

        fetchUserData(authUser.uid)
      } else {
        // User is signed out
        // setUser(null);
      }
    });
    // Unsubscribe the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [])
  const fetchUserData = useCallback(async (uid) => {
    // const querySnapShot=await db.collection(uid).get();
    const snapshot = await getDocs(collection(db, uid));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    prompt = `I normally slept for ${sleep} seconds, my avg heart rate is ${heartRate} bpm, my net activity calories is ${cal}, my average steps in a day are ${steps}, I have ${data[0].ingredients} in my kitchen. In regard to to improve my sleep, heart rate, calorie intake, steps, what could be a day of diet for me that could improve my health. answer it in bullet points starting from 1. Give suggestions like a doctor. Include the data provided by me in your answers. Do not include any other information. start your answer from bullet points`
    fetchRecommendation(prompt)
    setFood(data[0].ingredients)
  })
    return (// Inside your sign-up component
    <div className="min-h-screen bg-blue-100">
    <div className="p-4">
        <div className="bg-blue-100 rounded-lg p-4">
            <h1 className="text-2xl font-semibold mb-12 space-y-12">
                            What does HealthyEat say about your health statistics?
            </h1>
            <div className="flex flex-col space-y-10">
                <div className="flex justify-start">
                    <div className="bg-white text-gray-800 p-4 rounded-tr-xl  max-w-xl rounded-br-lg rounded-bl-lg">
                        {prompt}
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="bg-white text-gray-800 p-4 rounded-tr-xl max-w-xl  rounded-br-lg rounded-bl-lg">
                         {prompt}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


    );

}

export default Page;