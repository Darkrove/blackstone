"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ActivityChart() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Generate data for the last 30 days
  const generateData = () => {
    const data = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      data.push({
        date: date.toISOString().split("T")[0],
        quizzes: Math.floor(Math.random() * 8) + 1, // Random value between 1-8
        displayDate: `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`,
      })
    }

    return data
  }

  const data = generateData()

  // Ensure component is mounted to avoid hydration issues with theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Determine line color based on theme
  const lineColor = resolvedTheme === "dark" ? "#3b82f6" : "#2563eb"
  const gridColor = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  const textColor = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)"

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-foreground">Daily Quiz Activity</h3>
      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: textColor }}
              tickMargin={5}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis hide={true} />
            <Tooltip
              contentStyle={{
                backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#ffffff",
                borderColor: resolvedTheme === "dark" ? "#374151" : "#e5e7eb",
                color: textColor,
              }}
              formatter={(value) => [`${value} quizzes`, "Attempted"]}
              labelFormatter={(label) => `${label}`}
            />
            <Line
              type="monotone"
              dataKey="quizzes"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

