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
    testUser.name = "Tester"
    testUser.role = "Testing manager"
    testUser.availability = "Monday";
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
            expect(users[0].name).toBe("Tester")
             
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
            expect(user.name).toBe("Tester");
        });
    });
});

// add user
describe("addUser", () => {
    it('should add a user', async function () {
        // define a req object with expected structure
        const req = {
            body: {
                name: "Janel",
                role: "Mentor",
                availability: "Saturday"
            }
        }
        await utilities.addUser(req).save((error, user) => {
            expect(user.name).toBe(req.body.name);
        });
    });
});

// delete user
describe("deleteUser", () => {
    it("should delete the user bu id", async function () {
        await utilities.deleteUser(userId).exec();
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
                name: "Tester 2",
                role: "tester",
                availability: "Tuesday"
            }
        };
        await utilities.updateUser(req).exec((error, user) => {
            expect(user.name).toBe(req.body.name);
        });
    });
});