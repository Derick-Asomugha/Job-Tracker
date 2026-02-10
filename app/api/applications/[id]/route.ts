import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import { STATUSES } from "@/constants/statuses";
import { Types } from "mongoose";

/**
 * FSM: allowed status transitions
 */
const ALLOWED_TRANSITIONS: Record<
  (typeof STATUSES)[number],
  (typeof STATUSES)[number][]
> = {
  Applied: ["Interview", "Rejected", "Offer"],
  Interview: ["Applied", "Offer", "Rejected"],
  Offer: ["Interview", "Rejected", "Applied"],
  Rejected: ["Applied", "Interview", "Offer"],
};

type Status = (typeof STATUSES)[number];

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const { status: newStatus, interviewAt } = await req.json();

    await connectDB();

    const application = await Application.findOne({
      _id: id,
      userId: new Types.ObjectId(session.user.id),
    });


    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const currentStatus = application.status as Status;
    const now = new Date();

    if (newStatus && newStatus !== currentStatus) {
      if (!STATUSES.includes(newStatus)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }

      if (!ALLOWED_TRANSITIONS[currentStatus].includes(newStatus)) {
        return NextResponse.json(
          { error: `Invalid transition from ${currentStatus} → ${newStatus}` },
          { status: 400 }
        );
      }

      application.status = newStatus;
      application.lastStatusChangeAt = now;
    }

    if (interviewAt) {
      application.interviewAt = new Date(interviewAt);

      if (application.status !== "Interview") {
        application.status = "Interview";
        application.lastStatusChangeAt = now;
      }
    }

if (
  (application.status === "Offer" ||
    application.status === "Rejected") &&
  !application.decisionAt
) {
  application.decisionAt = now;
}

if (application.status === "Rejected") {
  application.deletedAt = new Date(Date.now() + 1 * 60 * 1000);
} else {
  application.deletedAt = null;
}


await application.save();


    return NextResponse.json(application);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
