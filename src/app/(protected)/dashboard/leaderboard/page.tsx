import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader"
import LeaderboardList from "@/components/leaderboard/LeaderboardList"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <LeaderboardHeader />
      <LeaderboardList />
    </div>
  )
}
