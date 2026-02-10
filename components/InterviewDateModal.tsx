
// "use client";

// import { useState, useEffect } from "react";

// interface InterviewDateModalProps {
//   applicationId: string;
//   currentInterviewAt?: string; // existing interview date
//   currentStatus: string;       // not used in logic yet, but can be displayed if needed
//   onCloseAction: () => void;
//   onSavedAction: (newInterviewAt: string) => void; // pass new date to parent
// }

// export default function InterviewDateModal({
//   applicationId,
//   currentInterviewAt,
//   onCloseAction,
//   onSavedAction,
// }: InterviewDateModalProps) {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Pre-fill if there's an existing interview date
//   useEffect(() => {
//     if (currentInterviewAt) {
//       const dt = new Date(currentInterviewAt);
//       setDate(dt.toISOString().slice(0, 10)); // YYYY-MM-DD
//       setTime(dt.toISOString().slice(11, 16)); // HH:MM
//     }
//   }, [currentInterviewAt]);

//   async function saveInterview() {
//     if (!date || !time) return;

//     setLoading(true);

//     const interviewAt = new Date(`${date}T${time}`).toISOString();

//     try {
//       const body: { interviewAt: string; status?: string } = { interviewAt };

//       // Only set status if scheduling first time
//       if (!currentInterviewAt) body.status = "Interview";

//       const res = await fetch(`/api/applications/${applicationId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || "Failed to save interview");
//       }

//       // ✅ Pass new date to parent so state updates
//       onSavedAction(interviewAt);

//       onCloseAction();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save interview. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Schedule Interview</h2>

//         <div className="space-y-4">
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onCloseAction}
//             className="px-4 py-2 rounded border"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={saveInterview}
//             disabled={loading}
//             className="px-4 py-2 rounded bg-cyan-600 text-white"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";

interface InterviewDateModalProps {
  applicationId: string;
  currentInterviewAt?: string;
  currentStatus: string;
  onCloseAction: () => void;
  onSavedAction: (newInterviewAt: string) => void;
}

export default function InterviewDateModal({
  applicationId,
  currentInterviewAt,
  onCloseAction,
  onSavedAction,
}: InterviewDateModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentInterviewAt) {
      const dt = new Date(currentInterviewAt);
      setDate(dt.toISOString().slice(0, 10));
      setTime(dt.toISOString().slice(11, 16));
    }
  }, [currentInterviewAt]);

  async function saveInterview() {
    if (!date || !time) return;

    setLoading(true);
    const interviewAt = new Date(`${date}T${time}`).toISOString();

    try {
      const body: { interviewAt: string; status?: string } = { interviewAt };
      if (!currentInterviewAt) body.status = "Interview";

      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await res.text());

      onSavedAction(interviewAt);
      onCloseAction();
    } catch (err) {
      console.error(err);
      alert("Failed to save interview. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Schedule Interview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pick a date and time for the interview
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 px-3 py-2
                         text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-800 px-3 py-2
                         text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onCloseAction}
            className="rounded-lg px-4 py-2 text-sm
                       border border-gray-300 dark:border-gray-700
                       text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       transition"
          >
            Cancel
          </button>

          <button
            onClick={saveInterview}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white
                       bg-cyan-600 hover:bg-cyan-700
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
