const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const authRouter = require("./routes/auth_routes");
const userRouter = require("./routes/users_routes");

// set port if deploying to external provider 
// or port assigned already
const port = process.env.PORT || 3030;

// create server
const app = express();
// call the middleware
app.use(cors({
    credentials: true,
    origin: (origin, cb)=>{
        cb(null, true)
    }
}));
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
            console.log("Connected to the database SynchIT",dbConn)
        }
    }
)
app.enable("trust proxy")
app.use(session({
    //resave and saveUninitialized set to false for deprecation warnings
    proxy: true,
    secret: "Express is awesome",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true,
        // sameSite: "none",
        // httpOnly: false,
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
    console.log('get on /');
    console.log('req.session', req.session)
    console.log('req.user', req.user)
    res.send('got your request');
})
// use the user router for all requests on users
app.use('/users', userRouter);
app.use("/auth", authRouter)

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));