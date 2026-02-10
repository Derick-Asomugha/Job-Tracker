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

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ notice params is wrapped in a Promise
) => {
  const resolvedParams = await context.params; // must await
  const { id } = resolvedParams;

  // Auth
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { interviewAt } = await req.json();
  if (!interviewAt) {
    return NextResponse.json(
      { error: "Missing interview date" },
      { status: 400 }
    );
  }

  await connectDB();

  const application = await Application.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    { interviewAt: new Date(interviewAt) },
    { new: true }
  );

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  return NextResponse.json(application);
};
