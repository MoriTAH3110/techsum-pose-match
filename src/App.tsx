import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import BodyPosePredict from "./components/BodyPosePredict"
import MainGame from "./components/MainGame/MainGame"
import Ready from "./components/Ready/Ready"
import How from "./components/How/How"
import { defaultTheme } from "./theme/DefaultTheme"
import Summary from "./components/Summary/Summary"

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Ready />} />
          <Route path="/how" element={<How />} />
          <Route path="/play" element={<MainGame />} /> {/* Add ?debug=true for debug mode */}
          <Route path="/summary" element={<Summary />} />
          <Route path="/predict" element={<BodyPosePredict />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
