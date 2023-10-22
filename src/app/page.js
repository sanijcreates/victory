'use client'
import {auth} from "../../firebase"
import { useState,useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Unsubscribe the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <main className="h-screen flex flex-col justify-center items-center">
    {user ? 
    <>
    <h1> Show profile page here</h1>
    </>
      :  <><h1 className="text-4xl font-bold mt-10">Welcome!</h1>
        <h2 className="text-lg text-gray-600 mt-4">Get started</h2>
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"><Link href ="/signin">Sign In</Link></button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"><Link href ="/signup">Sign Up</Link></button>
        </div> </>
  }
        </main>
  )}
