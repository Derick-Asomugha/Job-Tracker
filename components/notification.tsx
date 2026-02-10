"use client"
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Notification() {
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-md
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Notifications"
    >
      <IoIosNotificationsOutline
        size={22}
        className="text-gray-700 dark:text-gray-200"
      />
    </button>
  );
}
