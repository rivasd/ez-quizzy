import { AppShell, Group, MantineProvider, Text, Title } from '@mantine/core'

import Game from './components/Game'

function App() {

  return (
    <MantineProvider>
      <AppShell
      header={{height: 60}}
      padding={"md"}
      >

        <AppShell.Header>
          <Group>
          <Title>
            EZ-Quizzy
          </Title>
          <Text>
            Un système de jeu questionnaire FACILE à utiliser
          </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Game />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export default App
