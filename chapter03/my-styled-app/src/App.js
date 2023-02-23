import { Button } from "./components/Button"
import Card from "./components/Card"
import Container from "./components/Container"
import Title from "./components/Title"

function App() {
  return <>
    <Container>
      <Title>Hello World</Title>
      <br/><br/>
      <Button>My Button</Button>
      <Button outline>My Outline Button</Button>
      <Button warning>My Warning Button</Button>
      <br/><br/>
      
      <Card>
        Card without title
      </Card>

      <br/>

      <Card title="The Title">
        Card with title
      </Card>

    </Container>
  </>
}

export default App
