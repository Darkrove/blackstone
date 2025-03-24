"use client";

import { UserAvatar } from "@/components/shared/user-avatar"
import { useSession } from "next-auth/react";

export default function LeaderboardHeader() {
  const mockUser = {
    name: "Aadhvita Patil",
    image: "/avatars/5.png",
    coins: 590,
    globalRank: 123,
    teamRank: 1,
    title: "Sr Spatial Data Specialist",
  }

  const { data: session } = useSession();
  const user = session?.user;

  if (!user)
    return (
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 animate-pulse rounded-full border bg-muted" />
        </div>
      </div>
    );

  return (
    <div className="p-6 text-center">
      <div className="flex justify-center mb-4">
        <UserAvatar user={{ name: user.name || null, image: user.image || null }} className="w-16 h-16 bg-gray-200" />
      </div>
      <h2 className="text-2xl font-semibold">{user.name}</h2>
      <p className="text-sm">{mockUser.title}</p>

      <div className="border rounded-xl p-6 mt-6 grid grid-cols-3 text-sm font-semibold text-center">
        <div className="flex flex-col">
          <span>COINS</span>
          <span className="text-xl mt-1">{mockUser.coins}</span>
        </div>
        <div className="flex flex-col border-l-2 border-r-2 border-border">
          <span>GLOBAL RANK</span>
          <span className="text-xl mt-1">#{mockUser.globalRank}</span>
        </div>
        <div className="flex flex-col">
          <span>TEAM RANK</span>
          <span className="text-xl mt-1">#{mockUser.teamRank}</span>
        </div>
      </div>
    </div>
  )
}
