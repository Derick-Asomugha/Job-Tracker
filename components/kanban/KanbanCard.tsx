
// import { useDraggable } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import { SerializedApplication } from "@/lib/serializers/application";
// import { STATUS_COLORS } from "@/constants/statuses";

// export default function KanbanCard({
//   application,
//   overlay = false,
// }: {
//   application: SerializedApplication;
//   overlay?: boolean;
// }) {
//   const { setNodeRef, listeners, attributes, transform, isDragging } =
//     useDraggable({ id: application._id });

//   const style = {
//     transform: CSS.Translate.toString(transform),
//   };

//   const color = STATUS_COLORS[application.status];

//   const formatDate = (dateStr?: string) => {
//     if (!dateStr) return "—";
//     const d = new Date(dateStr);
//     return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className={`rounded-xl border p-4 shadow-sm cursor-grab active:cursor-grabbing select-none touch-none transition-all duration-150
//         ${color.bg} ${color.text} border-gray-200 dark:border-gray-700
//         ${isDragging ? "opacity-60" : "opacity-100"}
//         ${overlay ? "shadow-2xl scale-105" : ""} hover:shadow-md`}
//     >
//       <div className="flex justify-between items-start gap-2">
//         <div>
//           <h4 className="font-bold text-sm">{application.role}</h4>
//           <p className="text-xs mt-1">{application.company}</p>
//         </div>
//         <span className="text-xs font-medium whitespace-nowrap">
//           {application.status}
//         </span>
//       </div>

//       {application.salaryRange && (
//         <p className="text-xs mt-2 font-medium">Salary: {application.salaryRange}</p>
//       )}

//       {application.location && (
//         <p className="text-xs mt-1">Location: {application.location}</p>
//       )}

//       <div>
//         {application.status === "Interview" && application.interviewDate ? (
//           <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
//             Interview: {formatDate(application.interviewDate)}
//           </p>
//         ) : application.appliedAt ? (
//           <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
//             Applied: {formatDate(application.appliedAt)}
//           </p>
//         ) : null}
//       </div>
//     </div>
//   );
// }
"use client";

import { useDraggable } from "@dnd-kit/core";
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
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({ id: application._id });

  const style = {
    transform: CSS.Translate.toString(transform),
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
      {...listeners}
      {...attributes}
      className={`
        rounded-xl border p-4 shadow-sm cursor-grab active:cursor-grabbing select-none
        transition-all duration-150 transform
        ${color.bg} ${color.text}
        border-gray-200 dark:border-gray-700
        ${isDragging ? "opacity-70 scale-105" : "opacity-100"}
        ${overlay ? "shadow-2xl scale-105" : ""}
        hover:shadow-lg
      `}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-semibold text-sm text-gray-900 ">
            {application.role}
          </h4>
          <p className="text-xs mt-1 text-gray-600 ">
            {application.company}
          </p>
        </div>
        <span className="text-xs font-medium whitespace-nowrap">
          {application.status}
        </span>
      </div>

      {application.salaryRange && (
        <p className="text-xs mt-2 font-medium text-gray-700 ">
          Salary: {application.salaryRange}
        </p>
      )}

      <div>
        {application.status === "Interview" && application.interviewDate ? (
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
            Interview: {formatDate(application.interviewDate)}
          </p>
        ) : application.appliedAt ? (
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
            Applied: {formatDate(application.appliedAt)}
          </p>
        ) : null}
      </div>
    </div>
  );
}
