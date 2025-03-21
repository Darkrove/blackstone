import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/header";

export const metadata = constructMetadata({
  title: "Dashboard | Blackstone",
  description: "Dahboard for analytics and data visualization.",
});

export default async function IndexPage() {
  const user = await getCurrentUser();
  return (
    <>
    <DashboardHeader heading={`Hello, ${user?.name} 👋`} ></DashboardHeader> 
    </>
  )}