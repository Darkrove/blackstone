import { create } from "zustand"
import { POI } from "@/lib/mock-data"

interface QuizState {
  // State
  poiList: POI[]
  currentPOIIndex: number
  totalPOIs: number
  answers: Record<string, Record<string, string>>
  isLoading: boolean
  canAttemptToday: boolean

  // Actions
  initializeQuiz: (pois: POI[]) => void
  setCurrentPOIIndex: (index: number) => void
  setAnswer: (poiId: string, question: string, answer: string) => void
  resetQuiz: () => void
  setCanAttemptToday: (canAttempt: boolean) => void
  setLoading: (isLoading: boolean) => void // Add this action
}

export const useQuizStore = create<QuizState>((set) => ({
  // Initial state
  poiList: [],
  currentPOIIndex: 0,
  totalPOIs: 0,
  answers: {},
  isLoading: true,
  canAttemptToday: true,

  // Actions
  initializeQuiz: (pois: POI[]) => {
    set({
      poiList: pois,
      currentPOIIndex: 0,
      totalPOIs: pois.length,
      answers: {},
      isLoading: false,
    })
  },

  setCurrentPOIIndex: (index: number) => {
    set({ currentPOIIndex: index })
  },

  setAnswer: (poiId: string, question: string, answer: string) => {
    set((state) => {
      const poiAnswers = state.answers[poiId] || {}

      return {
        answers: {
          ...state.answers,
          [poiId]: {
            ...poiAnswers,
            [question]: answer,
          },
        },
      }
    })
  },

  resetQuiz: () => {
    set({
      poiList: [],
      currentPOIIndex: 0,
      totalPOIs: 0,
      answers: {},
      isLoading: true,
    })
  },

  setCanAttemptToday: (canAttempt: boolean) => {
    set({ canAttemptToday: canAttempt })
  },

  // Add this action
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
}))

