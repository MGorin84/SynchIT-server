const fs = require("fs")
const dataFile = "../data/users.json"
let users = require(dataFile)

// returns all users
function getAllUsers(req) {
    return users
}

// returns user bu id
function getUserById(req) {
    let user = users[req.params.id]
    if(user) return user
    req.error = "User not found"
}

// helper function used for tests
function loadData(file) {
    users = JSON.parse(fs.readFileSync(file, 'utf8'))
}

module.exports = {getAllUsers, getUserById, loadData}