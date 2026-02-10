export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const;
export type Status = "Applied" | "Interview" | "Offer" | "Rejected";

// Add colors for visual cues
export const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  Applied: { bg: "bg-yellow-100 dark:bg-yellow-800", text: "text-yellow-800 dark:text-yellow-200" },
  Interview: { bg: "bg-blue-100 dark:bg-blue-800", text: "text-blue-800 dark:text-blue-200" },
  Offer: { bg: "bg-green-100 dark:bg-green-800", text: "text-green-800 dark:text-green-200" },
  Rejected: { bg: "bg-red-100 dark:bg-red-800", text: "text-red-800 dark:text-red-200" },
};
