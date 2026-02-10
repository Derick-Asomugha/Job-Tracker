"use client";

import { useState } from "react";
import InterviewDateModal from "./InterviewDateModal";

export default function StatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [openModal, setOpenModal] = useState(false);

  async function handleChange(newStatus: string) {
    if (newStatus === "Interview") {
      setOpenModal(true);
      return;
    }

    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setStatus(newStatus);
    } catch (err) {
      console.error(err);
      alert("Failed to update status. Try again.");
    }
  }

  function handleSaved() {
    setStatus("Interview");
  }

  return (
    <>
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      {openModal && (
        <InterviewDateModal
          applicationId={applicationId}
          onCloseAction={() => setOpenModal(false)}
          onSavedAction={handleSaved}
        />
      )}
    </>
  );
}
