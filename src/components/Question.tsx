import { useRef } from 'react'
import {type GameQuestion} from '../state/models'
import { Button, Card, TextInput, Title } from '@mantine/core'


interface QuestionProps {
  onResponse: (outcome: boolean) => void
  question: GameQuestion
}

const Question = ({question, onResponse}: QuestionProps) => {

  const reponseRef = useRef<HTMLInputElement>(null)
  const onSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    onResponse((reponseRef.current?.value.toLowerCase())===question.response.toLowerCase())
  }

  return (
    <Card>
      <Card.Section>
        <Title
          order={2}
        >
          {question.question}
        </Title>
      </Card.Section>
      <Card.Section>
        <form onSubmit={onSubmit}>
          <TextInput
            label="Réponse: "
            ref={reponseRef}
          />
          <Button 
            type='submit'
          >
            Soumettre
          </Button>
        </form>
      </Card.Section>
    </Card>
  )
}

export default Question