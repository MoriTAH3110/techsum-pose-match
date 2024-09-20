import { useNavigate } from "react-router-dom"
import { poseImageDictionary } from "../MainGame/PoseDictionary"
import { Heading } from "../Heading/Heading"
import { PatternContainer } from "../PatternContainer/PatternContainer.styles"
import { Ul, LiText, Img} from "./How.styles"

const How = () => {

  const navigate = useNavigate()

  return (
    <PatternContainer onClick={() => navigate("/play")}>
      <Heading>How?</Heading>
      <Ul>
        <li><LiText> Do the poses</LiText></li>
        <li><LiText> Earn points</LiText></li>
        <li><LiText> Be fast, the clock <br/> is ticking...</LiText></li>
      </Ul>
      <Img $left={-300} src={poseImageDictionary["innerPeaceSalah"]} />
      <Img $right={-350} src={poseImageDictionary["shooterYusuf"]} />
    </PatternContainer>
  )
}

export default How