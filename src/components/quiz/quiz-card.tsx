"use client"

import { useState } from "react"
import Image from "next/image"
import { useQuizStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Check, X, HelpCircle, LinkIcon } from "lucide-react"
import { Badge } from "../ui/badge"

interface POI {
  id: string
  name: string
  type: string
  coins: number
  address: string
  googleMapsUrl: string
  mapCreatorUrl: string
  googleDriveUrl: string
  mapCreatorDriveUrl: string
}

export default function QuizCard({ poi }: { poi: POI }) {
  const { setAnswer, answers } = useQuizStore()
  const [referenceUrl, setReferenceUrl] = useState(answers[poi.id]?.referenceUrl || "")

  const questions = [
    "Can you find the location of place?",
    "Is this place currently open?",
    "Can you find any recent reviews (last 6 months)?",
    "Does this place have vehicle parking?",
    "Do they accept cash and card payments?",
  ]

  const handleAnswer = (question: string, answer: "yes" | "no" | "notsure") => {
    setAnswer(poi.id, question, answer)
  }

  const handleReferenceSubmit = () => {
    if (referenceUrl.trim()) {
      setAnswer(poi.id, "referenceUrl", referenceUrl)
    }
  }

  // Get current answers for this POI
  const poiAnswers = answers[poi.id] || {}

  return (
    <Card>
      <CardHeader>
        {/* Header */}
        <div className="py-2 px-0 sm:px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{poi.name}</h2>
            <Badge size={"sm"}>{poi.type}</Badge>
          </div>
          <div className="text-sm font-medium">+{poi.coins} Coins</div>
        </div>
        {/* Address */}
        <div className="py-2 px-0 sm:px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-sm">{poi.address}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-t">
        {/* Map Views */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-0 sm:px-4">
          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="bg-primary px-3 py-1.5 flex items-center">
              <div className="w-4 h-4 mr-2 bg-primary-foreground rounded-sm"></div>
              <span className="text-sm text-primary-foreground">Google Maps</span>
            </div>
            <div className="relative h-40 w-full">
              <Image
                src={poi.googleMapsUrl || "/placeholder.svg?height=160&width=320"}
                alt="Google Maps view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="bg-primary px-3 py-1.5 flex items-center">
              <div className="w-4 h-4 mr-2 bg-primary-foreground rounded-sm"></div>
              <span className="text-sm text-primary-foreground">MapCreator</span>
            </div>
            <div className="relative h-40 w-full">
              <Image
                src={poi.mapCreatorUrl || "/placeholder.svg?height=160&width=320"}
                alt="MapCreator view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="bg-primary px-3 py-1.5 flex items-center">
              <div className="w-4 h-4 mr-2 bg-primary-foreground rounded-sm"></div>
              <span className="text-sm text-primary-foreground">Google Drive</span>
            </div>
            <div className="relative h-40 w-full">
              <Image
                src={poi.googleDriveUrl || "/placeholder.svg?height=160&width=320"}
                alt="Google Drive view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="bg-primary px-3 py-1.5 flex items-center">
              <div className="w-4 h-4 mr-2 bg-primary-foreground rounded-sm"></div>
              <span className="text-sm text-primary-foreground">Map Creator Drive</span>
            </div>
            <div className="relative h-40 w-full">
              <Image
                src={poi.mapCreatorDriveUrl || "/placeholder.svg?height=160&width=320"}
                alt="Map Creator Drive view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        {/* Questions */}
        <div className="py-4 px-0 sm:px-4 space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="rounded-lg p-3 border flex justify-between items-center">
              <div className="text-sm">{question}</div>
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`rounded-full border w-8 h-8 p-0 ${poiAnswers[question] === "yes" ? "bg-emerald-600 text-white" : " hover:bg-emerald-600/70"
                          }`}
                        onClick={() => handleAnswer(question, "yes")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Yes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`rounded-full border w-8 h-8 p-0 ${poiAnswers[question] === "no" ? "bg-red-600 text-white" : " hover:bg-red-600/70"
                          }`}
                        onClick={() => handleAnswer(question, "no")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>No</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`rounded-full border w-8 h-8 p-0 ${poiAnswers[question] === "notsure" ? "bg-yellow-600 text-white" : " hover:bg-yellow-600/70"
                          }`}
                        onClick={() => handleAnswer(question, "notsure")}
                      >
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Not sure</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </div>
            </div>
          ))}
        </div>
        {/* Reference URL */}
        <div className="py-2 px-0 sm:px-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg border p-2">
              <LinkIcon className="h-5 w-5 " />
            </div>
            <Input
              placeholder="Enter URL for Reference"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleReferenceSubmit()
                }
              }}
            />
            <Button onClick={handleReferenceSubmit}>
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

