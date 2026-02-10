// lib/serializers/application.ts
import { Status } from "@/constants/statuses";

export interface SerializedApplication {
  _id: string;
  company: string;
  position: string;
  status: Status;
  date: string;
  interviewDate?: string;
  appliedAt?: string;
  location?: string;
  salaryRange?: string;
  role?: string;
}
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeApplication(app: any): SerializedApplication {
  return {
    _id: app._id.toString(),
    company: app.company,
    position: app.position,
    status: app.status,
    date: app.createdAt.toISOString().split("T")[0],
    interviewDate: app.interviewDate,
    appliedAt: app.appliedAt,
    location: app.location,
    salaryRange: app.salaryRange,
    role: app.role,
  };
}
