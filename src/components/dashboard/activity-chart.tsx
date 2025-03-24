"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2025-02-24", quiz: 178 },
  { date: "2025-02-25", quiz: 470 },
  { date: "2025-02-26", quiz: 103 },
  { date: "2025-02-27", quiz: 439 },
  { date: "2025-02-28", quiz: 88 },
  { date: "2025-03-01", quiz: 294 },
  { date: "2025-03-02", quiz: 323 },
  { date: "2025-03-03", quiz: 385 },
  { date: "2025-03-04", quiz: 438 },
  { date: "2025-03-05", quiz: 155 },
  { date: "2025-03-06", quiz: 92 },
  { date: "2025-03-07", quiz: 492 },
  { date: "2025-03-08", quiz: 81 },
  { date: "2025-03-09", quiz: 426 },
  { date: "2025-03-10", quiz: 307 },
  { date: "2025-03-11", quiz: 371 },
  { date: "2025-03-12", quiz: 475 },
  { date: "2025-03-13", quiz: 107 },
  { date: "2025-03-14", quiz: 341 },
  { date: "2025-03-15", quiz: 408 },
  { date: "2025-03-16", quiz: 169 },
  { date: "2025-03-17", quiz: 317 },
  { date: "2025-03-18", quiz: 480 },
  { date: "2025-03-19", quiz: 132 },
  { date: "2025-03-20", quiz: 141 },
  { date: "2025-03-21", quiz: 434 },
  { date: "2025-03-22", quiz: 448 },
  { date: "2025-03-23", quiz: 149 },
  { date: "2025-03-24", quiz: 103 },
]

const chartConfig = {
  quiz: {
    label: "Quiz",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ActivityChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("quiz")

  const total = React.useMemo(
    () => ({
      quiz: chartData.reduce((acc, curr) => acc + curr.quiz, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-1 sm:py-2">
          <CardTitle>Daily Activity</CardTitle>
          <CardDescription>
            Showing activity for the last 1 months
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={activeChart === "quiz"}
            className="flex flex-1 flex-col justify-center gap-1 px-6 py-1 text-left sm:px-8 sm:py-2"
            onClick={() => setActiveChart("quiz")}
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.quiz.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-2xl">
              {total.quiz.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey="quiz"
              type="monotone"
              stroke={`var(--color-chart-1, #4caf50)`} 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}