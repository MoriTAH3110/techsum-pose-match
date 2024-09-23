import { useNavigate, useSearchParams } from "react-router-dom"
import { PatternContainer } from "../PatternContainer/PatternContainer.styles"
import { Marquee } from "../Marquee/Marquee"
import { Heading } from "../Heading/Heading"
import { SummaryStyle, TaiBaseStyle } from "./Summary.styles"
import Tai from "../../assets/images/Tai.png"
import NoTai from "../../assets/images/NoTai.png"

const Summary = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const score = searchParams.get("score")
  const scoreThreshold = 2000

  const taiToRender = parseInt(score ?? "0") > scoreThreshold ? Tai : NoTai

  return (
    <PatternContainer onClick={() => navigate("/")}>
      <Marquee>tech summit 2024 -</Marquee>
      <SummaryStyle>
        <Heading>TIME IS UP</Heading>
        <div className="score-wrapper">
          <p>YOUR SCORE</p>
          <h3>{score}</h3>
        </div>
      </SummaryStyle>
      <TaiBaseStyle src={taiToRender} />
    </PatternContainer>
  )
}

export default Summary