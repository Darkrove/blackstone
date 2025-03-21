"use client";

import { useContext } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { MainNavItem } from "@/types";
import { UserAccountNav } from "./user-account-nav";
import { ModeToggle } from "./mode-toggle";

interface NavBarProps {
    scroll?: boolean;
    large?: boolean;
    links: MainNavItem[];
    showAvatar: boolean;
}

export function NavBar({ scroll = false, links, showAvatar }: NavBarProps) {
    const scrolled = useScroll(50);
    const { data: session, status } = useSession();
    const { setShowSignInModal } = useContext(ModalContext);
    const selectedLayout = useSelectedLayoutSegment();
    const pathname = usePathname();  // Get the current route

    const isHomePage = pathname === "/"; // Check if on home page

    return (
        <header
            className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
                }`}
        >
            <MaxWidthWrapper
                className="flex h-full max-w-7xl py-4 gap-4 px-0 lg:gap-6 justify-between items-center"
            >
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-1.5">
                        <Icons.logo className="size-6" />
                        <span className="font-satoshi text-xl font-bold">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {links && links.length > 0 ? (
                        <nav className="hidden gap-6 md:flex">
                            {links.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.disabled ? "#" : item.href}
                                    prefetch={true}
                                    className={cn(
                                        "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                        item.href.startsWith(`/${selectedLayout}`)
                                            ? "text-foreground"
                                            : "text-foreground/60",
                                        item.disabled && "cursor-not-allowed opacity-80",
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    ) : null}
                </div>

                <div className="flex items-center space-x-3">
                    {/* Show Sign In & Dashboard on home page, but User Nav on other pages */}
                    {isHomePage ? (
                        session ? (
                            <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"} className="hidden md:block">
                                <Button className="gap-2 px-4" variant="default" size="sm" rounded="xl">
                                    <span>Dashboard</span>
                                </Button>
                            </Link>
                        ) : status === "unauthenticated" ? (
                            <Button
                                className="hidden gap-2 px-4 md:flex"
                                variant="default"
                                size="sm"
                                rounded="lg"
                                onClick={() => setShowSignInModal(true)}
                            >
                                <span>Sign In</span>
                                <Icons.arrowRight className="size-4" />
                            </Button>
                        ) : (
                            <Skeleton className="hidden h-9 w-24 rounded-xl lg:flex" />
                        )
                    ) : (
                        // Show user profile navigation when inside the dashboard
                        showAvatar && session && (
                            <div className="flex item-center gap-4">
                                <ModeToggle />
                                <UserAccountNav />
                            </div>
                        )
                    )}
                </div>
            </MaxWidthWrapper>
        </header>
    );
}
