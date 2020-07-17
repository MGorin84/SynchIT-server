const User = require("../models/user")
const path = require("path")
const fs = require("fs")


// returns all users
const getAllUsers = function (req) {
    return User.find()
}

// returns user by id
const getUserById = function (req) {
    return User.findById(req.params.id)
  }

//
const addUser = function (req) {
    return new User(req.body)
}

//delete user
const deleteUser = function(id) {
    return User.findByIdAndRemove(id)
}

const updateUser = function(req) {
    return User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
}


module.exports = {getAllUsers, getUserById, addUser, deleteUser, updateUser}