"use client";

import { useEffect, useState } from "react";
import InterviewCalendar from "@/components/InterviewCalendar";

export default function CalendarPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApplications(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div className="p-4">Loading calendar…</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Calendar</h1>
      <InterviewCalendar interviews={applications} />
    </div>
  );
}
