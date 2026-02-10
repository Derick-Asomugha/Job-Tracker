
"use client";
import React from "react";

export type Stat = {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
};

function StatCard({ title, value, change, trend, icon }: Stat) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-6
                  bg-white/70 dark:bg-gray-900/70
                  backdrop-blur-md border border-black/10 dark:border-white/20
                  shadow-lg hover:scale-[1.03] transition-transform duration-300
                  text-gray-900 dark:text-white`}
    >
      <div className="absolute top-0 left-0 w-full h-full
                      bg-gradient-to-br from-black/10 via-black/5 to-black/10
                      dark:from-white/10 dark:via-white/5 dark:to-white/10
                      blur-3xl opacity-30 pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-wide">{title}</p>
        <div className="text-2xl sm:text-3xl">{icon}</div>
      </div>

      <p className="relative z-10 mt-3 sm:mt-5 text-2xl sm:text-4xl font-bold tracking-tight">
        {value}
      </p>

      <p
        className={`relative z-10 mt-1 sm:mt-2 text-xs sm:text-sm font-semibold ${
          trend === "up"
            ? "text-green-500 dark:text-green-500"
            : "text-red-500 dark:text-red-500"
        }`}
      >
        {change} vs last month
      </p>

      <div className="relative z-10 mt-3 sm:mt-5 h-1 w-2/3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
    </div>
  );
}

// Skeleton Card for loading state
// Skeleton Card for loading state
function StatCardSkeleton() {
  return (
    <div className="animate-pulse relative overflow-hidden rounded-2xl p-4 sm:p-6
                    bg-white/50 dark:bg-gray-800/60 backdrop-blur-md
                    border border-black/10 dark:border-white/20 shadow-lg h-44 sm:h-52">
      
      {/* Animated blocks */}
      <div className="h-5 w-24 sm:h-6 sm:w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3 sm:mb-4"></div>
      <div className="h-8 w-20 sm:h-10 sm:w-24 bg-gray-300 dark:bg-gray-600 rounded mb-1 sm:mb-2"></div>
      <div className="h-3 w-14 sm:h-4 sm:w-16 bg-gray-300 dark:bg-gray-600 rounded mb-3 sm:mb-4"></div>
      <div className="h-1 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
      
      {/* Optional subtle gradient overlay for dark mode */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br 
                      from-transparent via-white/5 to-transparent dark:via-black/20
                      rounded-2xl pointer-events-none"></div>
    </div>
  );
}


export default function Review({
  stats,
  loading = false,
}: {
  stats: Stat[];
  loading?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 p-4">
      {loading
        ? [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
        : stats.map((stat, i) => <StatCard key={i} {...stat} />)}
    </div>
  );
}

