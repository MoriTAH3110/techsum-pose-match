import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Test } from "./components/Test/Test"
import { Training } from "./components/Training/Training"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/train" element={<Training />} />
      </Routes>
    </Router>
  )
}

export default App
