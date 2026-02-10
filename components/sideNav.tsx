"use client";

import { FaSuitcase } from "react-icons/fa6";
import Link from "next/link";
import { TbLayoutDashboard } from "react-icons/tb";
import { CgLoadbarSound, CgProfile } from "react-icons/cg";
// import { AiOutlineFileText } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { usePathname } from "next/navigation"; // <-- import this

export default function SideNav() {
  const pathname = usePathname(); // current path

  return (
    <aside
      className="hidden md:flex w-64 min-h-screen flex-col 
                 bg-white dark:bg-gray-900 
                 border-r border-gray-200 dark:border-gray-800"
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div
          className="flex items-center justify-center h-10 w-10 
                     rounded-md bg-[#0d4585] dark:bg-white dark:text-[#0d4585] text-white"
        >
          <FaSuitcase size={18} />
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-black dark:text-white ">
          Gig Tracker
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 text-md">
        <NavItem href="/" pathname={pathname}>
          <TbLayoutDashboard size={20} /> <p className="pl-2">Dashboard</p>
        </NavItem>
        <NavItem href="/profile" pathname={pathname}>
          <CgProfile size={20} /> <p className="pl-2">Profile</p>
        </NavItem>
        <NavItem href="/pipeline" pathname={pathname}>
          <CgLoadbarSound size={20} /> <p className="pl-2">Pipeline</p>
        </NavItem>
        {/* <NavItem href="/resumeanalysis" pathname={pathname}>
          <AiOutlineFileText size={20} /> <p className="pl-2">Resume Analysis</p>
        </NavItem> */}
        <NavItem href="/analytics" pathname={pathname}>
          <BsGraphUp size={20} /> <p className="pl-2">Analytics</p>
        </NavItem>
        <NavItem href="/calender" pathname={pathname}>
          <HiOutlineCalendarDateRange size={20} /> <p className="pl-2">Calendar</p>
        </NavItem>
      </nav>
    </aside>
  );
}

/* ================= Reusable NavItem with active highlight ================= */
function NavItem({
  href,
  children,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  pathname: string;
}) {
  const isActive = pathname === href; // true if current path matches href

  return (
    <Link
      href={href}
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
