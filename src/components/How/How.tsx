import { useNavigate } from "react-router-dom"

const How = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/play")}>
      How?
    </div>
  )
}

export default How