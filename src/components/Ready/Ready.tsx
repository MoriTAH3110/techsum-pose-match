import { useNavigate } from "react-router-dom"

const Ready = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/how")}>
      Are you ready?
      <button>
        Lets Go!!!!
      </button>
    </div>
  )
}

export default Ready