// "use client";

// import { useState } from "react";
// import { authClient } from "@/lib/auth-client";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleSubmit(
//     e: React.FormEvent
//   ) {
//     e.preventDefault();

//     const { error } =
//       await authClient.requestPasswordReset({
//         email,
//         redirectTo:
//           "http://localhost:3000/reset-password",
//       });

//     if (error) {
//       setMessage(error.message ?? "An unexpected error occurred.");
//       return;
//     }

//     setMessage(
//       "If the account exists, a reset link was sent."
//     );
//   }

//   return (
//     <div>
//       <h1>Forgot Password</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />

//         <button type="submit">
//           Send Reset Link
//         </button>
//       </form>

//       <p>{message}</p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import SigningHeader from "@/components/signingHeader";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } =
      await authClient.requestPasswordReset({
        email,
        redirectTo:
          process.env.NEXT_PUBLIC_SIGNIN_URL,
      });

    if (error) {
      setMessage(
        error.message ??
          "An unexpected error occurred."
      );
      setLoading(false);
      return;
    }

    setMessage(
      "If the account exists, a reset link was sent to your email."
    );

    setLoading(false);
  }

  return (
     <main
      className="
        flex flex-col items-center justify-center
        min-h-screen px-4 pb-6
        bg-slate-200 dark:bg-slate-950
      "
    >
          <SigningHeader />

      <div className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-slate-100 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0d4585]/10">
            <Mail className="h-7 w-7 text-[#0d4585]" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Forgot Password
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Enter your email address and we’ll send you a
            password reset link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
              Email address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-[#0d4585] focus:ring-2 focus:ring-[#0d4585]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0d4585] py-2.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
              message.toLowerCase().includes("sent")
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="font-medium text-[#0d4585]"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}