// app/api/analytics/overview/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    // Fetch all applications for current user
    const applications = await Application.find({ userId: session.user.id });

    // ─── Funnel counts ───
    const applied = applications.filter(a => a.status === "Applied").length;
    const interview = applications.filter(a => a.status === "Interview").length;
    const offer = applications.filter(a => a.status === "Offer").length;
    const rejected = applications.filter(a => a.status === "Rejected").length;

    const appliedToInterviewRate = applied ? interview / applied : 0;
    const interviewToOfferRate = interview ? offer / interview : 0;

    // ─── Timing calculations ───
    const timeToInterviewArr = applications
      .filter(a => a.interviewAt)
      .map(a => (a.interviewAt!.getTime() - a.appliedAt.getTime()) / (1000 * 60 * 60 * 24));

    const timeToDecisionArr = applications
      .filter(a => a.decisionAt)
      .map(a => (a.decisionAt!.getTime() - a.appliedAt.getTime()) / (1000 * 60 * 60 * 24));

   // Assuming each element is a Date object or a timestamp in ms
const avgTimeToInterview =
  timeToInterviewArr.length > 0
    ? timeToInterviewArr.reduce((sum, date) => sum + (new Date(date).getTime() || 0), 0) /
      timeToInterviewArr.length / (1000 * 60 * 60 * 24) // convert ms → days
    : 0;


     const avgTimeToDecision =
      timeToDecisionArr.length > 0
      ? timeToDecisionArr.reduce((sum, date) => sum + (new Date(date).getTime() || 0), 0) /
       timeToDecisionArr.length / (1000 * 60 * 60 * 24) // convert ms → days
    : 0;
    // ─── Status distribution for pie chart ───
    const statusDistribution = { Applied: applied, Interview: interview, Offer: offer, Rejected: rejected };

    return NextResponse.json({
      funnel: { applied, interview, offer, rejected, appliedToInterviewRate, interviewToOfferRate },
      timing: { avgTimeToInterview, avgTimeToDecision },
      statusDistribution,
    });
  } catch (err) {
    console.error("Analytics Overview API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
