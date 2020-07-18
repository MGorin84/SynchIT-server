const express = require("express")
const {getUsers, getUser, makeUser, removeUser, changeUser, userAuthenticated, verifyOwner} = require("../controllers/users_controller")

// create the router
const router = express.Router()

//GET on /users
router.get("/", getUsers)

//GET on /users/:id
router.get("/:id",userAuthenticated, getUser)

//POST on /users
router.post("/",userAuthenticated, makeUser)

//delete users
router.delete("/:id",userAuthenticated,verifyOwner,removeUser )

//update user
router.put("/:id",userAuthenticated,verifyOwner,changeUser)

router.patch("/:id",userAuthenticated,verifyOwner,changeUser)

// export the router
module.exports = router

