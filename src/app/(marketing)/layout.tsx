interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 h-full w-full justify-center content-center">{children}</main>
    </div>
  );
}