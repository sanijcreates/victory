'use client'
import { useSearchParams } from 'next/navigation'

import React,{useCallback, useEffect, useState} from "react";
import { auth,db } from "../../../firebase";
import { collection, doc,getDocs } from "firebase/firestore"; 



function Page(props) {
    const searchParams = useSearchParams()
    const [food, setFood] = useState('')
    const sleep = searchParams.get('sleep')
    const heartRate = searchParams.get('heartRate')
    const energy = searchParams.get('energy')
    const cal = searchParams.get('cal')
    const steps = searchParams.get('steps')

    const prompt = `I normally for ${sleep} seconds, my avg heart rate is ${heartRate} bpm, my net activity calories is ${cal}, my average steps in a day are ${steps}, I have ${food} in my kitchen. In regard to to improve my sleep, heart rate, calorie intake, steps, what could be a day of diet for me that could improve my health. answer it in bullet points starting from 1. Give suggestions like a doctor. Include the data provided by me in your answers. Do not include any other information. start your answer from bullet points`

    useEffect (() => {
      
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
    },[])
    const fetchUserData=useCallback(async(uid)=>{
        // const querySnapShot=await db.collection(uid).get();
        const snapshot=await getDocs(collection(db,uid));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data[0]);
        setFood(data[0].ingredients)
        console.log(data[0].ingredients);  
      })

  console.log(searchParams.get('sleep'));
  console.log(searchParams.get('heartRate'));
  console.log(searchParams.get('cal'));
  console.log(searchParams.get('steps'));
  console.log(searchParams.get('uid'));
    return (// Inside your sign-up component
    <div className="flex justify-center items-center h-screen">
        <h1>as</h1>
</div>
    );
}

export default Page;