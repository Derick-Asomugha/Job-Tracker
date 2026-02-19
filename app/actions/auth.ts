"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export async function signUpAction(formData : FormData){
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    if(!email || !password || !name){
        throw new Error("Email, password, and name are required");
    }
    await auth.api.signUpEmail( {
       body: {
        email,
        password,
        name,
         },
    });
    redirect("/");
}

export async function signInAction(formData : FormData){
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if(!email || !password){
        throw new Error("Email and password are required");
    }
    await auth.api.signInEmail( {
       body: {
        email,
        password,
         },
    });
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


    await auth.api.signOut({ headers: await headers() });
    redirect("/");
}