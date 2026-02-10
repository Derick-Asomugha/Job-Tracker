import { CgProfile } from "react-icons/cg";

export default function Profile() {
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-full
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Profile"
    >
      <CgProfile size={22} className="text-gray-700 dark:text-gray-200" />
    </button>
  );
}
