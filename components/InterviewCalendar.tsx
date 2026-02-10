"use client";

import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import InterviewDateModal from "./InterviewDateModal";
import "@/app/styles/calendar.css";


interface Application {
  _id: string;
  company: string;
  role: string;
  status: string;
  interviewAt?: string;
}

export default function InterviewCalendar({
  interviews,
}: {
  interviews: Application[];
}) {
  const [modalAppId, setModalAppId] = useState<string | null>(null);
  const [currentInterviewAt, setCurrentInterviewAt] = useState<string | undefined>();
  const calendarRef = useRef<FullCalendar>(null);
  const app = interviews.find((a) => a._id === modalAppId);
  const currentStatus = app?.status || "Applied";
  const [interviewsState, setInterviewsState] = useState<Application[]>(interviews);
  
const events = interviewsState
  .filter((app) => app.interviewAt && app.status === "Interview")
  .map((app) => ({
    id: app._id,
    title: `${app.company} — ${app.role}`,
    start: app.interviewAt!,
    allDay: false,
    extendedProps: {
      company: app.company,
      role: app.role,
      status: app.status,
      interviewAt: app.interviewAt,
    },
  }));



  // Drag & drop handler
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleEventDrop(info: any) {
  const newDate = info.event.start;
  if (!newDate) return;

  const newInterviewAt = newDate.toISOString();

  const res = await fetch(`/api/applications/${info.event.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      interviewAt: newInterviewAt, // ✅ correct key
    }),
  });

  if (!res.ok) {
    alert("Failed to update interview date");
    info.revert();
    return;
  }

  setInterviewsState((prev) =>
    prev.map((app) =>
      app._id === info.event.id
        ? { ...app, interviewAt: newInterviewAt }
        : app
    )
  );
  alert("updated interview date successfully");
}



  

  // Click handler → open modal
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
 function handleEventClick(info: string | any) {
  setModalAppId(info.event.id);
  setCurrentInterviewAt(info.event.start?.toISOString());
  
}



  function handleModalClose() {
    setModalAppId(null);
    setCurrentInterviewAt(undefined);
  }

  function handleInterviewSaved(newInterviewAt: string) {
  if (!modalAppId) return;

  setInterviewsState((prev) =>
    prev.map((app) =>
      app._id === modalAppId
        ? { ...app, interviewAt: newInterviewAt, status: "Interview" }
        : app
    )
  );

  setModalAppId(null);
  setCurrentInterviewAt(undefined);
}

const tooltipRef = useRef<HTMLDivElement | null>(null);
//eslint-disable-next-line @typescript-eslint/no-explicit-any
function showTooltip(info: any) {
  const tooltip = tooltipRef.current;
  if (!tooltip) return;

  const { company, role, status, interviewAt } = info.event.extendedProps;

  tooltip.innerHTML = `
    <div class="tooltip-title">${company}</div>
    <div class="tooltip-role">${role}</div>
    <div class="tooltip-meta">
      <span>Status: ${status}</span><br/>
      <span>${new Date(interviewAt).toLocaleString()}</span>
    </div>
  `;

  tooltip.style.display = "block";
}

function moveTooltip(e: MouseEvent) {
  const tooltip = tooltipRef.current;
  if (!tooltip) return;

  tooltip.style.left = e.pageX + 12 + "px";
  tooltip.style.top = e.pageY + 12 + "px";
}

function hideTooltip() {
  const tooltip = tooltipRef.current;
  if (!tooltip) return;

  tooltip.style.display = "none";
}



  return (
  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 relative">
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable
      selectable
      eventDrop={handleEventDrop}
      eventClick={handleEventClick}
      eventMouseEnter={(info) => {
        showTooltip(info);
        document.addEventListener("mousemove", moveTooltip);
      }}
      eventMouseLeave={() => {
        hideTooltip();
        document.removeEventListener("mousemove", moveTooltip);
      }}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek",
      }}
      height="auto"
    />

    {/* ✅ TOOLTIP LIVES HERE */}
    <div
      ref={tooltipRef}
      className="calendar-tooltip"
      aria-hidden
    />

    {modalAppId && (
      <InterviewDateModal
        applicationId={modalAppId}
        currentStatus={currentStatus}
        currentInterviewAt={currentInterviewAt}
        onCloseAction={handleModalClose}
        onSavedAction={handleInterviewSaved}
      />
    )}
  </div>
);
}
