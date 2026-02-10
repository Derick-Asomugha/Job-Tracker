// "use client";

// import {
//   DndContext,
//   PointerSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   DragOverlay,
// } from "@dnd-kit/core";
// import { useState } from "react";
// import { STATUSES, Status } from "@/constants/statuses";
// import KanbanColumn from "./KanbanColumn";
// import KanbanCard from "./KanbanCard";
// import InterviewDateModal from "../InterviewDateModal";
// import type { SerializedApplication } from "@/lib/serializers/application";

// export default function KanbanBoard({
//   applications,
// }: {
//   applications: SerializedApplication[];
// }) {
//   const [items, setItems] = useState(applications);
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [modalAppId, setModalAppId] = useState<string | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
//     useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
//   );

//   async function handleDragEnd({ active, over }: DragEndEvent) {
//     setActiveId(null);
//     if (!over) return;

//     const appId = active.id as string;
//     const rawStatus =
//       (over.data.current?.sortable?.containerId ?? over.id) as string;

//     if (!STATUSES.includes(rawStatus as Status)) return;
//     const newStatus = rawStatus as Status;

//     const app = items.find((a) => a._id === appId);
//     if (!app || app.status === newStatus) return;

//     /** Dragging INTO Interview → open modal */
//     if (newStatus === "Interview") {
//       setModalAppId(appId);
//       return;
//     }

//     /** Dragging OUT of Interview → clear interviewAt */
//     const previous = items;

//     const updatedApp: SerializedApplication = {
//       ...app,
//       status: newStatus,
//       interviewDate:
//         app.status === "Interview" ? undefined : app.interviewDate,
//     };

//     setItems((prev) =>
//       prev.map((a) => (a._id === appId ? updatedApp : a))
//     );

//     try {
//       await fetch(`/api/applications/${appId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           status: newStatus,
//           ...(app.status === "Interview"
//             ? { interviewAt: null }
//             : {}),
//         }),
//       });
//     } catch {
//       setItems(previous);
//     }
//   }

//   /** Modal save handler */
//   function handleInterviewSaved(interviewAt: string) {
//     if (!modalAppId) return;

//     setItems((prev) =>
//       prev.map((a) =>
//         a._id === modalAppId
//           ? { ...a, status: "Interview", interviewAt }
//           : a
//       )
//     );

//     setModalAppId(null);
//   }

//   function handleModalClose() {
//     setModalAppId(null);
//   }

//   const activeApplication = items.find((a) => a._id === activeId);
//   const modalApp = items.find((a) => a._id === modalAppId);

//   return (
//     <>
//       <DndContext
//         sensors={sensors}
//         onDragStart={(e) => setActiveId(e.active.id as string)}
//         onDragEnd={handleDragEnd}
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
//           {STATUSES.map((status) => (
//             <KanbanColumn
//               key={status}
//               status={status}
//               applications={items.filter((a) => a.status === status)}
//             />
//           ))}
//         </div>

//         <DragOverlay>
//           {activeApplication && (
//             <KanbanCard application={activeApplication} overlay />
//           )}
//         </DragOverlay>
//       </DndContext>

//       {modalApp && (
//         <InterviewDateModal
//           applicationId={modalApp._id}
//           currentStatus={modalApp.status}
//           currentInterviewAt={modalApp.interviewDate}
//           onCloseAction={handleModalClose}
//           onSavedAction={handleInterviewSaved}
//         />
//       )}
//     </>
//   );
// }

"use client";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import { STATUSES, Status } from "@/constants/statuses";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import InterviewDateModal from "../InterviewDateModal";
import type { SerializedApplication } from "@/lib/serializers/application";

export default function KanbanBoard({
  applications,
}: {
  applications: SerializedApplication[];
}) {
  const [items, setItems] = useState(applications);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalAppId, setModalAppId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  );

  async function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;

    const appId = active.id as string;
    const rawStatus =
      (over.data.current?.sortable?.containerId ?? over.id) as string;

    if (!STATUSES.includes(rawStatus as Status)) return;
    const newStatus = rawStatus as Status;

    const app = items.find((a) => a._id === appId);
    if (!app || app.status === newStatus) return;

    /** Dragging INTO Interview → open modal */
    if (newStatus === "Interview") {
      setModalAppId(appId);
      return;
    }

    /** Dragging OUT of Interview → clear interviewAt */
    const previous = items;
    const updatedApp: SerializedApplication = {
      ...app,
      status: newStatus,
      interviewDate:
        app.status === "Interview" ? undefined : app.interviewDate,
    };

    setItems((prev) =>
      prev.map((a) => (a._id === appId ? updatedApp : a))
    );

    try {
      await fetch(`/api/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          ...(app.status === "Interview" ? { interviewAt: null } : {}),
        }),
      });
    } catch {
      setItems(previous);
    }
  }

  /** Modal save handler */
  function handleInterviewSaved(interviewAt: string) {
    if (!modalAppId) return;

    setItems((prev) =>
      prev.map((a) =>
        a._id === modalAppId
          ? { ...a, status: "Interview", interviewAt }
          : a
      )
    );

    setModalAppId(null);
  }

  function handleModalClose() {
    setModalAppId(null);
  }

  const activeApplication = items.find((a) => a._id === activeId);
  const modalApp = items.find((a) => a._id === modalAppId);

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              applications={items.filter((a) => a.status === status)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeApplication && (
            <KanbanCard application={activeApplication} overlay />
          )}
        </DragOverlay>
      </DndContext>

      {modalApp && (
        <InterviewDateModal
          applicationId={modalApp._id}
          currentStatus={modalApp.status}
          currentInterviewAt={modalApp.interviewDate}
          onCloseAction={handleModalClose}
          onSavedAction={handleInterviewSaved}
        />
      )}
    </>
  );
}
