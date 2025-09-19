export interface GameQuestion {
  question: string
  response: string
  correct?: boolean
}

export interface Game {
  questions: GameQuestion[]
  step: number
  errors: number
  maxTimeMinutes: number
  // setErrors: (newErrCount: number) => void
  // setStep: (newStep: number) => void
  // markQuestion: (qIndex: number, correct: boolean) => void
}