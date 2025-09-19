import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { Game } from './models'


const initialGameState: Game = {
  errors: 0,
  maxTimeMinutes: 15,
  step: -1,
  questions: [
    {
      question: "Quelle est la capitale de la France ?",
      response: "Paris"
    }
  ],
}

export const useGameStore = create<Game & {
  setErrors: (errCount: number) => void
  setStep: (newStep: number) => void
  markQuestion: (qIndex: number, correct: boolean) => void
}>(combine(
  initialGameState, 
  (set) => {
    return {
      setErrors: (errCount: number) => 
        set(()=>({
          errors: errCount
        })),
      setStep: (newStep: number) => set(
        ()=>({
          step:newStep
        })
      ),
      markQuestion: (qIndex: number, correct: boolean) => set(
        (state) => {
          const updatedQuestions = [...state.questions]
          updatedQuestions[qIndex] = {...updatedQuestions[qIndex], correct}
          return {questions: updatedQuestions}
        }
      )
    }
  }
))