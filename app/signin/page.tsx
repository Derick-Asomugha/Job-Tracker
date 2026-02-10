// import { googleSignInAction, signInAction } from "@/app/actions/auth";
// import Link from "next/link";
// import SigningHeader from "@/components/signingHeader";
// import Image from "next/image";

// export default function SignIn() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-[#dcebfc] px-4">
//       <SigningHeader />

//       {/* Sign In Form */}
//       <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-md">
//         <form action={signInAction} className="flex flex-col space-y-4">
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome back</h2>

//           {/* Email */}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-gray-600 mb-1">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               placeholder="your@example.com"
//               className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d4585]"
//             />
//           </div>

//           {/* Password */}
//           <div className="flex flex-col">
//             <label htmlFor="password" className="text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               placeholder="********"
//               className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d4585]"
//             />
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center text-gray-600">
//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 id="rememberMe"
//                 className="mr-2 accent-[#0d4585]"
//               />
//               Remember Me
//             </label>
//             <Link href="/forgot-password" className="text-[#0d4585] hover:underline text-sm">
//               Forgot password?
//             </Link>
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="bg-[#0d4585] text-white py-2 rounded-md font-semibold hover:bg-[#0d4585] transition-colors"
//           >
//             Sign in
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="mx-2 text-gray-400 text-sm">or</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Google Sign In */}
//         <form action={googleSignInAction}>
//         <button
//   type="submit"
//   className="flex items-center justify-center border border-gray-300 rounded-md w-full py-2 hover:bg-gray-100 transition-colors"
// >
//   <Image
//     src="/google.svg"
//     alt="Google"
//     width={20}
//     height={20}
//     className="mr-2"
//   />
//   Sign in with Google
// </button>
//         </form>
//         {/* Sign up link */}
//         <p className="text-gray-600 text-center mt-6">
//           Don&apos;t have an account?{" "}
//           <Link href="/signup" className="text-[#0d4585] font-medium hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }
import { googleSignInAction, signInAction } from "@/app/actions/auth";
import Link from "next/link";
import SigningHeader from "@/components/signingHeader";
import Image from "next/image";

export default function SignIn() {
  return (
    <main
      className="
        flex flex-col items-center justify-center
        min-h-screen px-4
        bg-slate-100 dark:bg-slate-950
      "
    >
      <SigningHeader />

      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-slate-50 dark:bg-slate-900
          border border-slate-200/70 dark:border-slate-800
          shadow-sm
          p-6 sm:p-8
        "
      >
        <form action={signInAction} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">
            Welcome back
          </h2>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="your@example.com"
              className="
                w-full rounded-lg
                border border-slate-300/70 dark:border-slate-700
                bg-white/60 dark:bg-slate-800
                px-3 py-2
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2 focus:ring-[#0d4585]/40
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="
                w-full rounded-lg
                border border-slate-300/70 dark:border-slate-700
                bg-white/60 dark:bg-slate-800
                px-3 py-2
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2 focus:ring-[#0d4585]/40
              "
            />
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="accent-[#0d4585]" />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-[#0d4585] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full rounded-lg
              bg-[#0d4585] py-2.5
              font-medium text-white
              hover:bg-[#0b356b]
              transition
            "
          >
            Sign in
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
            className="
              w-full flex items-center justify-center gap-2
              rounded-lg
              border border-slate-300/70 dark:border-slate-700
              bg-white/50 dark:bg-slate-800
              py-2
              text-slate-700 dark:text-slate-200
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
            "
          >
            <Image src="/google.svg" alt="Google" width={18} height={18} />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#0d4585] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
