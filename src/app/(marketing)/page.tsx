import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default function Home() {
  return (
    <section className="space-y-6 h-full">
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-background p-8 sm:p-20">
      <div className="flex max-w-screen-md flex-col items-center gap-5 text-center">
        <Link
          href="https://next-saas-stripe-starter.vercel.app/"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "xl" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> Blackstone
        </Link>

        <h1 className="text-balance font-satoshi text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
          A{" "}
          <span className="bg-gradient-to-r from-primary via-green-300 to-cyan-300 bg-clip-text text-transparent">
            Quiz
          </span>{" "}
          App
        </h1>

        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          Forget past mistakes. <b>Forget failures.</b> Forget everything
          except what you&apos;re going to do now and do it.
        </p>

        <div className="flex w-full flex-col items-center justify-center space-x-0 space-y-3 px-5 sm:flex-row sm:space-x-3 sm:space-y-0 sm:px-10 lg:px-28">
          <Link
            href="/login"
            prefetch={true}
            className={cn(
              buttonVariants({ rounded: "xl", size: "lg" }),
              "w-full text-[15px]",
            )}
          >
            <span>Login</span>
            <Icons.arrowRight className="ml-2 size-4" />
          </Link>
          <Link
            href="https://github.com/mickasmt/next-auth-roles-template"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                rounded: "xl",
                size: "lg",
              }),
              "w-full text-[15px]",
            )}
          >
            <Icons.gitHub className="mr-2 size-4" />

            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
  );
}
