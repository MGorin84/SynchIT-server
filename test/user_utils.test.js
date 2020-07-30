const expect = require("expect")
const mongoose = require("mongoose")
const utilities = require('../utils/users_utils');
const User = require("../models/user")

const dbConn = "mongodb://localhost/SynchIT_test"
let userId = null

//hook to use with asynchronous functions 
before (done => connectToDb(done))

//connect to test db
function connectToDb(done) {
    mongoose.connect(
        dbConn,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false  
        },
        error => {// error handling
            if (error) {
                console.log("Error connecting to a database", error)
                done()
            }else{
                console.log("Connected to the database")
                done()
            }
        }
    )
};

// disconnect from test DB when all tests are done
after (done => {
    mongoose.disconnect(() => done())
});

//setting up test data before each test
beforeEach(async function (){
    //load a test record set up
    //use await so we can access user id used for testing
    let user = await setUpData()
    userId = user._id
});

function setUpData() {
    let testUser = {};
    testUser.username = "Tester"
    testUser.email = "tester@test.com"
    testUser.position = "Testing manager"
    return User.create(testUser)
};

// deleting test data after tests
afterEach(done => {
    tearDownData().exec(() => done())
});

function tearDownData(){
    return User.deleteMany()
};

describe("getAllUsers", () => {
    it("should get all users", async function (){
        let req = {
            query:{}
            
        };
        await utilities.getAllUsers(req).exec((error, users) => {
           expect(Object.keys(users).length).toBe(1) 
        })
    })
    it("should get a user with a username Tester", async function(){
        let req = {
            query:{}
            
        };
        await utilities.getAllUsers(req).exec((error, users) => {
            expect(users[0].username).toBe("Tester")
             
         });
    });
});

// get user by id
describe("getUserById", () => {
    it("username of first user should be Tester", async function () {
        // Set up req with user Id
        let req = {
            params: {
                id: userId
            }
        }
        await utilities.getUserById(req).exec((error, user) => {
            expect(user.username).toBe("Tester");
        });
    });
});

// delete user
describe("deleteUser", () => {
    it("should delete the user by id", async function () {
        let req = {
            params: {
                id: userId
            }
        }
        await utilities.deleteUser(req).exec();
        await User.findById(userId).exec((error, user) => {
            expect(user).toBe(null);
        });
    });
});

// update user
describe("updateUser", () => {
    it("should update a user", async function () {
        // set up a req object
        const req = {
            params: {
                id: userId
            },
            body: {
                username: "Tester 2",
                email: "tester@test.com",
                position: "tester"
            }
        };
        await utilities.updateUser(req).exec((error, user) => {
            expect(user.username).toBe(req.body.username);
        });
    });
});