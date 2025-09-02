"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  oldPassword: string;
  setOldPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string | null;
};

const EditPasswordForm = (props: Props) => {
  // local state for toggling visibility
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form
      onSubmit={props.handleSubmit}
      className="w-full max-w-md mx-auto bg-black border border-white/20 p-8 rounded-2xl shadow-lg flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-center text-white tracking-wide">
        Update Password
      </h2>

      {/* Old Password */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="oldPassword"
          className="text-white text-sm font-semibold"
        >
          Current Password
        </label>
        <input
          id="oldPassword"
          type={showOld ? "text" : "password"}
          value={props.oldPassword}
          onChange={(e) => props.setOldPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400 pr-10"
          placeholder="Enter current password"
          required
        />
        <button
          type="button"
          onClick={() => setShowOld(!showOld)}
          className="absolute right-3 top-10 text-white/70 hover:text-white"
        >
          {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="newPassword"
          className="text-white text-sm font-semibold"
        >
          New Password
        </label>
        <input
          id="newPassword"
          type={showNew ? "text" : "password"}
          value={props.newPassword}
          onChange={(e) => props.setNewPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400 pr-10"
          placeholder="Enter new password"
          required
        />
        <button
          type="button"
          onClick={() => setShowNew(!showNew)}
          className="absolute right-3 top-10 text-white/70 hover:text-white"
        >
          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="confirmPassword"
          className="text-white text-sm font-semibold"
        >
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={props.confirmPassword}
          onChange={(e) => props.setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400 pr-10"
          placeholder="Re-enter new password"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-10 text-white/70 hover:text-white"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Error */}
      {props.error && (
        <p className="text-red-500 text-sm text-center">{props.error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={props.loading}
        className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {props.loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default EditPasswordForm;
