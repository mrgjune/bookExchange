const db = require("../../db");
const Book = require("../../models/books");
const sqlForPartialUpdate = require("../../helpers/partialUpdate")

describe("Model", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM books");
        await Book.create({
            isbn: 45435345,
            title: "Chemistry",
            author: "Mcflair",
            subject_type: "Chem",
            edition_number: 3,
            school_handle: "skid",
            copies: 1,


        })
        await Book.create({
            isbn: 2344566,
            title: "Data Science",
            author: "Mac",
            subject_type: "CS",
            edition_number: 3,
            school_handle: "skid",
            copies: 1,
            available: true
        })
    })

    describe("create()", function () {

        test("should return new book object ", async function () {
            let result = await Book.create({
                isbn: 2324234266,
                title: "math ",
                author: "Merk",
                subject_type: "CS",
                edition_number: 3,
                school_handle: "skid",
                copies: 1
            })
            expect(result).toEqual({
                isbn: 2324234266,
                title: "math ",
                author: "Merk",
                subject_type: "CS",
                edition_number: 3,
                school_handle: "skid",
                copies: 1
            })
        });
    });
    describe("getAll()", function () {

        test("should return all books ", async function () {
            let result = await Book.getAll()
            expect(result).toEqual(
                [{
                    "author": "Mcflair", "available": true, "copies": 1, "edition_number": 3,
                    "isbn": 45435345, "school_handle": "skid", "subject_type": "Chem", "title": "Chemistry"
                },
                {
                    "author": "Mac", "available": true, "copies": 1, "edition_number": 3,
                    "isbn": 2344566, "school_handle": "skid", "subject_type": "CS", "title": "Data Science"
                }]
            )
        });
    });
    describe("get()", function () {

        test("should return one book", async function () {
            let result = await Book.get(2344566)
            expect(result).toEqual(
                { "author": "Mac", "available": true, "copies": 1, "edition_number": 3, "isbn": 2344566, "school_handle": "skid", "subject_type": "CS", "title": "Data Science" }
            )
        });
        test("should return undefined if no book exits", async function () {
            let result = await Book.get(123123)
            expect(result).toEqual(
                undefined
            )
        });
    });
    describe("remove() delete book", function () {
        test("should return isbn of deleted user",
            async function () {
                let result = await Book.remove(2344566)
                expect(result).toEqual(
                    undefined
                );
            })
        //TEST ERROR TEST
    });



    describe("updatedBook()", function () {
        // test("should return updatedBook",
        //     async function () {
        //         let result = await Book.update(45435345, { "checked_out": "testusername1" });
        //         console.log(result)
        //         expect(result).toEqual(
        //             {
        //                 isbn: 45435345,
        //                 title: "math ",
        //                 author: "Merk",
        //                 subject_type: "CS",
        //                 edition_number: 3,
        //                 school_handle: "skid",
        //                 copies: 1,
        //                 checked_out: "testusername2"
        //             }
        //         );
        //     })
        // test("should return there exist no user",
        //     async function () {
        //         let result = await User.update("testudername1", { "email": "updatedEmail@gmail.com" })
        //         console.log(response.statusCode, "statuscode");
        //         await expect(throws()).rejects.toThrow(new ExpressError(`There exists no user ${testudername1}`));


    })

    describe("search()", function () {

        // test("should return the books checked out to a user ", async function () {
        //     let result = await Book.search({ "checked_out": "testusername2" })
        //     expect(result).toEqual(
        //     )
        // });
        test("should return the books by this author ", async function () {
            let result = await Book.search({ "author": "Mcflair" })
            expect(result).toEqual(
                [{ "author": "Mcflair", "available": true, "checked_out": null, "copies": 1, "edition_number": 3, "isbn": 45435345, "school_handle": "skid", "subject_type": "Chem", "title": "Chemistry" }]
            )
        });
        test("should return the books in this school ", async function () {
            let result = await Book.search({ "school_handle": "skid" })
            expect(result).toEqual(
                [{
                    "author": "Mcflair", "available": true, "checked_out": null, "copies": 1, "edition_number": 3,
                    "isbn": 45435345, "school_handle": "skid", "subject_type": "Chem", "title": "Chemistry"
                },
                {
                    "author": "Mac", "available": true, "checked_out": null, "copies": 1, "edition_number": 3,
                    "isbn": 2344566, "school_handle": "skid", "subject_type": "CS", "title": "Data Science"
                }]
            )
        });
        test("should return the books by subject ", async function () {
            let result = await Book.search({ "subject_type": "Chem" })
            expect(result).toEqual(
                [{ "author": "Mcflair", "available": true, "checked_out": null, "copies": 1, "edition_number": 3, "isbn": 45435345, "school_handle": "skid", "subject_type": "Chem", "title": "Chemistry" }]
            )
        });
        test("should return the books by title ", async function () {
            let result = await Book.search({ "title": "Data Science" })
            expect(result).toEqual(
                [{ "author": "Mac", "available": true, "checked_out": null, "copies": 1, "edition_number": 3, "isbn": 2344566, "school_handle": "skid", "subject_type": "CS", "title": "Data Science" }]
            )
        });


    });


    afterAll(async function () {
        await db.end()
    })
});