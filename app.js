const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")(session)
const userRouter = require("./routes/users_routes")

// set port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// create server
const app = express();
// call the middleware
app.use(cors());
app.use(bodyParser.json());

//
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


//database connection
const dbConn = process.env.MONGODB_URI ||"mongodb://localhost/SynchIT"

mongoose.connect(
    dbConn,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true  
    },
    error => {
        if (error) {
            console.log("Error connecting to a database", error)
        }else{
            console.log("Connected to the database SynchIT")
        }
    }
)

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Welcome to SynchIT server!")
});

// 

// use the user router for all requests on users
app.use('/users', userRouter);

// Use cors
const whitelist = ['https://admiring-dijkstra-36720e.netlify.app/']
app.use(cors({
    credentials: true,
    origin: function (origin,callback) {
        // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
        const whitelistIndex = whitelist.findIndex((url) => url.includes(origin))
        console.log("found whitelistIndex", whitelistIndex)
        callback(null,whitelistIndex > -1)
    }
}));
app.use(session({
    // resave and saveUninitialized set to false for deprecation warnings
    secret: "Express is awesome",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));