import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashComp from "@/components/dashcomp";
// import Link from "next/link";
import { redirect } from "next/navigation";
// import { signInAction } from "@/app/actions/auth"; // adjust path if needed
import DashBody from "@/components/dashbody";

export default async function SignInPage() {
  // Get session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Conditional rendering
  if (session) {
    return (
      <div className="bg-gray-100 dark:bg-slate-800 min-h-screen min-w-full p-0 m-0">
        <DashComp />
        <DashBody />
        </div>
  )} else {
    redirect("/signin");
  }
}
