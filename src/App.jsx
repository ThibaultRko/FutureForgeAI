import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/HomePage'
import Cargus from './Pages/Cargus'
import About from './Pages/About'
import PenToPixel from './Pages/PenToPixel'
import DrawGuesser from './Pages/DrawGuesser'


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cargus" element={<Cargus />} />
            <Route path="/about" element={<About />} />
            <Route path="/pentopixel" element={<PenToPixel />} />
            <Route path="/drawguesser" element={<DrawGuesser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
