const { getAllUsers, getUserById, addUser, deleteUser, updateUser } = require("../utils/users_utils")

//get all users
const getUsers = function (req,res) {
    getAllUsers(req)
        .exec((error, users) => {
            if(error){
                res.status(500)
                return res.json({
                    error: error.message
                })
            }
        res.send(users);
    });
};

//get user by id
const getUser = function(req,res) {
    //executes query from getUserById
    getUserById(req).exec((error, user) => {
        if (error) {
          res.status(404);
          return res.send("User not found");
        }
        res.send(user);
      });
};

//add a user
const makeUser = function(req,res){
    //save user instance from adUser
    addUser(req).save((error, user) => {
        if (error) {
          res.status(500);
          return res.json({
            error: error.message
          });
        }
        res.status(201);
        res.send(user);
      });
};

//remove user
const removeUser = function(req,res) {
    // execute the query from deleteUser
    deleteUser(req.params.id).exec((error) => {
        if (error) {
        res.status(500);
        return res.json({
            error: error.message
        });
        }
        res.sendStatus(204);

    });
};

//update user
const changeUser = function(req, res) {
    // execute the query from updateUser
  updateUser(req).exec((error, user) => {
    if (error) {
      res.status(500);
      return res.json({
        error: error.message
      });
    }
    res.status(200);
    res.send(user);
  });
};

module.exports = {getUsers, getUser, makeUser, removeUser, changeUser}