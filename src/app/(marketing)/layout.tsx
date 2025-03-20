interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center content-center">
      <main className="flex-1 h-full w-full">{children}</main>
    </div>
  );
}