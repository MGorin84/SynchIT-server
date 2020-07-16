const { getAllUsers, getUserById, addUser, deleteUser, updateUser } = require("../utils/users_utils")

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

//add a user
function makeUser(req,res){
    const newUser = addUser(req)
    if (newUser) {
        res.status(201)
        res.send(newUser)
    }else{
        res.status(500)
        res.send(req.error)
    }
}

//remove user
function removeUser(req,res) {

    let users = deleteUser(req)
    if(req.error) {
        res.status(req.status)
        res.send(req.error)
    }
    else {
        res.send(users)
    }

}

//update user
function changeUser(req, res) {
    let updatedUser = updateUser(req)
    if(req.error) {
        res.status(req.status)
        res.send(req.error)
    }
    else {
        res.send(updatedUser)
    }
}



module.exports = {getUsers, getUser, makeUser, removeUser, changeUser}