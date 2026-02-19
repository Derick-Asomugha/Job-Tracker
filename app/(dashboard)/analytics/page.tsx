"use client";

import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

/* ───────── SAFE CHART REGISTRATION ───────── */
if (typeof window !== "undefined") {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
}

interface FunnelData {
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
  appliedToInterviewRate: number | null;
  interviewToOfferRate: number | null;
}

interface TimingData {
  avgTimeToInterview: number | null;
  avgTimeToDecision: number | null;
}

interface StatusDistribution {
  Applied: number;
  Interview: number;
  Offer: number;
  Rejected: number;
}

export default function AnalyticsPage() {
  const [funnel, setFunnel] = useState<FunnelData | null>(null);
  const [timing, setTiming] = useState<TimingData | null>(null);
  const [statusDistribution, setStatusDistribution] =
    useState<StatusDistribution | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics/overview", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch analytics");

        const data = await res.json();
        setFunnel(data.funnel);
        setTiming(data.timing);
        setStatusDistribution(data.statusDistribution);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    }

    fetchAnalytics();
  }, []);

  return (
    <div
      className="
        p-4 sm:p-6 lg:p-10
        min-h-screen
        bg-gradient-to-b from-gray-50 to-gray-100
        dark:from-gray-900 dark:to-gray-800
        text-gray-900 dark:text-gray-100
        overflow-x-hidden
      "
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-600 dark:text-cyan-400 text-center">
        Analytics Dashboard
      </h1>

      {/* ───────── FUNNEL STATS ───────── */}
      {funnel && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <StatCard
            label="Total Applications"
            value={
              (funnel.applied ?? 0) +
              (funnel.interview ?? 0) +
              (funnel.offer ?? 0) +
              (funnel.rejected ?? 0)
            }
            color="bg-blue-100 dark:bg-blue-600"
            textColor="text-blue-700 dark:text-white"
          />
          <StatCard
            label="Interview"
            value={funnel.interview ?? 0}
            color="bg-yellow-100 dark:bg-yellow-500"
            textColor="text-yellow-700 dark:text-white"
          />
          <StatCard
            label="Offer"
            value={funnel.offer ?? 0}
            color="bg-green-100 dark:bg-green-600"
            textColor="text-green-700 dark:text-white"
          />
        </div>
      )}

      {/* ───────── FUNNEL CONVERSION BAR ───────── */}
      {funnel && (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg mb-8 w-full max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-500 dark:text-cyan-300">
            Funnel Conversion Rates
          </h2>

          <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden">
            <Bar
              data={{
                labels: ["Applied → Interview", "Interview → Offer"],
                datasets: [
                  {
                    data: [
                      (funnel.appliedToInterviewRate ?? 0) * 100,
                      (funnel.interviewToOfferRate ?? 0) * 100,
                    ],
                    backgroundColor: [
                      "rgba(59, 130, 246, 0.7)",
                      "rgba(16, 185, 129, 0.7)",
                    ],
                    borderRadius: 6,
                    maxBarThickness: 32,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* ───────── STATUS DISTRIBUTION PIE ───────── */}
      {statusDistribution && (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg mb-8 w-full max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-500 dark:text-cyan-300">
            Status Distribution
          </h2>

          <div className="w-full h-64 sm:h-72 overflow-hidden">
            <Pie
              data={{
                labels: ["Applied", "Interview", "Offer", "Rejected"],
                datasets: [
                  {
                    data: [
                      statusDistribution.Applied ?? 0,
                      statusDistribution.Interview ?? 0,
                      statusDistribution.Offer ?? 0,
                      statusDistribution.Rejected ?? 0,
                    ],
                    backgroundColor: [
                      "rgba(59, 130, 246, 0.7)",
                      "rgba(250, 204, 21, 0.7)",
                      "rgba(16, 185, 129, 0.7)",
                      "rgba(239, 68, 68, 0.7)",
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      )}

      {/* ───────── TIMING STATS ───────── */}
      {timing && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 max-w-3xl mx-auto">
          <StatCard
            label="Avg Time to Interview (days)"
            value={timing.avgTimeToInterview?.toFixed(1) ?? "N/A"}
            color="bg-purple-100 dark:bg-purple-600"
            textColor="text-purple-700 dark:text-white"
          />
          <StatCard
            label="Avg Time to Decision (days)"
            value={timing.avgTimeToDecision?.toFixed(1) ?? "N/A"}
            color="bg-pink-100 dark:bg-pink-600"
            textColor="text-pink-700 dark:text-white"
          />
        </div>
      )}
    </div>
  );
}

/* ───────── STAT CARD ───────── */
function StatCard({
  label,
  value,
  color,
  textColor,
}: {
  label: string;
  value: number | string;
  color: string;
  textColor: string;
}) {
  return (
    <div
      className={`rounded-xl shadow-md p-5 flex flex-col items-center justify-center ${color} ${textColor}`}
    >
      <p className="text-sm font-medium text-center">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

