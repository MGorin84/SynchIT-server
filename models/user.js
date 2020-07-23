const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//define user

const User = new Schema ({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    position:{
        type: String
    },
    role:{
        type: String
    },
    availability: [{
        day: String,
        time_of_day: String
    }]
})

// plugin the passport-local-mongoose middleware with our User schema
User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)