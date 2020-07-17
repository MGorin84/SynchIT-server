const mongoose = require ("mongoose")
const Schema = mongoose.Schema

//define user

const User = new Schema ({
    name: {
        type: String,
        required: true
    },
    role:{
        type: String
    },
    availability: {
        type: Object
    }
})
module.exports = mongoose.model("User", User)