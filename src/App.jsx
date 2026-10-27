import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/home'
import Bmi from './pages/bmi'
import Bmr from './pages/bmr'
import Car from './pages/car'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bmi' element={<Bmi />} />
        <Route path='/bmr' element={<Bmr />} />
        <Route path='/car' element={<Car />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App