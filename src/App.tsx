import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Test } from "./components/Test/Test"
import { Training } from "./components/Training/Training"
import TeachableMachine from "./components/TeachableMachine"
import BodyPosePredict from "./components/BodyPosePredict"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/train" element={<Training />} />
        <Route path="/teachable" element={<TeachableMachine />} />
        <Route path="/predict" element={<BodyPosePredict />} />
      </Routes>
    </Router>
  )
}

export default App
