"use client";


import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useState } from "react";

export default function DarkmodeBtn() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ✅ Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="flex items-center gap-2 font-medium text-black">
        Dark Mode
      </button>
    );
  }
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-md
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {isDarkMode ? (
        <MdOutlineWbSunny size={22} className="text-white" />
      ) : (
        <IoMoonOutline size={22} className="text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}
