'use client'
import { ConnectToTerraButton } from '@tryterra/terra-ui'
import axios from 'axios';
import SignInPage from './signin/page'
import app from "../../firebase";

export default function Home() {
  const onClickHandler=async()=>{
    const data=await axios.post("http://localhost:3000/api/terra")
    console.log(data)
  }
  return (
    <main className="">
    <button onClick={onClickHandler}>Click Me</button>
      <ConnectToTerraButton onClick={async () => {
        const url = (await axios.get("http://localhost:3000/api/generateWidgetSession")).data.url 
        window.location = url
      }} />

    </main>
  )
}
