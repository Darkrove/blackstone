import { UserAvatar } from "@/components/shared/user-avatar"

const leaderboard = [
  {
    name: "Ankit Gupta",
    image: "/avatars/1.png",
    team: "Team Sreenivas Pai",
    coins: 500,
  },
  {
    name: "Hariharan Mudaliyar",
    image: "/avatars/2.png",
    team: "Team Sreenivas Pai",
    coins: 300,
  },
  {
    name: "Sajjad Shaikh",
    image: "/avatars/3.png",
    team: "Team Sreenivas Pai",
    coins: 200,
  },
  {
    name: "SunnyKumar Gupta",
    image: "/avatars/4.png",
    team: "Team Sreenivas Pai",
    coins: 200,
  },
]

export default function LeaderboardList() {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">Leaderboard</h3>
      <ul className="space-y-2">
        {leaderboard.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between border rounded-lg px-4 py-2"
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold w-5">{index + 1}</span>
              <UserAvatar
                user={{ name: user.name, image: user.image }}
                className="w-10 h-10 bg-gray-200"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs">{user.team}</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">{user.coins} Coins</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
