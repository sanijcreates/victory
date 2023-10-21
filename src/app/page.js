'use client'
import {auth} from "../../firebase"
import { useState,useEffect } from "react";
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
    <main className="">
      {user?<h1>User</h1>:<h1>Not User</h1>}
    </main>
  )
}
