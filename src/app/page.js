'use client'
import {auth} from "../../firebase"
import HealthPage from "./HealthData/[uid]/page";
import { useState,useEffect } from "react";
import Link from "next/link";



export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title="Healthy Eats"
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setIsLoading(true)
      if (authUser) {
        // User is signed in
        console.log(authUser.uid)
        setUser(authUser);
        setIsLoading(false)
      } else {
        // User is signed out
        setUser(null);
        setIsLoading(false)
      }
    });

    // Unsubscribe the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <main className="h-screen w-[100%]flex flex-col justify-center items-center">
      {isLoading? <div className=" h-[100vh] w-[100%]">
        <div className="h-[100px] w-[100px] bg-red-500 animate-spin rounded-full">

        </div>

      </div> : user ?
        <>
          <HealthPage />
        </>
        : <><h1 className="text-4xl font-bold mt-10">Welcome!</h1>
          <h2 className="text-lg text-gray-600 mt-4">Get started</h2>
          <div className="mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"><Link href="/signin">Sign In</Link></button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"><Link href="/signup">Sign Up</Link></button>
          </div> </>
      }
    </main>
  )}  
