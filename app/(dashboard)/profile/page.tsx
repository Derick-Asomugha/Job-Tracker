// app/(dashboard)/profile/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  // Get headers and convert to object
  const headersList = await headers();
  const headersObj = Object.fromEntries(headersList.entries());

  // Get session
  const session = await auth.api.getSession({ headers: headersObj });
  if (!session) redirect("/login");

  const user = session.user;

  // Use Google image if available, otherwise placeholder
//   const profileImage =
//     user.image ||
//     "https://via.placeholder.com/150?text=Profile"; // fallback image

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-6 sm:p-12">
      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 mb-6">
          <Image
  src="/placeholder.jpg" // remove /public
  alt="Profile Image"
  width={160}
  height={160}
  className="w-full h-full object-cover"
/>

        </div>

        {/* User Info */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {user.name || "Anonymous"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          {user.email}
        </p>

        {/* Optional CTA Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
