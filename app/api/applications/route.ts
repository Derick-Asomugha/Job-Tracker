import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Application from "@/models/Application";

/* ───────────────────────── GET ───────────────────────── */
/* Fetch ONLY applications belonging to the logged-in user */
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const applications = await Application.find({
      userId: session.user.id,
    }).sort({ appliedAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("GET /api/applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ───────────────────────── POST ───────────────────────── */
/* Create application for the logged-in user only */
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await connectDB();

    const application = await Application.create({
      userId: session.user.id, // 🔐 critical
      company: body.company,
      role: body.role,
      appliedAt: new Date(body.appliedAt),
      jobLink: body.jobLink,
      location: body.location,
      salaryRange: body.salaryRange,
      notes: body.notes,
      status: "Applied",
      createdAt: new Date(),
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
