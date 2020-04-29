const db = require("../db");
// const ExpressError = require("../helpers/ExpressError");
// const sqlForPartialUpdate = require("../helpers/partialUpdate");
class School {
    /**insert a school in bookly database */
    static async create({ handle, school_name }) {
        const result = await db.query(
            `INSERT INTO schools (handle, school_name)
                VALUES ($1, $2)
                RETURNING handle, school_name`,
            [handle, school_name]
        );

        return result.rows[0]
    }
    /**takes in a search term and returns the companies with that search term */

    static async getSchool(school_name) {
        let result = await db.query(
            `SELECT school_name
                FROM companies
                WHERE handle = $1`,
            [school_name]
        )
        return result.rows[0];
    }


}

module.exports = School;