
// "use client";

// export interface RecentAppProps {
//   company: string;
//   position: string;
//   status: "Applied" | "Interview" | "Offered" | "Rejected";
//   date: string;
//   salary: string;
//   interviewDate?: string;
// }

// export default function RecentApp({ apps }: { apps: RecentAppProps[] }) {
//   return (
//     <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow">
//       <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//         Recent Applications
//       </h2>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
//               <th className="py-3">Company</th>
//               <th className="py-3">Position</th>
//               <th className="py-3">Status</th>
//               <th className="py-3">Date</th>
//               <th className="py-3">Salary</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//             {apps.map((app, index) => (
//               <tr
//                 key={index}
//                 className="text-sm text-gray-800 dark:text-gray-200"
//               >
//                 <td className="py-4 font-medium">{app.company}</td>
//                 <td className="py-4">{app.position}</td>
//                 <td className="py-4">{renderStatus(app.status)}</td>

//                 <td className="py-4">
//                   {app.status === "Interview"
//                     ? formatDate(app.interviewDate)
//                     : app.date}
//                 </td>

//                 <td className="py-4 font-semibold">{app.salary}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="space-y-4 md:hidden">
//         {apps.map((app, index) => (
//           <div
//             key={index}
//             className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/40"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <p className="font-semibold text-gray-900 dark:text-white">
//                 {app.company}
//               </p>
//               {renderStatus(app.status)}
//             </div>

//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               {app.position}
//             </p>

//             <div className="mt-3 flex justify-between text-sm">
//               <span className="text-gray-500 dark:text-gray-400">
//                 {app.status === "Interview"
//                   ? formatDate(app.interviewDate)
//                   : app.date}
//               </span>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 {app.salary}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ===================== Helpers ===================== */

// function renderStatus(status: RecentAppProps["status"]) {
//   const base =
//     "px-3 py-1 rounded-full text-xs font-semibold inline-block";

//   const styles: Record<RecentAppProps["status"], string> = {
//     Applied:
//       "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
//     Interview:
//       "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
//     Offered:
//       "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
//     Rejected:
//       "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
//   };

//   return <span className={`${base} ${styles[status]}`}>{status}</span>;
// }

// function formatDate(date?: string) {
//   if (!date) return "—";
//   const d = new Date(date);
//   return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
// }

"use client";

import React from "react";
import Link from "next/link";

export interface RecentAppProps {
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offered" | "Rejected";
  date: string;
  salary: string;
  interviewDate?: string;
}

export default function RecentApp({
  apps,
  loading = false,
}: {
  apps: RecentAppProps[];
  loading?: boolean;
}) {
  const displayApps = apps.slice(0, 10); // limit to 10

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Applications
        </h2>

        {/* Desktop Table Skeleton */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                {["Company", "Position", "Status", "Date", "Salary"].map(
                  (_, idx) => (
                    <th
                      key={idx}
                      className="py-3 h-6 relative"
                    >
                      <div className="absolute top-0 left-0 h-6 w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="h-12">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="py-4 relative">
                      <div className="absolute top-2 left-0 h-4 w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="space-y-4 md:hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/40 animate-pulse h-28 relative overflow-hidden"
            >
              <div className="absolute top-3 left-0 h-4 w-2/3 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
              <div className="absolute top-10 left-0 h-3 w-1/2 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
              <div className="absolute bottom-3 left-0 h-3 w-1/3 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Applications
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="py-3">Company</th>
              <th className="py-3">Position</th>
              <th className="py-3">Status</th>
              <th className="py-3">Date</th>
              <th className="py-3">Salary</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {displayApps.map((app, index) => (
              <tr
                key={index}
                className="text-sm text-gray-800 dark:text-gray-200"
              >
                <td className="py-4 font-medium">{app.company}</td>
                <td className="py-4">{app.position}</td>
                <td className="py-4">{renderStatus(app.status)}</td>
                <td className="py-4">
                  {app.status === "Interview"
                    ? formatDate(app.interviewDate)
                    : app.date}
                </td>
                <td className="py-4 font-semibold">{app.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {displayApps.map((app, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/40"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900 dark:text-white">
                {app.company}
              </p>
              {renderStatus(app.status)}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {app.position}
            </p>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {app.status === "Interview"
                  ? formatDate(app.interviewDate)
                  : app.date}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {app.salary}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View More Link */}
      {apps.length > 10 && (
        <div className="mt-4 text-right">
          <Link
            href="/pipeline"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
}

/* ===================== Helpers ===================== */

function renderStatus(status: RecentAppProps["status"]) {
  const base =
    "px-3 py-1 rounded-full text-xs font-semibold inline-block";

  const styles: Record<RecentAppProps["status"], string> = {
    Applied:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Interview:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    Offered:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Rejected:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
}

function formatDate(date?: string) {
  if (!date) return "—";
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
