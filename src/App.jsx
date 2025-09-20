
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
import PrivateRoutes from './Components/Shared/PrivateRoutes'

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
          {/* private route */}
          <Route path='/' element={<PrivateRoutes publicPage />}>
            <Route path= '/login' element = { <LogIn /> } />
          </Route>
        </Routes>
      </Router>  
      <Toaster position='top-center'/>
    </>
  ) 
}

export default App
