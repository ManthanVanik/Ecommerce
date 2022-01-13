const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type:String,
            required: true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        address: {
            house:{
                type: String,
                default: ""
            },
            area:{
                type: String,
                default: ""
            },
            landmark:{
                type: String,
                default: ""
            },
            city:{
                type: String,
                default: ""
            },
            state:{
                type: String,
                default: ""
            },
            pincode:{
                type: String,
                default: ""
            }
        }
    }, 
    { timestamps:true }
);

module.exports = mongoose.model("User",UserSchema);