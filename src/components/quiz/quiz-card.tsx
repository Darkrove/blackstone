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
import MapCard from "./map-card"
import { POI } from "@/lib/mock-data"

export default function QuizCard({ poi }: { poi: POI }) {
  const { setAnswer, answers } = useQuizStore()
  const [referenceUrl, setReferenceUrl] = useState(answers[poi.id]?.referenceUrl || "")

  const questions = [
    "Can you find any online evidence, such as Google Street View or Official website details, confirming this place is still Open ?",
    "Are there any recent reviews (from the past six months) for this place on any platforms ?",
    "Can this place be verified as Open through well known third-party platform (e.g. Yelp, TripAdvisor or Any similar website)?",
    "If reviews or information are unavailable, does the place appear Open based on any images (e.g., Google images, Social Media or Any other platform )?",
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
          <MapCard title="Google Maps" imageUrl={poi.googleMapsUrl}  linkUrl={`https://www.google.com/maps/search/${poi.displayLatitude},${poi.displayLongitude}`}/>
          <MapCard title="Map Creator" imageUrl={poi.mapCreatorUrl} linkUrl={`https://community.in.here.com/?l=${poi.displayLatitude},${poi.displayLongitude},18,satellite`} />
          <MapCard title="Google Drive" imageUrl={poi.googleDriveUrl} linkUrl={`https://www.google.com/maps?q=&layer=c&cbll=${poi.displayLatitude},${poi.displayLongitude}`} />
          <MapCard title="Map Creator Drive" imageUrl={poi.mapCreatorDriveUrl} linkUrl={`https://www.mapillary.com/app/?pKey=848009734071752&focus=photo&lat=${poi.displayLatitude}&lng=${poi.displayLongitude}&z=17`} />
        </div>
        {/* Questions */}
        <div className="py-4 px-0 sm:px-4 space-y-3">
          {questions.map((question, index) => (
            <div key={index} className="rounded-lg p-3 border flex flex-col sm:flex-row justify-between gap-2 items-center text-center sm:text-left">
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

