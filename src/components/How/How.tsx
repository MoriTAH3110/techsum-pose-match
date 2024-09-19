import { useNavigate } from "react-router-dom"
import { poseImageDictionary } from "../MainGame/PoseDictionary"
import { Heading } from "../Heading/Heading"

const How = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/play")}>
      <Heading>How?</Heading>
      <ul>
        <li>Do the poses</li>
        <li>Earn points</li>
        <li>Be fast, the clock is ticking</li>
      </ul>
      <img src={poseImageDictionary["inTheSkyMessi"]} />
    </div>
  )
}

export default How