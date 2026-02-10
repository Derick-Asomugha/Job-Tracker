// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import connectDB from "@/lib/db";
// import Application from "@/models/Application";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await auth.api.getSession({ headers: req.headers });
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { interviewAt } = await req.json();
//   if (!interviewAt) {
//     return NextResponse.json({ error: "Missing interview date" }, { status: 400 });
//   }

//   await connectDB();

//   const application = await Application.findOneAndUpdate(
//     { _id: params.id, userId: session.user.id },
//     { interviewAt: new Date(interviewAt) },
//     { new: true }
//   );

//   return NextResponse.json(application);
// }
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Application from "@/models/Application";

export async function PATCH(
  req: NextRequest, // ✅ must be NextRequest
  { params }: { params: { id: string } } // ✅ exactly { id: string }
) {
  // Get session
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get body
  const { interviewAt } = await req.json();
  if (!interviewAt) {
    return NextResponse.json(
      { error: "Missing interview date" },
      { status: 400 }
    );
  }

  // Connect to DB
  await connectDB();

  // Update application
  const application = await Application.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    { interviewAt: new Date(interviewAt) },
    { new: true }
  );

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  return NextResponse.json(application);
}
