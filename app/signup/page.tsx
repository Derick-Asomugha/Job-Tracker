"use client";

import { googleSignInAction, signUpAction } from "@/app/actions/auth";
import { useActionState } from "react";
import SigningHeader from "@/components/signingHeader";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUpAction, {
    error: "",
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-6 bg-slate-100 dark:bg-slate-950">
      <SigningHeader />

      <div className="w-full max-w-md rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm p-6 sm:p-8">
        <form action={formAction} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100 text-center">
            Create your account
          </h2>

          <input
            name="name"
            placeholder="Full name"
            required
            className="w-full rounded-lg border px-3 py-2"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="w-full rounded-lg border px-3 py-2"
          />

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-lg border px-3 py-2"
            />
            <p className="text-xs text-slate-500 mt-1">
              Must be at least 8 characters
            </p>
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm text-center">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0d4585] py-2.5 font-medium text-white hover:bg-[#0b356b] transition"
          >
            Create account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-slate-300 dark:border-slate-700" />
          <span className="mx-3 text-xs text-slate-400">OR</span>
          <hr className="flex-grow border-slate-300 dark:border-slate-700" />
        </div>

        {/* Google */}
        <form action={googleSignInAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg border py-2"
          >
            <Image src="/google.svg" alt="Google" width={18} height={18} />
            Sign up with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/" className="text-[#0d4585] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
