import { NavBar } from "@/components/layout/navbar";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { protectedConfig } from "@/config/protected";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar scroll={true} links={protectedConfig.mainNav} showAvatar={true} />
      <main>
          {children}
      </main>
    </div>
  );
}