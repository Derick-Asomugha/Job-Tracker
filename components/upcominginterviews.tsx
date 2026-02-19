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
