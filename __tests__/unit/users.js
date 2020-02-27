const db = require("../../db");
const User = require("../../models/users");
const sqlForPartialUpdate = require("../../helpers/partialUpdate")

describe("Model", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM users");
        await User.register({
            username: "testusername1",
            password: "password",
            first_name: "testName",
            last_name: "testlastname",
            email: "test@gmail.com",
            school_handle: "skid"
        })
        // await User.register({
        //     username: "testusername2",
        //     password: "password",
        //     first_name: "testName",
        //     last_name: "testlastname",
        //     email: "test2@gmail.com",
        //     school_handle: "skid"
        // })
    })
    describe("register()", function () {

        test("should return new user object ", async function () {
            let result = await User.register({
                username: "mrgjune",
                password: "password",
                first_name: "Mara",
                last_name: "Greene",
                email: "mrgjune@gmail.com",
                school_handle: "skid"
            })
            expect(result).toEqual({
                email: "mrgjune@gmail.com",
                password: expect.anything(),
                first_name: "Mara",
                last_name: "Greene",
                school_handle: "skid",
                username: "mrgjune"
            })
        });
        //TEST USER ALREAYD EXIST ERROR
    });

    describe("authenicate()", function () {
        test("should return ..", async function () {
            let result = await User.authenticate({
                username: "testusername1",
                password: "password"
            })
            expect(result).toEqual({
                "email": "test@gmail.com",
                "first_name": "testName",
                "is_admin": false,
                "last_name": "testlastname",
                "password": expect.anything(),
                "school_handle": "skid",
                "username": "testusername1"
            })
        })
        //TEST THROW NEW EXPRESS ERROR
    });

    describe("get()", function () {
        test("should return user details",
            async function () {
                let result = await User.getUser("testusername1")
                expect(result).toEqual({
                    email: "test@gmail.com",
                    first_name: "testName",
                    last_name: "testlastname",
                    school_handle: "skid",
                    username: "testusername1"
                });
            })

        test("should return invalid",
            async function () {
                let result = await User.getUser("invalid");
                expect(result).toEqual(undefined)
            });
    });

    describe("getAll()", function () {
        test("should return all users",
            async function () {
                let result = await User.getAll()
                expect(result).toEqual(
                    [{ "email": "test@gmail.com", "first_name": "testName", "last_name": "testlastname", "school_handle": "skid", "username": "testusername1" }]

                );
            })
    });

    describe("updateUser()", function () {
        test("should return updatedUser",
            async function () {
                let result = await User.update("testusername1", { "email": "updatedEmail@gmail.com" })
                expect(result).toEqual(
                    {
                        email: "updatedEmail@gmail.com",
                        first_name: "testName",
                        last_name: "testlastname",
                        school_handle: "skid",
                        username: "testusername1"
                    }
                );
            })
        // !!!!test("should return there exist no user",
        //     async function () {
        //         let result = await User.update("testudername1", { "email": "updatedEmail@gmail.com" })
        //         console.log(result, "result")
        //         await expect(result).catch(new ExpressError("sfs"));


        //     })
    });
    describe("remove() delete user", function () {
        test("should return username of deleted user",
            async function () {
                let result = await User.remove("testusername1")
                expect(result).toEqual(
                    undefined
                );
            })
        //TEST there exist no user
    });



    afterAll(async function () {
        await db.end()
    })
});