const expect = require("expect")
const testDataFile = "./data/users.test.json"
const fs = require("fs")
const {loadData, getAllUsers, getUserById, addUser, deleteUser, updateUser} = require("../utils/users_utils")


beforeEach(() => {
	console.log("setting up data")
	setUpData()
})

describe("SetUpData", ()=> {
    it("should populate test file with data", () => {
        let contents = fs.readFileSync(testDataFile, 'utf8')
        expect(contents.length).toBeGreaterThan(3)
        let users = JSON.parse(contents)
        expect(users["1"].name).toBe("User 1")
    })
})

describe("getAllUsers", () => {
    it("should return i user from the test data", () => {
        let users = getAllUsers({})
        expect(Object.keys(users).length).toBe(1)
        expect(users["1"].name).toBe("User 1")
    })
})

describe("getUserById", () => {
    let req = {
        params: {
            id: "1"
        }
    }
    it("should return user by id", () => {
        let req = {
            params: {
                id: "1"
            }
        }
        let user = getUserById(req)
        expect(user.name).toBe("User 1")
    })
    it("should set req.error if invalid id", () => {
        req.params.id = "2"
        getUserById(req)
        expect(req.error).toBe("User not found")
    })
})

describe("addUser", () => {
    let req = {
        body: {
            name: "Princess",
            availability: "Wednesday"
        }
        
    }
    it("should create a valid user and update a test data file", () => {
        addUser(req)
        let contents = fs.readFileSync(testDataFile, 'utf8')
        let users = JSON.parse(contents)
        expect(Object.keys(users).length).toBe(2)
    })
    it("should return updated user", () => {
        let newUser = addUser(req)
        expect(newUser.name).toBe(req.body.name)
    })
})

describe("deleteUser", () => {
    let req = {
        params: {
            id: "1"
        }
    }
    it("should remove user", () => {
        let users = deleteUser(req)
        expect(Object.keys(users).length).toBe(0)
    })
    it("should update the file to remove user", () => {
        deleteUser(req)
        let contents = fs.readFileSync(testDataFile, 'utf8')
        let users = JSON.parse(contents)
        expect(Object.keys(users).length).toBe(0)
    })
})

describe("updateUser", () => {
    let req = {
        params: {
            id: "1"
        },
        body: {
            name: "User 1",
            availability: "Friday"
        }
    }
    it("should update user", () => {
        let user = updateUser(req)
        expect(user.availability).toBe("Friday")
    })
})

function setUpData() {
    let testUserData = {}
    let testUser = {}
    let date = Date.now()
    testUser.name = "User 1"
    testUser.availability = "Monday"
    testUser.create_date = date
    testUser.modified_date = date
    testUserData["1"] = testUser
    fs.writeFileSync(testDataFile, JSON.stringify(testUserData))
    loadData(testDataFile)
}