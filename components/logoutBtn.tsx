"use client";

import { IoLogOutOutline } from "react-icons/io5";
import { signOutAction } from "@/app/actions/auth";

export default function LogoutBtn() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submit

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    await signOutAction(); // call server action
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="w-10 h-10 flex items-center justify-center rounded-md
                   hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        aria-label="Logout"
      >
        <IoLogOutOutline
          size={22}
          className="text-gray-700 dark:text-gray-200 hover:text-red-600"
        />
      </button>
    </form>
  );
}
