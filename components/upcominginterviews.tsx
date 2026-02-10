// import Link from "next/link";
// import { RecentAppProps } from "./recentapp";

// export default function UpcomingInterviews({
//   apps,
// }: {
//   apps: RecentAppProps[];
// }) {
//   const interviews = apps.filter(
//     (app) => app.status === "Interviewing"
//   );

//   return (
//     <div
//       className="rounded-2xl border border-gray-200 dark:border-gray-800 
//                  bg-white dark:bg-gray-900 p-6 shadow-sm"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Upcoming Interviews
//         </h2>

//         <span
//           className="text-xs font-medium px-3 py-1 rounded-full
//                      bg-orange-100 text-orange-700
//                      dark:bg-orange-900/40 dark:text-orange-300"
//         >
//           {interviews.length} scheduled
//         </span>
//       </div>

//       {/* Empty state */}
//       {interviews.length === 0 ? (
//         <div
//           className="flex flex-col items-center justify-center py-10
//                      text-center text-gray-500 dark:text-gray-400"
//         >
//           <p className="text-sm font-medium">No upcoming interviews</p>
//           <p className="text-xs mt-1">
//             You’ll see them here once scheduled
//           </p>
//         </div>
//       ) : (
//         <ul className="space-y-4">
//           {interviews.map((app, index) => (
//             <Link href="/calender"
//               key={index}
//               className="group flex items-center justify-between bg-gray-400/50 dark:bg-gray-800/40
//                          rounded-xl border border-gray-100 dark:border-gray-800
//                          p-4 transition hover:scale-[1.02] duration-200
//                          hover:bg-gray-50 dark:hover:bg-gray-800/40"
//             >
//               {/* Left */}
//               <div>
//                 <p className="font-semibold text-gray-900 dark:text-white">
//                   {app.company}
//                 </p>
//                 <p className="text-sm text-gray-800 dark:text-gray-400">
//                   {app.position}
//                 </p>
//               </div>

//               {/* Right */}
//               <div className="flex flex-col items-end gap-1">
//                 <span
//                   className="text-xs font-medium px-2 py-1 rounded-md
//                              bg-orange-100 text-orange-700
//                              dark:bg-orange-900/40 dark:text-orange-300"
//                 >
//                   Interview
//                 </span>
//                 <span className="text-xs text-gray-800 dark:text-gray-400">
//                   {app.date}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
"use client";

import RecentApp, { RecentAppProps } from "./recentapp";

export default function UpcomingInterviews({
  apps,
  loading = false,
}: {
  apps: RecentAppProps[];
  loading?: boolean;
}) {
  // Limit to 10
  const displayApps = apps.slice(0, 10);

  // If loading, show skeleton
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800
                      bg-white dark:bg-gray-900 p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Interviews
        </h2>
        <RecentApp apps={[]} loading={true} />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800
                    bg-white dark:bg-gray-900 p-6 shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming Interviews
      </h2>

      {displayApps.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No upcoming interviews.</p>
      ) : (
        <RecentApp apps={displayApps} />
      )}
    </div>
  );
}
