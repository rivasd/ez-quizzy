import { useRef } from 'react'
import {type GameQuestion} from '../state/models'
import { Button, Card, Center, TextInput, Title } from '@mantine/core'


interface QuestionProps {
  onResponse: (outcome: boolean) => void
  question: GameQuestion
}

const Question = ({question, onResponse}: QuestionProps) => {

  const reponseRef = useRef<HTMLInputElement>(null)
  const onSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    if(reponseRef.current) reponseRef.current.value = ""
    onResponse((reponseRef.current?.value.toLowerCase())===question.response.toLowerCase())
  }

  return (
    <Card shadow='sm' padding="lg" withBorder radius="md">
      
        <Title
          order={2}
        >
          {question.question}
        </Title>
      
      
        <form onSubmit={onSubmit}>
          <TextInput
            label="Réponse: "
            ref={reponseRef}
          />
          <Center mt="lg">
            <Button 
              type='submit'
              >
              Soumettre
            </Button>
          </Center>
        </form>
      
    </Card>
  )
}

export default Question