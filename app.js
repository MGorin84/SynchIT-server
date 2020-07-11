const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users_routes")

// set port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// create server
const app = express();

// call the middleware
app.use(cors());
app.use(bodyParser.json());



// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Welcome to SynchIT server!")
});

// 

// use the user router for all requests on users
app.use('/users', userRouter);
// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));