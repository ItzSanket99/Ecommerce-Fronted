
import './App.css'
import Home from './Components/home/Home'
import Products from './Components/Products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Shared/Navbar'
import About from './Components/Shared/About'
import Contact from './Components/Shared/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './Components/cart/Cart'
import LogIn from './Components/auth/LogIn'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path = '/' element = { <Home /> } />
          <Route path= '/products' element = { <Products /> } />
          <Route path= '/about' element = { <About /> } />
          <Route path= '/contact' element = { <Contact /> } />
          <Route path= '/cart' element = { <Cart /> } />
          <Route path= '/login' element = { <LogIn /> } />
        </Routes>
      </Router>  
      <Toaster position='top-center'/>
    </>
  ) 
}

export default App
