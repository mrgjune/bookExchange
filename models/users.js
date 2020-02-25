const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const partialUpdate = require("../helpers/partialUpdate")
const bcrypt = require("bcrypt");
const BCRYPT_WORK_FACTOR = 10;

// const sqlForPartialUpdate = require("../helpers/partialUpdate");
class User {

    /** authenticate user with username, password. Returns user or throws err. */
    static async authenticate(data) {
        // try to find the user first
        const result = await db.query(
            `SELECT username, 
              password, 
              first_name, 
              last_name, 
              email, 
              school_handle, 
              is_admin
        FROM users 
        WHERE username = $1`,
            [data.username]
        );

        const user = result.rows[0];
        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(data.password, user.password);
            if (isValid) {
                return user;
            }
        }

        throw new ExpressError("Invalid Password", 401);
    }
    static async register(data) {
        const duplicateCheck = await db.query(
            `SELECT username 
            FROM users 
            WHERE username = $1`,
            [data.username]
        );

        if (duplicateCheck.rows[0]) {
            throw new ExpressError(
                `There already exists a user with username '${data.username}`,
                400
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users 
              (username, password, first_name, last_name, email, school_handle) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING username, password, first_name, last_name, email, school_handle`,
            [
                data.username,
                hashedPassword,
                data.first_name,
                data.last_name,
                data.email,
                data.school_handle
            ]
        );

        return result.rows[0];
    }

    /**get all users */
    static async getAll() {
        let result = await db.query(
            `SELECT username, first_name, last_name,email,school_handle FROM users`);
        return result.rows;
    }
    /**get one user */
    static async getUser(username) {
        let result = await db.query(
            `SELECT first_name, last_name, email, school_handle
                FROM users
                WHERE username = $1`,
            [username]
        )
        return result.rows[0];
    }
    /**update user info by username */
    static async update(username, data) {
        // if (data.password) {
        //   data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        // }
        let { query, values } = partialUpdate("users", data, "username", username);

        const result = await db.query(query, values);
        const user = result.rows[0];
        if (!user) {
            throw new ExpressError(`There exists no user '${username}'`, 404);
        }

        //delete user.password;
        // delete user.is_admin;
        return result.rows[0];
    }

    /** Delete given user from database; returns undefined. */

    static async remove(username) {
        let result = await db.query(
            `DELETE FROM users 
        WHERE username = $1
        RETURNING username`,
            [username]
        );

        if (result.rows.length === 0) {
            throw new ExpressError(`There exists no user '${username}'`, 404);
        }


    }
}

module.exports = User;