import { NavBar } from "@/components/layout/navbar";
import { marketingConfig } from "@/config/marketing";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar scroll={true} links={marketingConfig.mainNav} showAvatar={false}/>
      <main className="flex h-full w-full justify-center content-center">{children}</main>
    </div>
  );
}