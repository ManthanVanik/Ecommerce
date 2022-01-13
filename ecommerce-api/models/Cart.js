const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        products:[
            {
                productId:{
                    type:String,
                    required: true
                },
                title:{
                    type: String,
                    required: true,
                },
                img:{
                    type:String,
                    required:true
                },
                size:{
                    type: String,
                },
                color:{
                    type: String,
                },
                price:{
                    type:Number,
                    required:true
                },
                quantity:{
                    type:Number,
                    default: 1
                }
            }
        ],
        bill: {
            type: Number,
            required: true,
            default: 0
        }
    }, 
    { timestamps:true }
);

module.exports = mongoose.model("Cart",CartSchema);