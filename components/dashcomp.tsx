"use client";

import { useEffect, useState } from "react";
import Review, { Stat } from "./review";
import { FaBriefcase, FaCalendarCheck, FaCheckCircle, FaChartLine } from "react-icons/fa";

interface AnalyticsStats {
  totalApplications: number;
  interviews: number;
  offers: number;
  successRate: number;
}

export default function DashComp() {
  const [statsData, setStatsData] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/analytics/overview", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch analytics stats");

        const data = await res.json();

        setStatsData({
          totalApplications:
            (data.funnel.applied ?? 0) +
            (data.funnel.interview ?? 0) +
            (data.funnel.offer ?? 0) +
            (data.funnel.rejected ?? 0),
          interviews: data.funnel.interview ?? 0,
          offers: data.funnel.offer ?? 0,
          successRate:
            data.funnel.applied && data.funnel.applied > 0
              ? Math.min(Math.round((data.funnel.offer / data.funnel.applied) * 100), 100)
              : 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const stats: Stat[] = statsData
    ? [
        {
          title: "Total Applications",
          value: statsData.totalApplications,
          change: statsData.totalApplications === 0 ? "0%" : "+12%",
          trend: "up",
          icon: <FaBriefcase />,
        },
        {
          title: "Interviews",
          value: statsData.interviews,
          change: statsData.interviews === 0 ? "0%" : "+2%",
          trend: "up",
          icon: <FaCalendarCheck />,
        },
        {
          title: "Offers",
          value: statsData.offers,
          change: statsData.offers === 0 ? "0%" : "+1%",
          trend: "up",
          icon: <FaCheckCircle />,
        },
        {
          title: "Success Rate",
          value: `${statsData.successRate}%`,
          change: statsData.successRate === 0 ? "0%" : "+4%",
          trend: "up",
          icon: <FaChartLine />,
        },
      ]
    : [];

  // ✅ Use Review component for both loading skeleton and stats
  return <Review stats={stats} loading={loading} />;
}
