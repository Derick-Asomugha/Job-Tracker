// "use client";

// import { useEffect, useState } from "react";
// import RecentApp, { RecentAppProps } from "./recentapp";
// import UpcomingInterviews from "./upcominginterviews";

// export default function DashBody() {
//   const [apps, setApps] = useState<RecentAppProps[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchApplications() {
//       try {
//         const res = await fetch("/api/applications", { cache: "no-store" });
//         if (!res.ok) throw new Error("Failed to fetch applications");

//         const data = await res.json();

//         // Map backend data to RecentAppProps
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const mappedApps: RecentAppProps[] = data.map((app: any) => {
//   let status: RecentAppProps["status"];
//   switch (app.status) {
//     case "Applied":
//       status = "Applied";
//       break;
//     case "Interview":
//       status = "Interview";
//       break;
//     case "Offer":
//     case "Offered":
//       status = "Offered";
//       break;
//     case "Rejected":
//       status = "Rejected";
//       break;
//     default:
//       status = "Applied";
//   }

//   return {
//     company: app.company,
//     position: app.role,
//     status,
//     date: new Date(app.appliedAt).toLocaleDateString(),
//     interviewDate: app.interviewAt, // ✅ FIXED
//     salary: app.salaryRange || "N/A",
//   };
// });


//         setApps(mappedApps);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     }

//     fetchApplications();
//   }, []);

//   if (loading)
//     return (
//       <p className="text-center py-6 text-gray-700 dark:text-gray-300">
//         Loading applications...
//       </p>
//     );

//   // Filter upcoming interviews
//   const upcomingInterviews = apps.filter((app) => app.status === "Interview");

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 justify-center px-6 py-3 max-w-7xl mx-auto">
//       <div className="flex-1">
//         <RecentApp apps={apps} />
//       </div>

//       <div className="flex-1">
//         <UpcomingInterviews apps={upcomingInterviews} />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import RecentApp, { RecentAppProps } from "./recentapp";
import UpcomingInterviews from "./upcominginterviews";

export default function DashBody() {
  const [apps, setApps] = useState<RecentAppProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();

        // Map backend data to RecentAppProps
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedApps: RecentAppProps[] = data.map((app: any) => {
          let status: RecentAppProps["status"];
          switch (app.status) {
            case "Applied":
              status = "Applied";
              break;
            case "Interview":
              status = "Interview";
              break;
            case "Offer":
            case "Offered":
              status = "Offered";
              break;
            case "Rejected":
              status = "Rejected";
              break;
            default:
              status = "Applied";
          }

          return {
            company: app.company,
            position: app.role,
            status,
            date: new Date(app.appliedAt).toLocaleDateString(),
            interviewDate: app.interviewAt,
            salary: app.salaryRange || "N/A",
          };
        });

        setApps(mappedApps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // Filter upcoming interviews
  const upcomingInterviews = apps.filter((app) => app.status === "Interview");

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center px-6 py-3 max-w-7xl mx-auto">
      <div className="flex-1">
        {/* Pass loading prop instead of overriding */}
        <RecentApp apps={apps} loading={loading} />
      </div>

      <div className="flex-1">
        <UpcomingInterviews apps={upcomingInterviews} loading={loading} />
      </div>
    </div>
  );
}
