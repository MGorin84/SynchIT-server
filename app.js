const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const userRouter = require("./routes/users_routes")

// set port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// create server
const app = express();

// call the middleware
app.use(cors());
app.use(bodyParser.json());

//database connection
const dbConn = "mongodb://localhost/SynchIT"

mongoose.connect(
    dbConn,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false  
    },
    error => {
        if (error) {
            console.log("Error connecting to a database", error)
        }else{
            console.log("Connected to the database")
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
// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));