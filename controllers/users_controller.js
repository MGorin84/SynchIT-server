const { getAllUsers, getUserById, deleteUser, updateUser } = require("../utils/users_utils")

//authenticate user
const userAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
      next()
  } else {
      res.sendStatus(403)
  }
}

//verify owner
const verifyOwner = function (req, res, next) {
  // If post owner isn't currently logged in user, send forbidden
  if (req.user.role === 'admin') {
      next()
  } else {
      getUserById(req).exec((error, user) => {
          if (error || !user) {
              req.error = {
                  message: 'User not found',
                  status: 404
              }
              return next()
          }
          if (user && req.user.username !== user.username) {
              req.error = {
                  message: 'You do not have permission to make changes',
                  status: 403
              }
          }
          next()
      })
  }
}

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


//remove user
const removeUser = function(req,res) {
  //checking errors
  if (req.error){
      res.status(req.error.status)
      res.send(req.error.message)
  }else{
    // execute the query from deleteUser
    deleteUser(req).exec((error) => {
        if (error) {
        res.status(500);
        return res.json({
            error: error.message
        });
        }
        res.sendStatus(204);

    });
  }
};

//update user
const changeUser = function(req, res) {
//checking errors
if (req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
} else {
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
  }
};

module.exports = {getUsers, getUser, removeUser, changeUser, userAuthenticated, verifyOwner}