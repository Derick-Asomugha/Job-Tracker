// app/reset-password/ResetPasswordClient.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import SigningHeader from "@/components/signingHeader";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function ResetPasswordClient() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (!token) {
      setMessage("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const { error } = await authClient.resetPassword({
      token,
      newPassword: password,
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred.");
      setLoading(false);
      return;
    }

    setMessage("Password reset successful. Redirecting...");

    setTimeout(() => {
      router.push("/signin");
    }, 1200);

    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-6 bg-slate-200 dark:bg-slate-950">
      <SigningHeader />

      <div className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-slate-100 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">

        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0d4585]/10">
            <Lock className="h-7 w-7 text-[#0d4585]" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Enter your new password below to secure your account.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-[#0d4585] focus:ring-2 focus:ring-[#0d4585]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0d4585] py-2.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
              message.toLowerCase().includes("successful") ||
              message.toLowerCase().includes("redirecting")
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Back to{" "}
          <Link href="/signin" className="font-medium text-[#0d4585]">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}