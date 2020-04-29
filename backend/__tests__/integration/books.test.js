/** Test for Books */

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const Book = require("../../models/books");

const {
    TEST_DATA,
    afterEachHook,
    beforeEachHook,
    afterAllHook
} = require("../../testConfig");


beforeEach(async function () {
    await beforeEachHook(TEST_DATA);
});


describe("POST /books", function () {
    test("Creates a new book", async function () {

        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: 123456,
                title: "Mythical Man",
                author: "Cornhall",
                edition_number: 3,
                subject_type: "software eng",
                school_handle: "skid",
                copies: 1,
                _token: TEST_DATA.userToken
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.books).toHaveProperty("isbn");
        const result = await Book.get(123456);
        expect(result).toHaveProperty("isbn");
    });
    // test("Prevents creating a book without required title field", async function () {
    //     const response = await request(app)
    //         .post(`/jobs`)
    //         .send({
    //           _token: TEST_DATA.userToken,
    //           salary: 1000000,
    //           equity: 0.2,
    //           company_handle: TEST_DATA.currentCompany.handle
    //         });
    //     expect(response.statusCode).toBe(400);
    //   });
    // });
});

