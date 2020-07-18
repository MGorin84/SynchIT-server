const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const authRouter = require("./routes/auth_routes");
const userRouter = require("./routes/users_routes");

// set port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// create server
const app = express();
// call the middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


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

app.use(session({
    //resave and saveUninitialized set to false for deprecation warnings
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

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Define a simple route for GET
app.get('/', (req, res) => {
<<<<<<< HEAD
    console.log("get on /");
    req.session.timesVisited ?
        req.session.timesVisited++ : req.session.timesVisited = 1;
    res.send(`You have visited ${req.session.timesVisited} times!`);
}) 
=======
    console.log('get on /');
    console.log('req.session', req.session)
    console.log('req.user', req.user)
    res.send('got your request');
})
>>>>>>> cc1cf750353ba0a6fff3bae3a8e47213c52783f7

// use the user router for all requests on users
app.use('/users', userRouter);
app.use("/auth", authRouter)

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));