
import './App.css'
import Home from './Components/home/Home'
import Products from './Components/Products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element = { <Home /> } />
          <Route path= '/products' element = { <Products /> } />
        </Routes>
      </Router>  
    </>
  ) 
}

export default App
