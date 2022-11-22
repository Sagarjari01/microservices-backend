const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:[String],
        required:true,
        default:"NA"
    }
})

mongoose.model('Users',UserSchema)