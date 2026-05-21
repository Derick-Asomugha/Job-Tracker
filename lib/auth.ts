// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { db } from "../db";
// import { nextCookies } from "better-auth/next-js";

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//     emailAndPassword: { 
//     enabled: true, 
//   },
//    baseURL: process.env.BETTER_AUTH_URL, 
//     socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID as string, 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
//         }, 
//     },
//     plugins: [nextCookies()] 
// });
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import { sendEmail } from "@/lib/send-email";

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,

    revokeSessionsOnPasswordReset: true,

    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click this link to reset your password: ${url}`,
      });
    },

    onPasswordReset: async ({ user }) => {
      console.log(
        `Password reset successful for ${user.email}`
      );
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  baseURL: process.env.BETTER_AUTH_URL,

  plugins: [nextCookies()],
});