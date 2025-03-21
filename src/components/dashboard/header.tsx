"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="m-auto size-6 text-black dark:text-white"
  >
    <title>Open menu</title>
    <path
      fillRule="evenodd"
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    ></path>
  </svg>
);

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export default function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold">{heading}</h1>
        {text && <p className="text-base text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
