// import { googleSignInAction, signUpAction } from "@/app/actions/auth";
// import SigningHeader from "@/components/signingHeader";
// import Image from "next/image";
// import Link from "next/link";

// export default function SignUpPage() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-[#dcebfc] px-4 pb-4">
//       {/* Header / Logo */}
//       <SigningHeader />

//       {/* Card container */}
//       <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-md">
//         {/* Sign Up Form */}
//         <form action={signUpAction} className="flex flex-col space-y-4">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//             Create your account
//           </h2>

//           {/* Full Name */}
//           <div className="flex flex-col">
//             <label htmlFor="name" className="text-gray-600 mb-1">
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               placeholder="John Doe"
//               className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d4585]"
//             />
//           </div>

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
//             <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
//           </div>

//           {/* Terms */}
//           <label className="flex items-center text-gray-600">
//             <input
//               type="checkbox"
//               name="rememberMe"
//               id="rememberMe"
//               className="mr-2 accent-[#0d4585]"
//             />
//             I agree to the Terms and Conditions
//           </label>

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="bg-[#0d4585] text-white py-2 rounded-md font-semibold hover:bg-[#0b356b] transition-colors"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="mx-2 text-gray-400 text-sm">or</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Google Sign Up */}
//         <form action={googleSignInAction}>
//           <button
//             type="submit"
//             className="flex items-center justify-center border border-gray-300 rounded-md w-full py-2 hover:bg-gray-100 transition-colors mb-4"
//           >
//             <Image
//               src="/google.svg"
//               alt="Google"
//               width={20}
//               height={20}
//               className="mr-2"
//             />
//             Sign up with Google
//           </button>
//         </form>

//         {/* Already have an account */}
//         <p className="text-gray-600 text-center mt-2">
//           Already have an account?{" "}
//           <Link
//             href="/"
//             className="text-[#0d4585] font-medium hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }
import { googleSignInAction, signUpAction } from "@/app/actions/auth";
import SigningHeader from "@/components/signingHeader";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main
      className="
        flex flex-col items-center justify-center
        min-h-screen px-4 pb-6
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
        <form action={signUpAction} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100 text-center">
            Create your account
          </h2>

          {/* Name */}
          <input
            name="name"
            placeholder="Full name"
            required
            className="
              w-full rounded-lg
              border border-slate-300/70 dark:border-slate-700
              bg-white/60 dark:bg-slate-800
              px-3 py-2
              text-slate-800 dark:text-slate-100
              focus:ring-2 focus:ring-[#0d4585]/40
              focus:outline-none
            "
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="
              w-full rounded-lg
              border border-slate-300/70 dark:border-slate-700
              bg-white/60 dark:bg-slate-800
              px-3 py-2
              text-slate-800 dark:text-slate-100
              focus:ring-2 focus:ring-[#0d4585]/40
              focus:outline-none
            "
          />

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="
                w-full rounded-lg
                border border-slate-300/70 dark:border-slate-700
                bg-white/60 dark:bg-slate-800
                px-3 py-2
                text-slate-800 dark:text-slate-100
                focus:ring-2 focus:ring-[#0d4585]/40
                focus:outline-none
              "
            />
            <p className="text-xs text-slate-500 mt-1">
              Must be at least 8 characters
            </p>
          </div>

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
