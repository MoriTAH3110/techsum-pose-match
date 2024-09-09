import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import BodyPosePredict from "./components/BodyPosePredict"
import MainGame from "./components/MainGame/MainGame"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainGame />} />
        <Route path="/predict" element={<BodyPosePredict />} />
      </Routes>
    </Router>
  )
}

export default App
