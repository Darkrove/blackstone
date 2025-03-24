"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/lib/store"
import { getPOIs, submitQuizAnswers } from "@/lib/mock-data" // Updated import
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/quiz/loading-spinner"
import QuizCard from "@/components/quiz/quiz-card"
import { Progress } from "@/components/ui/progress"

export default function QuizQuestionPage() {
  const router = useRouter()
  const [isInitializing, setIsInitializing] = useState(true)
  const {
    currentPOIIndex,
    totalPOIs,
    poiList,
    answers,
    isLoading,
    resetQuiz,
    setCurrentPOIIndex,
    canAttemptToday,
    initializeQuiz,
    setCanAttemptToday,
    setLoading,
  } = useQuizStore()

  // Initialize the quiz if needed
  useEffect(() => {
    const initializeIfNeeded = async () => {
      try {
        setIsInitializing(true)

        // Check if user can attempt today
        const today = new Date().toISOString().split("T")[0]
        const lastAttemptDate = localStorage.getItem("lastAttemptDate")
        const canAttempt = !lastAttemptDate || lastAttemptDate !== today
        setCanAttemptToday(canAttempt)

        // If we already have POIs, we don't need to fetch them again
        if (poiList.length > 0) {
          setIsInitializing(false)
          setLoading(false)
          return
        }

        // Fetch POIs
        console.log("Fetching POIs from question page...")
        const pois = await getPOIs()
        console.log("POIs fetched:", pois)

        if (pois && pois.length > 0) {
          initializeQuiz(pois)
        }

        setIsInitializing(false)
        setLoading(false)
      } catch (error) {
        console.error("Error initializing quiz:", error)
        setIsInitializing(false)
        setLoading(false)
      }
    }

    initializeIfNeeded()
  }, [poiList.length, initializeQuiz, setCanAttemptToday, setLoading])

  // If user can't attempt today, redirect to quiz start page
  useEffect(() => {
    if (!isInitializing && !canAttemptToday) {
      router.replace("/dashboard/quiz")
    }
  }, [canAttemptToday, router, isInitializing])

  // Get the current POI
  const currentPOI = poiList[currentPOIIndex]
  const isFirstQuestion = currentPOIIndex === 0
  const isLastQuestion = currentPOIIndex === poiList.length - 1

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentPOIIndex(currentPOIIndex - 1)
    }
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentPOIIndex(currentPOIIndex + 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Mark as completed for today
      localStorage.setItem("lastAttemptDate", new Date().toISOString().split("T")[0])
      localStorage.setItem("quizReposnses", JSON.stringify(answers))

      // Submit answers to server
      await submitQuizAnswers(answers)

      // Reset quiz and redirect to completion page
      resetQuiz()
      router.push("/dashboard/quiz/completed")
    } catch (error) {
      console.error("Failed to submit quiz:", error)
      alert("There was an error submitting your quiz. Please try again.")
    }
  }

  // Check if current POI has all required answers
  const isCurrentPoiComplete = () => {
    if (!currentPOI) return false

    const poiAnswers = answers[currentPOI.id] || {}
    const requiredQuestions = [
      "Can you find the location of place?",
      "Is this place currently open?",
      "Can you find any recent reviews (last 6 months)?",
      "Does this place have vehicle parking?",
      "Do they accept cash and card payments?",
    ]

    return requiredQuestions.every((q) => poiAnswers[q])
  }

  // Show loading spinner while initializing or loading
  if (isInitializing || isLoading) {
    return <LoadingSpinner />
  }

  // If no POIs loaded, show error
  if (poiList.length === 0) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <div className="p-6 rounded-lg text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">No Quiz Data Available</h2>
          <p className="mb-4">Unable to load quiz questions. Please try again later.</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  // If no current POI, show error
  if (!currentPOI) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <div className="bg-red-900/20 p-6 rounded-lg text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Question Not Found</h2>
          <p className="mb-4">Unable to load the current question. Please try again.</p>
          <Button onClick={() => router.push("/")} className="bg-emerald-600 hover:bg-emerald-700">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => {
              resetQuiz()
              router.push("/dashboard")
            }}
          >
            Exit Quiz
          </Button>
          <div className="text-center w">
            <span className="text-sm">Progress</span>

            <Progress value={((currentPOIIndex + 1) / totalPOIs) * 100} className="w-full" />
            <span className="text-xs mt-1">
              {currentPOIIndex + 1}/{totalPOIs} POI
            </span>
          </div>
        </div>

        <QuizCard poi={currentPOI} />

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}

              disabled={!isCurrentPoiComplete()}
            >
              Submit Responses
            </Button>
          ) : (
            <Button
              onClick={handleNext}

              disabled={!isCurrentPoiComplete()}
            >
              Next Location
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

