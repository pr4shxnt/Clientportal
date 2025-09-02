"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      <aside className="w-64 bg-black border-r border-white/20 p-6 flex flex-col justify-between items-end">
        <div>
          <h1 className="text-end font-bold mb-10 tracking-wide">
            Edit dashboard
          </h1>
          <nav className="flex flex-col gap-3">
            <Link
              href="/dashboard/settings/edit/profile"
              className="flex items-center gap-3 px-4  rounded-lg hover:underline hover:bg-white/10 transition"
            >
              Profile
            </Link>
            <Link
              href="/dashboard/settings/edit/password"
              className="flex items-center gap-3 px-4  rounded-lg hover:underline hover:bg-white/10 transition"
            >
              Password
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4  rounded-lg hover:underline hover:bg-white/10 transition"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:underline  transition">
          <LogOut size={18} />
          Logout
        </div>
      </aside>

      {/* Main Content */}
    </div>
  );
};

export default DashboardLayout;
