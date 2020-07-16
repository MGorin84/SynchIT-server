const express = require("express")
const {getUsers, getUser, makeUser, removeUser, changeUser} = require("../controllers/users_controller")

// create the router
const router = express.Router()

//GET on /users
router.get("/", getUsers)

//GET on /users/:id
router.get("/:id", getUser)

//POST on /users
router.post("/", makeUser)

//delete users
router.delete("/:id",removeUser )

//update user
router.put("/:id", changeUser)

// export the router
module.exports = router

