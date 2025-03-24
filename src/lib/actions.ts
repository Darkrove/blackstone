"use server"

import type { POI } from "./store"

// Mock database of POIs
const mockPOIs: POI[] = [
  {
    id: "784thqdz-9420d0ab06e447b090cf779f967c7020",
    name: "Papa B's Chicken & Fish",
    type: "Restaurant",
    coins: 10,
    address: "133 W Oak St, Louisville, KY 40203, United States",
    googleMapsUrl: "/placeholder.svg?height=160&width=320",
    mapCreatorUrl: "/placeholder.svg?height=160&width=320",
    googleDriveUrl: "/placeholder.svg?height=160&width=320",
    mapCreatorDriveUrl: "/placeholder.svg?height=160&width=320",
  },
  {
    id: "784thqdz-9420d0ab06e447b090cf779f967c7021",
    name: "Green Leaf Cafe",
    type: "Cafe",
    coins: 15,
    address: "456 Main St, Louisville, KY 40202, United States",
    googleMapsUrl: "/placeholder.svg?height=160&width=320",
    mapCreatorUrl: "/placeholder.svg?height=160&width=320",
    googleDriveUrl: "/placeholder.svg?height=160&width=320",
    mapCreatorDriveUrl: "/placeholder.svg?height=160&width=320",
  },
  {
    id: "784thqdz-9420d0ab06e447b090cf779f967c7022",
    name: "City Market",
    type: "Grocery",
    coins: 12,
    address: "789 Broadway, Louisville, KY 40204, United States",
    googleMapsUrl: "/placeholder.svg?height=160&width=320",
    mapCreatorUrl: "/placeholder.svg?height=160&width=320",
    googleDriveUrl: "/placeholder.svg?height=160&width=320",
    mapCreatorDriveUrl: "/placeholder.svg?height=160&width=320",
  },
]

/**
 * Server action to fetch POIs
 */
export async function getPOIs(): Promise<POI[]> {
  // In a real app, this would fetch from a database
  // For now, we'll just return the mock data

  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log("Server action returning POIs:", mockPOIs)
  return mockPOIs
}

/**
 * Server action to submit quiz answers
 */
export async function submitQuizAnswers(answers: Record<string, Record<string, string>>): Promise<boolean> {
  // In a real app, this would submit to a database
  console.log("Submitting answers:", JSON.stringify(answers, null, 2))

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return success
  return true
}

