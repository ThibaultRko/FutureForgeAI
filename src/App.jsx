import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/HomePage'
import Cargus from './Pages/Cargus'
import About from './Pages/About'
import PenToPixel from './Pages/PenToPixel'


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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
