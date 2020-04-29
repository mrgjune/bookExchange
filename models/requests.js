const db = require("../db");

const ExpressError = require("../helpers/ExpressError");
const partialUpdate = require("../helpers/partialUpdate");

class Request {
  static async requestForm(data) {
    const result = await db.query(
      `INSERT INTO bookRequest 
        (first_name, last_name, email, school_handle,isbn) 
      VALUES ($1, $2, $3, $4,$5) 
      RETURNING first_name, last_name, email, school_handle,isbn`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.school_handle,
        data.isbn,
      ]
    );

    return result.rows[0];
  }

  /**get all books */
  static async getAll() {
    let result = await db.query(
      `SELECT first_name, last_name, email, school_handle,isbn
          FROM bookRequest`
    );
    return result.rows;
  }
}

module.exports = Request;
