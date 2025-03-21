import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import AzureADProvider from "next-auth/providers/azure-ad";

import { env } from "./env.mjs";

// import { siteConfig } from "@/config/site"
// import { getUserByEmail } from "@/lib/user";
// import MagicLinkEmail from "@/emails/magic-link-email"
// import { prisma } from "@/lib/db"

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: "Famous Bag <famous-bag@resend.dev>",
    }),
  ],
} satisfies NextAuthConfig;