import { useNavigate } from "react-router-dom"
import { Heading } from "../Heading/Heading"
import { Button } from "../Button/Button"
import { Marquee } from "../Marquee/Marquee"
import { PatternContainer } from "../PatternContainer/PatternContainer.styles"

const Ready = () => {

  const navigate = useNavigate()

  return (
    <PatternContainer onClick={() => navigate("/how")}>
      <Marquee>tech summit 2024 -</Marquee>
      <Heading>Are <br/> you <br/> ready?</Heading>
      <Button>
        Lets Go!!!!
      </Button>
    </PatternContainer>
  )
}

export default Ready