"use client";

import { AppDispatch, RootState } from "@/app/store";
import { updateClientDetails } from "@/app/store/slices/clientSlice"; // <-- make sure this exists
import { Save } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditProfileForm = () => {
  const { clientData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // Controlled input states
  const [formData, setFormData] = useState({
    name: clientData.name || "",
    username: clientData.username || "",
    email: clientData.email || "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateClientDetails({ id: clientData._id, formData })); // 🔥 Calls your Redux action
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto bg-black border border-white/20 rounded-2xl shadow-lg p-8 flex flex-col gap-6 text-white"
    >
      <h2 className="text-xl font-bold">Edit Profile</h2>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Username */}
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-semibold">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white bg-white text-black font-semibold hover:bg-black hover:text-white hover:border-white transition-all"
      >
        <Save size={18} />
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
