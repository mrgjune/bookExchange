// npm packages
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// app imports
const app = require('./app');
const db = require('./db');

// global auth variable to store things for all the tests
const TEST_DATA = {};
let nextUser = 0;

/**
 * Hooks to insert a user, company, and job, and to authenticate
 *  the user and the company for respective tokens that are stored
 *  in the input `testData` parameter.
 * @param {Object} TEST_DATA - build the TEST_DATA object
 * 
 */
async function beforeEachHook(TEST_DATA) {
    try {
        let user = "test" + nextUser;
        nextUser++;
        // login a user, get a token, store the user ID and token
        const hashedPassword = await bcrypt.hash('secret', 1);
        await db.query(
            `INSERT INTO users (username, password, first_name, last_name, email,school_handle, is_admin)
                  VALUES (${user}, $1, 'tester', 'mctest', 'test@test.com','skid', true)`,
            [hashedPassword]
        );

        const response = await request(app)
            .post('/login')
            .send({
                username: user,
                password: 'secret'
            });

        TEST_DATA.userToken = response.body.token;
        TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username;

        // do the same for company "companies"

    } catch (error) {
        console.error(error);
    }
}

async function afterEachHook() {
    console.log("AFTER EACH HOOK")
    try {
        await db.query('DELETE FROM users');
        await db.query('DELETE FROM books');
    } catch (error) {
        console.error(error);
    }
}

async function afterAllHook() {
    try {
        await db.end();
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    afterAllHook,
    afterEachHook,
    TEST_DATA,
    beforeEachHook
};
