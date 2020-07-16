const fs = require("fs")
let dataFile = "data/users.json"
let users = require(`../${dataFile}`)

// returns all users
function getAllUsers(req) {
    return users
}

// returns user by id
function getUserById(req) {
    let user = users[req.params.id]
    if(user) return user
    req.error = "User not found"
}

//
function addUser(req) {
    try{
        const {name, availability} = req.body
        const date = Date.now()

        const newUser = {
            name: name,
            availability: availability,
            create_date: date,
            modified_date: date
        }
        // Add to Users (in memory)
	    users[getNextId()] = newUser
	    // Save updated blogPosts to the file
	    fs.writeFileSync(`./${dataFile}`, JSON.stringify(users))
	    return newUser
    }
    catch(error) {
		req.error = error
	}
}

//delete user
function deleteUser(req) {
    const id = req.params.id
    try {
    if (users[id]){
         delete users[id]
         fs.writeFileSync(`./${dataFile}`, JSON.stringify(users))
         
    }else{
        req.status = 404
        req.error = "User not found"
    }
    return users
    }
    catch(error) {
        req.status = 400
        req.error = error
    }
}

function updateUser(req) {
    try {
        let id = req.params.id
        let existingUser = users[id]

        if(users[id]) {
            const {name, availability} = req.body
            const date = Date.now()
     
            const updatedUser = {
                name: name,
                availability: availability,
                create_date: existingUser.create_date,
                modified_date: date
            }
            users[id] = updatedUser
            fs.writeFileSync(`./${dataFile}`, JSON.stringify(users))
            return updatedUser
        }else{
            req.status = 400
            req.error = "User not found"
        }
    }
    catch(error) {
        req.status = 500
        req.error = error
    }
}

// helper function used for tests
function loadData(file) {
	dataFile = file
	users = JSON.parse(fs.readFileSync(file, 'utf8'))
}


// helper function to generate unique id
function getNextId() {
	let ids = Object.keys(users).sort()
	let lastId = (ids.length > 0) ? ids[ids.length-1] : 0
	return parseInt(lastId) + 1
}


module.exports = {getAllUsers, getUserById, loadData, addUser, deleteUser, updateUser, getNextId}