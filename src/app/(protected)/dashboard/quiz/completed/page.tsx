"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function QuizCompletedPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="w-full max-w-3xl space-y-6 text-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-lg">Thank you for verifying the locations.</p>
          <div className="mt-6 inline-block border px-6 py-3 rounded-lg">
            <span className="text-xl font-bold">Responses Submitted Successfully</span>
          </div>
          <p className="mt-4">You've completed today's quiz. Come back tomorrow for more!</p>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => router.push("/dashboard")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

