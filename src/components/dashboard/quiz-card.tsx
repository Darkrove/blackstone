"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function QuizCard() {

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full flex flex-col justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2 text-foreground">New Quest has arrived 📝</h3>
          <p className="text-muted-foreground mb-6">complete it to win points, you can complete one quiz per day with 3 locations </p>
          <Link className={buttonVariants({ variant: "default" })} href="/dashboard/quiz">Start Quiz</Link>
        </div>
      </CardContent>
    </Card>
  )
}

