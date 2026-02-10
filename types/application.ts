export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface Application {
  _id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string;
}
