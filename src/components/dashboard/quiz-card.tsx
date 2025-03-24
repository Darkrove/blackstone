"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useQuizStore } from "@/lib/store"

export function QuizCard() {
  const {  canAttemptToday } = useQuizStore()
  const today = new Date().toISOString().split("T")[0]
  const lastAttemptDate = localStorage.getItem("lastAttemptDate")
  const canAttempt = !lastAttemptDate || lastAttemptDate !== today
  console.log(canAttemptToday)
  return (
    <Card className="h-full">
      <CardContent className="py-6 h-full flex flex-col justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2 text-foreground">New Quest has arrived 📝</h3>
          <p className="text-muted-foreground mb-6">complete it to win points, you can complete one quiz per day with 3 locations </p>
          {canAttempt ? (
            <Link className={buttonVariants({ variant: "default" })} href="/dashboard/quiz">Start Quiz</Link>
          ) : (
            <Button className={buttonVariants({ variant: "default" })} disabled>
              Quiz not available
            </Button>
          )
          }
        </div>
      </CardContent>
    </Card>
  )
}

