"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SerializedApplication } from "@/lib/serializers/application";
import { STATUS_COLORS } from "@/constants/statuses";

export default function KanbanCard({
  application,
  overlay = false,
}: {
  application: SerializedApplication;
  overlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const color = STATUS_COLORS[application.status];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        rounded-xl border p-4 shadow-sm cursor-grab active:cursor-grabbing select-none
        transition-all duration-150
        ${color.bg} ${color.text}
        border-gray-200 dark:border-gray-700
        ${isDragging ? "opacity-70 scale-105" : ""}
        ${overlay ? "shadow-2xl scale-105" : ""}
        hover:shadow-lg
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-900">
            {application.role}
          </h4>
        </div>
        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
          {application.company}
        </span>
      </div>

      {application.salaryRange && (
        <p className="text-xs mt-2 font-medium text-gray-700">
          {application.salaryRange}
        </p>
      )}

      <div>
        {application.status === "Interview" && application.interviewDate ? (
          <p className="text-xs mt-1 text-gray-500">
            Interview: {formatDate(application.interviewDate)}
          </p>
        ) : application.appliedAt ? (
          <p className="text-xs mt-1 text-gray-500">
            Applied: {formatDate(application.appliedAt)}
          </p>
        ) : null}
      </div>
    </div>
  );
}
