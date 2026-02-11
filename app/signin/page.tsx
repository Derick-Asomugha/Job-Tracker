"use client";

import { signInAction, googleSignInAction } from "@/app/actions/auth";
// import { useActionState } from "react";
import Link from "next/link";
import SigningHeader from "@/components/signingHeader";
import Image from "next/image";

export default function SignIn() {
 

  return (
    <main className="flex flex-col items-center justify-center  min-h-screen px-4 bg-slate-200 dark:bg-slate-950">
      <SigningHeader />

      <div className="w-full max-w-md rounded-2xl bg-slate-100 shadow-2xl dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800  p-6 sm:p-8">
        <form action={signInAction} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">
            Welcome back
          </h2>

          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* {state?.error && <p className="text-red-500 text-sm">{state.error}</p>} */}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0d4585] py-2.5 font-medium text-white"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow" />
          <span className="mx-3 text-xs text-slate-400">OR</span>
          <hr className="flex-grow" />
        </div>

        <form action={googleSignInAction}>
          <button
            type="submit"
            className="w-full flex items-center dark:bg-slate-100 bg-slate-300 justify-center gap-2 rounded-lg border py-2"
          >
            <Image src="/google.svg" alt="Google" width={18} height={18} />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#0d4585] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
