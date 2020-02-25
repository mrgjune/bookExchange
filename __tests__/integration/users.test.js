/** Test for companies */

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const User = require("../../models/users");
const {
    TEST_DATA,
    afterEachHook,
    afterAllHook,
    beforeEachHook
} = require('./config');

beforeEach(async function () {
    await beforeEachHook(TEST_DATA);
});

afterEach(async function () {
    await afterEachHook();
});

afterAll(async function () {
    await afterAllHook();
});






describe("GET /users", function () {

    test("It should respond with {users data}", async function () {
        const response = await request(app)
            .get("/users")
            .send({ _token: `${TEST_DATA.userToken}` });
        console.log(response.body, "RESPONSE .BODY")
        expect(response.body.company.handle).toEqual("testHandle");

    })

    test("It should return 404 for no-such-comp", async function () {
        const response = await request(app)
            .get("/companies/blargh");
        expect(response.statusCode).toEqual(404);

    });
});

// describe("GET /query params", function () {

//     test("It should respond with {companies: handle and name, testing will all params} ", async function () {
//         const response = await request(app).get("/companies?SearchName=test&minEmployees=3&maxEmployees=500");
//         expect(response.body).toEqual({

//             "companies": [{
//                 "handle": "testHandle",
//                 "name": "testName"
//             }, {
//                 "handle": "testHandle2",
//                 "name": "testName2"
//             }]

//         });
//     })

//     test("It should respond with {companies: handle and name}, testing without searchName ", async function () {
//         const response = await request(app).get("/companies?&minEmployees=3&maxEmployees=50");
//         expect(response.body).toEqual({

//             "companies": [{
//                 "handle": "testHandle",
//                 "name": "testName",
//             }]

//         });
//     });

//     test("It should respond with {companies: handle and name}, testing when min > max ", async function () {
//         const response = await request(app).get("/companies?&minEmployees=23423&maxEmployees=50");
//         expect(response.body).toEqual({

//             "status": 400,
//             "message": "Params are not valid"

//         });
//     })

//     test("It should respond with {companies: handle and name}, testing invalid searchName", async function () {
//         const response = await request(app).get("/companies?searchName=sdfjsdlkfk&minEmployees=9&maxEmployees=50");
//         expect(response.body).toEqual({

//             "status": 400,
//             "message": "Params are not valid"

//         });
//     })



//     test("It should return 400 if params are not valid", async function () {
//         const response = await request(app)
//             .get("/companies?searchName=test&minEmployees=50&maxEmployees=5/blargh");
//         expect(response.statusCode).toEqual(400);

//     });

// });


// describe("POST /", function () {

//     test("It should add company", async function () {
//         const response = await request(app)
//             .post("/companies")
//             .send({
//                 "handle": "addCompany",
//                 "name": "added",
//                 "num_employees": 100,
//                 "description": "This is our added test",
//                 "logo_url": "https://www.google.com/"
//             });

//         expect(response.body).toEqual(
//             {
//                 "companies": {
//                     "handle": "addCompany",
//                     "name": "added",
//                     "num_employees": 100,
//                     "description": "This is our added test",
//                     "logo_url": "https://www.google.com/"
//                 }
//             }
//         );
//     });
// });

// describe("PATCH /:handle", function () {
//     test("It should update company", async function () {
//         const response = await request(app)
//             .patch("/companies/testHandle")
//             .send({ name: "testyPATCH", description: "NewDescrip" } );
//         expect(response.body).toEqual(
//             {
//                 "company": {
//                     "handle": "testHandle",
//                     "name": "testyPATCH",
//                     "num_employees": 10,
//                     "description": "NewDescrip",
//                     "logo_url": "https://www.google.com/"
//                 }
//             }

//         );
//     });
//     test("It should return 404 for no-such-comp", async function () {
//         const response = await request(app)
//             .patch("/companies/blargh")
//             .send({ name: "testyPATCH" });
//         expect(response.statusCode).toEqual(404);

//     });
// });

// describe("DELETE /handle", function () {

//     test("It should delete company", async function () {
//         const response = await request(app)
//             .delete("/companies/testHandle");

//         expect(response.body).toEqual({ "message": "Company deleted" });
//     });

//     test("It should return 404 for no-such-comp", async function () {
//         const response = await request(app)
//             .delete("/companies/blargh");

//         expect(response.statusCode).toEqual(404);
//     });
// });



afterAll(async function () {
    await db.end()
})


