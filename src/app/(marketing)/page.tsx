import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import ShinyText from "@/components/animation/shiny-text";
import StarBorder from "@/components/animation/star-border";

export default function Home() {
  return (
    <section className="space-y-6 h-full">
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-background p-8 sm:p-20">
        <div className="flex max-w-screen-md flex-col items-center gap-5 text-center">
          <Link
            href="https://blackstone-here.vercel.app/"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm", rounded: "xl" }),
              "px-4",
            )}
            target="_blank"
          >
            <ShinyText text="🎉 Blackstone" disabled={false} speed={5} className='text-white dark:text-black'/>
          </Link>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Let&apos;s take auth to <br /> keep <span className="text-teal-400">Here</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold">The #1 location platform</h2>
          </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
