import { Button, Center, Container, Group, Paper, Stack, Text } from "@mantine/core"
import {useGameStore} from '../state/store'
import Question from "./Question"
import { useEffect, useState } from "react"


const Game = ()=>{

  const {
    markQuestion, 
    setErrors,
    setStep,
    questions, 
    step, 
    errors, 
    maxTimeMinutes
  } = useGameStore()
  const maxTimeinMs = maxTimeMinutes*60*1000

  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0) // in seconds

  useEffect(()=>{
    let intervalId: number

    if(startTime){
      intervalId = setInterval(()=>{
        setElapsedTime((elapsed)=>elapsed+1)
      }, 1000)
    }
    return ()=> clearInterval(intervalId)
  }, [startTime])

  const onResponse = (correct: boolean)=>{
    markQuestion(step, correct)
    if(!correct) setErrors(errors+1)
    setStep(step+1)
  }

  const onStart = ()=>{
    setStep(0)
    setErrors(0)
    setStartTime(new Date())
    setElapsedTime(0)
  }
  const remainingSeconds = startTime ? Math.max(0, Math.floor((maxTimeinMs - elapsedTime*1000)/1000)) : maxTimeinMs/1000
  const isTimeOver = startTime ? (Date.now() > (maxTimeinMs+startTime.getTime())) : false
  const isGameOver = step >= questions.length || isTimeOver

  if(step >= questions.length && startTime){
    setStartTime(null)
    setElapsedTime(0)
  }

  return (
    <Container h={"100%"} fluid >
      <Center mih="700px">
        <Stack>
          <Group>
            <Paper>
              <Text>Question {step+1} / {questions.length}</Text>
            </Paper>
            <Paper>
              <Text>Erreurs: {errors} </Text>
            </Paper>
            <Paper>
              <Text>Temps Restant: {`${Math.floor(remainingSeconds / 60)}m:${remainingSeconds % 60}s`} </Text>
            </Paper>
          </Group>
          {step<0 ? 
          <Button onClick={onStart}>
            Débuter
          </Button>
          : 
          isGameOver ?
          <Paper>
            <Text>Jeu terminé ! Vous avez fait {errors} erreurs sur {questions.length} questions.</Text>
            <Button onClick={onStart}>
              Recommencer
            </Button>
          </Paper>
          :
          <Question 
            onResponse={onResponse}
            question={questions[step]}
          />
          }
        </Stack>
      </Center>
    </Container>
  )
}

export default Game