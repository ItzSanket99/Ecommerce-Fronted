
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
import SignUp from './Components/auth/SignUp'
import Checkout from './Components/checkout/Checkout'
import PaymentConfirmation from './Components/checkout/PaymentConfirmation'
import AdminLayout from './Components/admin/AdminLayout'
import Dashboard from './Components/admin/DashBoard/Dashboard'
import AdminProducts from './Components/admin/Products/AdminProducts'
import Sellers from './Components/admin/Sellers/sellers'
import Categories from './Components/admin/Categories/categories'
import Orders from './Components/admin/Orders/Orders'

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
          
          {/* public route */}
          <Route path='/' element={<PrivateRoutes publicPage />}>
            <Route path= '/login' element = { <LogIn /> } />  
            <Route path='/register' element = { <SignUp /> } />
          </Route>
          
          <Route path='/' element={<PrivateRoutes adminOnly />} >
            <Route path='/admin' element={<AdminLayout />} >
              <Route path='' element={<Dashboard />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='categories' element={<Categories />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='orders' element={<Orders />} />
            </Route>
          </Route>

          {/* private route */}
          <Route path='/' element={<PrivateRoutes />}>
            <Route path='/checkout' element = { <Checkout /> } />
            <Route path='/order-confirm' element = { <PaymentConfirmation /> } />
          </Route>

        </Routes>
      </Router>  
      <Toaster position='top-center'/>
    </>
  ) 
}

export default App
