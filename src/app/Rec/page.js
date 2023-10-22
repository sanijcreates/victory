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
    <div className="flex justify-center items-center h-screen">
      {result.length==0?<div className='inline-block h-[100px] w-[100px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>:<div className=' whitespace-pre-line'>{result}</div>}
    </div>
  );
}

export default Page;