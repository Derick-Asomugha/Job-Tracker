"use client";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  closestCorners,
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
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  function getStatus(appId: string): Status | undefined {
    return items.find((a) => a._id === appId)?.status;
  }

  async function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeStatus = getStatus(activeId);
    const newStatus = STATUSES.includes(overId as Status)
      ? (overId as Status)
      : getStatus(overId);

    if (!activeStatus || !newStatus) return;
    if (activeStatus === newStatus) return;

    if (newStatus === "Interview") {
      setModalAppId(activeId);
      return;
    }

    const previous = items;

    setItems((prev) =>
      prev.map((item) =>
        item._id === activeId
          ? {
              ...item,
              status: newStatus,
              interviewDate:
                activeStatus === "Interview" ? undefined : item.interviewDate,
            }
          : item
      )
    );

    try {
      await fetch(`/api/applications/${activeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          ...(activeStatus === "Interview" ? { interviewAt: null } : {}),
        }),
      });
    } catch {
      setItems(previous);
    }
  }

  function handleInterviewSaved(interviewAt: string) {
    if (!modalAppId) return;

    setItems((prev) =>
      prev.map((a) =>
        a._id === modalAppId
          ? { ...a, status: "Interview", interviewDate: interviewAt }
          : a
      )
    );

    setModalAppId(null);
  }

  const activeApplication = items.find((a) => a._id === activeId);
  const modalApp = items.find((a) => a._id === modalAppId);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
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
          currentInterviewAt={modalApp.interviewDate}
          onCloseAction={() => setModalAppId(null)}
          onSavedAction={handleInterviewSaved}
        />
      )}
    </>
  );
}
