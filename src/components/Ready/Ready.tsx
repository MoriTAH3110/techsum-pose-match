import { useNavigate } from "react-router-dom"

const Ready = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/how")}>
      <p>tech summit 2024 - tech summit 2024 - tech summit 2024</p>
      Are you ready?
      <button>
        Lets Go!!!!
      </button>
    </div>
  )
}

export default Ready