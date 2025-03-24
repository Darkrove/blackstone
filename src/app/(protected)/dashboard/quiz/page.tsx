"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/lib/store"
import { getPOIs } from "@/lib/mock-data" // Updated import
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/quiz/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"

export default function QuizStartPage() {
  const router = useRouter()
  const { initializeQuiz, isLoading, canAttemptToday, setCanAttemptToday } = useQuizStore()

  useEffect(() => {
    const checkAndInitialize = async () => {
      // Check if user can attempt today
      const today = new Date().toISOString().split("T")[0]
      const lastAttemptDate = localStorage.getItem("lastAttemptDate")
      const canAttempt = !lastAttemptDate || lastAttemptDate !== today

      setCanAttemptToday(canAttempt)

      if (canAttempt) {
        try {
          // Fetch POIs from client-side function
          console.log("Fetching POIs...")
          const pois = await getPOIs()
          console.log("POIs fetched:", pois)

          if (pois && pois.length > 0) {
            // Initialize the quiz with the fetched POIs
            initializeQuiz(pois)
          } else {
            // If no POIs, still set loading to false
            console.error("No POIs returned")
            useQuizStore.getState().setLoading(false)
          }
        } catch (error) {
          console.error("Failed to initialize quiz:", error)
          // Make sure to set loading to false even on error
          useQuizStore.getState().setLoading(false)
        }
      } else {
        // If user can't attempt today, still set loading to false
        useQuizStore.getState().setLoading(false)
      }
    }

    checkAndInitialize()
  }, [initializeQuiz, setCanAttemptToday])

  if (isLoading) {
    return <LoadingSpinner />
  }

  const handleStart = () => {
    router.push("/dashboard/quiz/question")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="w-full max-w-3xl space-y-6 text-center">
        {canAttemptToday ? (
          <>
            <h1 className="text-3xl font-bold">Ready to Start</h1>
            <p className="text-lg">You will be shown 3 locations to verify. Answer all questions for each location.</p>
            <div className="flex justify-center mt-8">
              <Button size="lg" onClick={handleStart} >
                Begin Quiz
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Daily Limit Reached</h1>
            <p className="text-lg">
              You've already completed today's quiz. Please come back tomorrow for a new quiz.
            </p>
            <Card className="p-6 rounded-lg mt-6">
              <CardContent>
                <p className="font-medium">Next quiz available tomorrow</p>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-8">
              <Button
              variant="secondary"
                onClick={() => router.push("/dashboard")}
              >
                Back to Home
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )

}

