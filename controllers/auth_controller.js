const passport = require("passport")
const User = require("../models/user")

const register = function (req, res) {
    User.register(new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email
    }), req.body.password, function (err) {
        if (err) {
            res.status(500)
            res.json({
                error: err
            })
        } else {
            // Log in the newly registered user
            passport.authenticate('local')(req, res, function () {
				// See what we have
                console.log('authenticated', req.user.username)
                console.log('session object:', req.session)
                console.log('req.user:', req.user)
				// send back the user
                res.json(req.user)
            })
        }
    })
}



module.exports = { register }