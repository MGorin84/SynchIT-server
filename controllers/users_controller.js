const { getAllUsers, getUserById} = require("../utils/users_utils")

//get all users
function getUsers(req,res) {
    res.send(getAllUsers(req))

}

//get user by id
function getUser(req,res) {
    let user = getUserById(req)
    if(user) res.send(user)
    // if user id is not valid
    res.status(404)
    res.send(req.error)
}


module.exports = {getUsers, getUser}