"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS_COLORS } from "@/constants/statuses";

export default function NewApplicationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
     appliedAt: new Date().toISOString(),
    interviewAt: "",
    jobLink: "",
    location: "",
    salaryRange: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/pipeline");
    } else {
      alert("Failed to create application");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Add New Job Application
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-md"
      >
        {/* Company */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            required
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            name="role"
            placeholder="Job Title / Role"
            value={form.role}
            required
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            {Object.keys(STATUS_COLORS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        

        {/* Interview Date */}
        {form.status === "Interview" && (
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
              Interview Date
            </label>
            <input
              type="date"
              name="interviewAt"
              value={form.interviewAt}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        )}

        {/* Job Link */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Job Link
          </label>
          <input
            name="jobLink"
            placeholder="Job URL (optional)"
            value={form.jobLink}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Location
          </label>
          <input
            name="location"
            placeholder="City / Remote"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Salary Range */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Salary Range
          </label>
          <input
            name="salaryRange"
            placeholder="e.g. $50,000 - $70,000"
            value={form.salaryRange}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Notes */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Additional notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
        >
          Add Application
        </button>
      </form>
    </div>
  );
}
