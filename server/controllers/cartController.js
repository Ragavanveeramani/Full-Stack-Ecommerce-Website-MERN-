import user from "../models/user.js"

//update user cartdata  :  /api/cart/update



export const  updateCart = async(req,res)=>{
    try {
           const userId = req.user?.id;              
        const {  cartItems} = req.body;
        await user.findByIdAndUpdate(userId,{cartItems})
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

