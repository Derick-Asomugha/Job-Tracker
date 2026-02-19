import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import connectDB from "@/lib/db";
import Application from "@/models/Application";
import { serializeApplication } from "@/lib/serializers/application";
import PipelineClient from "./PipelineClient";

export default async function PipelinePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  await connectDB();

  const rawApplications = await Application.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const applications = rawApplications.map(serializeApplication);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="mb-3 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application Pipeline
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag & drop applications to update their status
          </p>
        </div>

        <Link
          href="/pipeline/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          <FaPlus />
          Add Application
        </Link>
      </div>

      {/* Kanban Board */}
      <PipelineClient applications={applications} />
    </div>
  );
}
