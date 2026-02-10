// import { FaSuitcase } from "react-icons/fa6";

// export default function SigningHeader() {
//     return (
//          <div className="flex flex-col items-center mb-8">
//            <FaSuitcase className="text-white bg-[#0d4585] rounded-md h-16 w-16 p-4 mb-4 mt-7" />
//            <h1 className="text-3xl font-bold text-black">Gig Tracker</h1>
//            <p className="text-gray-900 text-center mt-1">
//              Track your job applications, interviews, and offers in one place. Stay
//               organized and land your dream job faster!
//            </p>
//          </div>
//     );
// }
import { FaSuitcase } from "react-icons/fa6";

export default function SigningHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-8 px-4">
      <div
        className="
          flex items-center justify-center
          h-16 w-16 rounded-xl
          bg-[#0d4585]/90 text-white
          shadow-sm mb-4 mt-6
        "
      >
        <FaSuitcase className="h-7 w-7" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800 dark:text-slate-100">
        Gig Tracker
      </h1>

      <p className="mt-2 max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Track your job applications, interviews, and offers in one place. Stay
        organized and land your dream job faster.
      </p>
    </div>
  );
}
