
import './App.css'
import Home from './Components/home/Home'
import Products from './Components/Products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Shared/Navbar'
import About from './Components/Shared/About'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path = '/' element = { <Home /> } />
          <Route path= '/products' element = { <Products /> } />
          <Route path= '/about' element = { <About /> } />
        </Routes>
      </Router>  
    </>
  ) 
}

export default App
