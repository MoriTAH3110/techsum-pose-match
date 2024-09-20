import { useNavigate } from "react-router-dom"
import { Heading } from "../Heading/Heading"
import { Button } from "../Button/Button"

const Ready = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/how")}>
      <p>tech summit 2024 - tech summit 2024 - tech summit 2024</p>
      <Heading>Are <br/> you <br/> ready?</Heading>
      <Button>
        Lets Go!!!!
      </Button>
    </div>
  )
}

export default Ready