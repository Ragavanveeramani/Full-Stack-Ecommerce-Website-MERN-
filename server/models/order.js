import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
       userId : {type:String,required:true,ref:'user'},
       items:[{
               product : {type:String,required:true,ref:'product'},
               quantity : {type:Number,required:true},

       }],
       amount : {type:Number,required:true},
       address : {type:mongoose.Schema.Types.ObjectId,required:true,ref:'address'},
       status : {type:String,default:'Order Placed'},
       paymenttype : {type:String,required:true},
       isPaid : {type:Boolean,required:true,default:false},
    },{timestamps:true})

const Order = mongoose.models.Order || mongoose.model('order',orderSchema)

export default Order