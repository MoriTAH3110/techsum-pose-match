import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import BodyPosePredict from "./components/BodyPosePredict"
import MainGame from "./components/MainGame/MainGame"
import Ready from "./components/Ready/Ready"
import How from "./components/How/How"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ready />} />
        <Route path="/how" element={<How />} />
        <Route path="/play" element={<MainGame />} /> {/* Add ?debug=true for debug mode */}
        <Route path="/predict" element={<BodyPosePredict />} />
      </Routes>
    </Router>
  )
}

export default App
