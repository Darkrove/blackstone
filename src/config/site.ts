import { SiteConfig } from "@/types";
import { env } from "../../env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "BlackStone",
  description:
    "POS system for managing invoices, customers, and products. Create and manage invoices with ease.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/darkrove",
  },
  mailSupport: "support@next-starter.fake",
};