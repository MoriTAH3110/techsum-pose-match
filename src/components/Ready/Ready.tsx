import { useNavigate } from "react-router-dom"
import { Heading } from "../Heading/Heading"

const Ready = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/how")}>
      <p>tech summit 2024 - tech summit 2024 - tech summit 2024</p>
      <Heading>Are <br/> you <br/> ready?</Heading>
      <button>
        Lets Go!!!!
      </button>
    </div>
  )
}

export default Ready