import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-card";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { QuizCard } from "@/components/dashboard/quiz-card";
import { BlogSection } from "@/components/dashboard/blog-section";

export const metadata = constructMetadata({
  title: "Dashboard | Blackstone",
  description: "Dahboard for analytics and data visualization.",
});

export default async function IndexPage() {
  const user = await getCurrentUser();
  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader heading={`Hello, ${user?.name} 👋`} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <StatsCards />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <ActivityChart />
        </div>
        <div className="md:col-span-1">
          <QuizCard />
        </div>
      </div>
      <div className="mt-6">
          <BlogSection />
        </div>
    </div>
  );
}
