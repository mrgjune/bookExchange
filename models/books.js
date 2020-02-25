const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const partialUpdate = require("../helpers/partialUpdate");

class Book {
    /**insert a book into books table */

    static async create({ isbn, title, author, subject_type, edition_number, school_handle, copies }) {
        const result = await db.query(
            `INSERT INTO books (isbn, title, author, subject_type,edition_number,school_handle,copies)
        VALUES ($1, $2, $3, $4, $5, $6,$7)
        RETURNING isbn, title, author, subject_type,edition_number,school_handle,copies`,
            [isbn, title, author, subject_type, edition_number, school_handle, copies]
        );
        return result.rows[0]
    }


    /**get all books */
    static async getAll() {
        let result = await db.query(
            `SELECT isbn, title, author, subject_type,edition_number,school_handle,copies,available,school_handle,copies
            FROM books`);
        return result.rows;
    }
    /**get one book */
    static async get(isbn) {
        let result = await db.query(
            `SELECT isbn, title, author, subject_type,edition_number,school_handle,copies,available,school_handle,copies
                FROM books
                WHERE isbn = $1`,
            [isbn]
        )
        return result.rows[0];
    }
    /**get books checked out to certain user */
    static async getUserBooks(user) {
        let result = await db.query(
            `SELECT isbn, title, author, subject_type,edition_number,school_handle,copies,available,school_handle,copies,checked_out
                FROM books
                WHERE checked_out = $1`,
            [user]
        )
        return result.rows;
    }
    static async update(isbn, data) {
        let { query, values } = partialUpdate("books", data, "isbn", isbn);
        const result = await db.query(query, values);
        const book = result.rows[0];
        if (!book) {
            throw new ExpressError(`There exists no book '${isbn}'`, 404);
        }
        return result.rows[0];
    }
    /** Delete given book from database; returns undefined. */

    static async remove(isbn) {
        let result = await db.query(
            `DELETE FROM books 
    WHERE isbn = $1
    RETURNING isbn`,
            [isbn]
        );

        if (result.rows.length === 0) {
            throw new ExpressError(`There exists no book '${isbn}'`, 404);
        }


    }


}

module.exports = Book;