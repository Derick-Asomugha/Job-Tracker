// app/(dashboard)/pipeline/PipelineClient.tsx
"use client";

import dynamic from "next/dynamic";
import type { SerializedApplication } from "@/lib/serializers/application";

const KanbanBoard = dynamic(
  () => import("@/components/kanban/KanbanBoard"),
  { ssr: false }
);

export default function PipelineClient({
  applications,
}: {
  applications: SerializedApplication[];
}) {
  return <KanbanBoard applications={applications} />;
}
