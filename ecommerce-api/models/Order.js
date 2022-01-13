const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        orders:[
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
                },
                address: {
                    house:{type: String},
                    area:{type: String},
                    landmark:{type: String},
                    city:{type: String},
                    state:{type: String},
                    pincode:{type: String}
                },
                status:{
                    type: String,
                    default: "pending"
                },
                date_added: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    }, 
    { timestamps:true }
);

module.exports = mongoose.model("Order",OrderSchema);