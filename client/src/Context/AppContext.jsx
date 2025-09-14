import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';



axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  // Load user from localStorage on initial render
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cartChanged, setCartChanged] = useState(false);

    

    // fetch seller status
    const fetchSeller = async()=>{
      try {
        const {data} = await axios.get('/api/seller/is-auth')
        if (data.success) {
          setIsSeller(true);
          console.log("worked")
        } else{
          setIsSeller(false);

        }
      } catch (error) {
           setIsSeller(false);

      }
    }

    // fetch user Auth status ,User Data and Cart items

    const fetchUser = async()=>{
      try {
        const {data} = await axios.get('/api/user/is-auth');
        if (data.success) {
          console.log('User from server:', data.user);
          setUser(data.user)
          setCartItems(data.user.cartItems )
        }
      } catch (error) {
        setUser(null)
        setCartLoaded(true);
      } finally{
        setCartLoaded(true);
      }
    }


// fetch all products

  const fetchProducts = async()=>{
    try {
      const {data} = await axios.get('/api/product/list')
      if (data.success) {
        setProducts(data.products)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
  }

  const addToCart = (itemsId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemsId]){
      cartData[itemsId] +=1;
    }else{
      cartData[itemsId] = 1;
    }
    setCartItems(cartData);
    setCartChanged(true);
    toast.success("Added to cart")
  }
  //updatecart item quantity
  const updateCartItem = (itemsId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemsId] = quantity;
    setCartItems(cartData)
    setCartChanged(true);
    toast.success("Cart Updated")
  }
  //remove product fron cart

  const removeFromCart = (itemsId)=>{
    let cartData = structuredClone(cartItems);
    if (cartData[itemsId]) {
      cartData[itemsId] -= 1;
      if(cartData[itemsId] === 0){
        delete cartData[itemsId];
      }
    }
    toast.success("Removed from cart")
    setCartItems(cartData)
    setCartChanged(true);
  }

  //Get Cart Item count
  const getCartCount =()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item]
    }
    return totalCount;
  }

  //Get Cart total Amount

  const getCartAmount= ()=>{
    let totalAmount = 0;
    for (const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items || product.id === items)
      if(cartItems[items]>0){
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }
    }
    return Math.floor(totalAmount * 100)/100;
  } 

  



  useEffect(()=>{
      fetchUser()
      fetchSeller()
      fetchProducts()
 
  },[])

  //update database cartitem
  useEffect(()=>{
      const updateCart = async()=>{
        try {
          const {data} = await axios.post('/api/cart/update',{cartItems})

          if(!data.success){
            toast.error(data.message);
            console.log(error);
          }

        } catch (error) {
          toast.error(error.message);
        }
      }

      if(user && cartLoaded){
        updateCart()

      }

  },[cartItems,user,cartLoaded])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => {
  return useContext(AppContext);
};

