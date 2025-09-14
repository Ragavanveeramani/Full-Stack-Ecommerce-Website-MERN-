import React, { useContext } from 'react'
import  Navbar  from './Components/Navbar'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from 'react-hot-toast'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './Context/AppContext'
import AllProducts from './Pages/AllProducts'
import ProductCategory from './Pages/ProductCategory'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import { UseAppContext } from './Context/AppContext'
import AddAddress from './Pages/AddAddress'
import MyOrder from './Pages/MyOrder'
import SellerLogin from './Components/seller/sellerLogin'
import SellerLayout from './Pages/seller/SellerLayout'
import AddProduct from './Pages/seller/AddProduct'
import ProductList from './Pages/seller/ProductList'
import Order from './Pages/seller/Order'




const App = () => {


    const isSellerPath = useLocation().pathname.includes("seller");
    const {showUserLogin,isSeller} = UseAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath?null: <Navbar/>}
      {showUserLogin ? <Login/> : null}

      <Toaster/>
      <div className={` ${isSellerPath? "": "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path = '/' element={<Home/>}/>
           <Route path='/products' element={<AllProducts/>}/>
           <Route path='/products/:category' element={<ProductCategory/>} />
           <Route path='/products/:category/:id' element={<ProductDetails/>} />
           <Route path='/cart' element={<Cart/>} />
           <Route path='/add-address' element={<AddAddress/>} />
           <Route path='/my-orders' element={<MyOrder/>} />
           <Route path='/seller' element={isSeller ? <SellerLayout/>:<SellerLogin/>} >
                 <Route index element={isSeller? <AddProduct/>:null}/>
                 <Route path='product-list' element={<ProductList/>}/>
                 <Route path='orders' element={<Order/>}/>
          </Route>

               
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App