const express = require("express")
const {getUsers, getUser} = require("../controllers/users_controller")

// create the router
const router = express.Router()

//GET on /users
router.get("/", getUsers)

//GET on /users/:id
router.get("/:id", getUser)

// export the router
module.exports = router