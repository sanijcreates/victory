'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import addData from "@/firebase/firestore/addData";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()
        
    }
    return (// Inside your sign-up component
    <div className="flex justify-center items-center h-screen">
    <div className="w-1/3 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        <form onSubmit={handleForm}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-600">
                Sign up
            </button>
        </form>
    </div>
</div>
    );
}

export default Page;