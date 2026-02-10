// import { useDroppable } from "@dnd-kit/core";
// import KanbanCard from "./KanbanCard";
// import { Status } from "@/constants/statuses";
// import { SerializedApplication } from "@/lib/serializers/application";

// export default function KanbanColumn({
//   status,
//   applications,
// }: {
//   status: Status;
//   applications: SerializedApplication[];
// }) {
//   const { setNodeRef, isOver } = useDroppable({ id: status });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`
//         rounded-2xl border p-4 min-h-[300px] flex flex-col
//         bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700
//         transition-all duration-150
//         ${isOver ? "ring-4 ring-blue-400 dark:ring-blue-500" : ""}
//       `}
//     >
//       <h3 className="mb-3 font-bold text-sm text-gray-700 dark:text-gray-200">
//         {status} ({applications.length})
//       </h3>

//       <div className="flex flex-col gap-4">
//         {applications.map((app) => (
//           <KanbanCard key={app._id} application={app} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import { Status } from "@/constants/statuses";
import { SerializedApplication } from "@/lib/serializers/application";

export default function KanbanColumn({
  status,
  applications,
}: {
  status: Status;
  applications: SerializedApplication[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-2xl border p-4 min-h-[320px] flex flex-col
        bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700
        transition-all duration-200
        ${isOver ? "ring-4 ring-blue-400 dark:ring-blue-500" : ""}
      `}
    >
      <h3 className="mb-3 font-bold text-sm text-gray-700 dark:text-gray-200">
        {status} ({applications.length})
      </h3>

      <div className="flex flex-col gap-4">
        {applications.map((app) => (
          <KanbanCard key={app._id} application={app} />
        ))}
      </div>
    </div>
  );
}
