/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";



export async function signUpAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required" };
  }

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
      headers: await headers(),
    });
  } catch (err: any) {
    console.error("Sign up error:", err);

    if (err?.response?.data?.message) {
      return { error: err.response.data.message };
    }

    return { error: "User already exists" };
  }

  // Only redirect if sign-up succeeded
  redirect("/");
}





export async function signInAction(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  let result;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    result = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (err: any) {
    console.error("Sign in error:", err);

    if (err?.response?.data?.message) {
      return { error: err.response.data.message };
    }

    return { error: "Incorrect email or password" };
  }

  // Only redirect if API succeeded
  redirect("/");
}





export async function googleSignInAction() {
  // Get the Google sign-in URL
  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    },
  });

  // Redirect the user to Google
  if (!response.url) {
    throw new Error("Failed to get Google sign-in URL");
  }
  redirect(response.url);
}
export async function signOutAction() {
    // const confirmed = confirm("Are you sure you want to logout?");
    // if (!confirmed) return;

    await auth.api.signOut({ headers: await headers() });
    redirect("/");
}