'use client'
import { ConnectToTerraButton } from '@tryterra/terra-ui'
import axios from 'axios';
import SignInPage from './signin/page'
import app from "../../firebase";

export default function Home() {
  return (
    <main className="">
      <ConnectToTerraButton onClick={async () => {
        const url = (await axios.get("http://localhost:3000/api/generateWidgetSession")).data.url 
        window.location = url
      }} />
    </main>
  )
}
