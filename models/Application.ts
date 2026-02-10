import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Strict state machine for Kanban + automation
 */
export const APPLICATION_STATUSES = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export interface IApplication extends Document {
  userId: Types.ObjectId;

  company: string;
  role: string;

  status: ApplicationStatus;

  appliedAt: Date;
  interviewAt?: Date;
  decisionAt?: Date;

  jobLink?: string;
  location?: string;
  salaryRange?: string;
  notes?: string;

  lastStatusChangeAt: Date;

  deletedAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    // 🔑 Ownership
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🏢 Core job identity
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    // 🧠 State machine
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "Applied",
      index: true,
    },

    // ⏱ Hiring timeline
    appliedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    interviewAt: Date,
    decisionAt: Date,

    // 📎 Context
    jobLink: String,
    location: String,
    salaryRange: String,
    notes: String,

    // 🔥 Automation & analytics anchor
    lastStatusChangeAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // 🧹 Auto-delete rejected apps (TTL)
    deletedAt: {
      type: Date,
      default: null,
      index: {
        expires: 0, // TTL index (Mongo deletes when date < now)
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Index optimized for Kanban dashboards
 */
ApplicationSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
