
"use client";

import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import DarkmodeBtn from "./darkmodebtn";
import LogoutBtn from "./logoutBtn";

import { FaSuitcase } from "react-icons/fa6";
import { TbLayoutDashboard } from "react-icons/tb";
import { CgLoadbarSound, CgProfile } from "react-icons/cg";
// import { AiOutlineFileText } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- import this

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NavbarClient({ session }: any) {
  const [toggleNav, setToggleNav] = useState(false);
  const pathname = usePathname(); // get current path

  return (
    <>
      {/* Navbar */}
      <nav className="w-full  bg-white dark:bg-gray-900 shadow-lg px-6 py-4 flex items-center justify-between md:justify-start">
        <div className="flex flex-col md:flex-row md:items-center md:gap-6 flex-1">
          <div>
            <h1 className="md:text-lg text-base font-semibold text-gray-900 dark:text-white">
              Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Track your applications accross all stages.
            </p>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden ml-4">
          <LuMenu
            size={24}
            className="dark:text-white cursor-pointer"
            onClick={() => setToggleNav(true)}
          />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex ml-auto gap-4 items-center">
          <DarkmodeBtn />
          <LogoutBtn />
        </div>
      </nav>

      {/* Mobile SideNav Overlay */}
      {toggleNav && (
        <div className="fixed inset-0 z-50 flex w-screen">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 dark:bg-black/50 transition-opacity"
            onClick={() => setToggleNav(false)}
          ></div>

          {/* SideNav */}
          <aside className="relative bg-white dark:bg-gray-900 w-3/4 sm:w-64 max-w-xs min-h-screen p-6 flex flex-col shadow-lg transform transition-transform duration-300 ease-in-out">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 text-xl font-bold"
              onClick={() => setToggleNav(false)}
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#0d4585] dark:bg-white dark:text-[#0d4585] text-white">
                <FaSuitcase size={18} />
              </div>
              <h1 className="text-lg font-semibold text-black dark:text-white">
                JobTrack AI
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-6 text-md">
              <NavItem href="/" pathname={pathname} onClick={() => setToggleNav(false)}>
                <TbLayoutDashboard size={20} /> <p className="pl-2">Dashboard</p>
              </NavItem>
              <NavItem href="/profile" pathname={pathname} onClick={() => setToggleNav(false)}>
                <CgProfile size={20} /> <p className="pl-2">Profile</p>
              </NavItem>
              <NavItem href="/pipeline" pathname={pathname} onClick={() => setToggleNav(false)}>
                <CgLoadbarSound size={20} /> <p className="pl-2">Pipeline</p>
              </NavItem>
              <NavItem href="/analytics" pathname={pathname} onClick={() => setToggleNav(false)}>
                <BsGraphUp size={20} /> <p className="pl-2">Analytics</p>
              </NavItem>
              <NavItem href="/calender" pathname={pathname} onClick={() => setToggleNav(false)}>
                <HiOutlineCalendarDateRange size={20} /> <p className="pl-2">Calendar</p>
              </NavItem>

              {/* Mobile Icons */}
              <div className="mt-auto flex justify-around items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                <DarkmodeBtn />
                <LogoutBtn />
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

/* Reusable NavItem with active highlight */
function NavItem({
  href,
  children,
  onClick,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  pathname: string;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center rounded-md px-3 py-2
                 text-black dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 hover:text-gray-900 dark:hover:text-white
                 transition
                 ${isActive ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold" : ""}`}
    >
      {children}
    </Link>
  );
}
