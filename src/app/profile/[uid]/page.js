'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../../../firebase';
const Profile = (params) => {
  const user_uid=params.params.uid
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    ingredients: '',
  });
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, ingredients: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., save data to a database.
    try {
      // Add data to Firestore
      const docRef=await addDoc(collection(db,user_uid),formData)
      router.replace(`/HealthData/${user_uid}`)
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">User Profile : {params.uid}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-semibold text-gray-600">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-semibold text-gray-600">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="height" className="block text-sm font-semibold text-gray-600">
              Height (cm):
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="block text-sm font-semibold text-gray-600">
              Weight (kg):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-600">
              Available Ingredients for Healthy Diet (comma-separated):
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleIngredientChange}
              className="w-full p-2 border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
