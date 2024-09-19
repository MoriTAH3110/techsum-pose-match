import { useNavigate } from "react-router-dom"
import { poseImageDictionary } from "../MainGame/PoseDictionary"

const How = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/play")}>
      How?
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