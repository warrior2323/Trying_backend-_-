const mongoose = require('mongoose')

const UserSchema=mongoose.Schema(
    {
        username: {
            type:String,
            required:[true,"Please enter the username"]
        },
        password:{
            type:String,
            required:[true,"Please enter the password"]
        }
    },
    {
        timestamp:true
    }
)

const User=mongoose.model("User",UserSchema)
module.exports=User 