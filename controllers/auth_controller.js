const passport = require("passport")
const User = require("../models/user")

const register = function (req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        position: req.body.position,
        role: req.body.role || "user"

    }), req.body.password, function (err) {
        if (err) {
            res.status(500)
            res.json({
                error: err
            })
        } else {
            // Log in the newly registered user
            loginUser(req, res)
        }
    })
}

const authenticate = passport.authenticate("local")

// helper function
function loginUser(req, res) {
    // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success    
    authenticate(req, res, function () {
        console.log("authenticated", req.user.username)
        console.log("session object:", req.session)
        console.log("req.user:", req.user)
        res.json(req.user)
    })
}

const logout = function(req, res) {
	req.logout()
	console.log("logged out user")
	console.log("session object:", req.session)
	console.log("req.user:", req.user)
	res.sendStatus(200)
}

const authenticatedUser = function(req, res) {
    if(req.user) {
        res.status(200)
        res.send(req.user)
    }else{
        res.sendStatus(204)
    }
}

module.exports = { register, login: loginUser, logout, authenticatedUser }