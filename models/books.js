const db = require("../db");
const ExpressError = require("../helpers/ExpressError");
const partialUpdate = require("../helpers/partialUpdate");

class Book {
  /**insert a book into books table */

  static async create({
    isbn,
    title,
    author,
    subject_type,
    edition_number,
    school_handle,
    copies,
  }) {
    const result = await db.query(
      `INSERT INTO books (isbn, title, author, subject_type,edition_number,school_handle,copies)
        VALUES ($1, $2, $3, $4, $5, $6,$7)
        RETURNING isbn, title, author, subject_type,edition_number,school_handle,copies`,
      [isbn, title, author, subject_type, edition_number, school_handle, copies]
    );
    return result.rows[0];
  }

  /**get all books */
  static async getAll() {
    let result = await db.query(
      `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
      available,school_handle,copies
            FROM books`
    );
    return result.rows;
  }
  /**get one book */
  static async get(isbn) {
    let result = await db.query(
      `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
      available,school_handle,copies
                FROM books
                WHERE isbn = $1`,
      [isbn]
    );
    return result.rows[0];
  }
  /**get books checked out by either user, school,author, subject or title*/
  static async search(searchObject) {
    console.log(searchObject, "MODEL");
    let queryParam = Object.keys(searchObject)[0];
    let searchTerm = searchObject[queryParam];
    if (queryParam === "checked_out") {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies
                FROM books
                WHERE checked_out= $1`,
        [searchTerm]
      );

      return result.rows;
    } else if (queryParam === "school_handle") {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies
                FROM books
                WHERE school_handle= $1`,
        [searchTerm]
      );
      if (result.rows.length === 0) {
        throw new ExpressError(`Invalid School handle'${searchTerm}'`, 404);
      }

      return result.rows;
    } else if (queryParam === "author") {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies 
              FROM books
                WHERE author ILIKE $1`,
        [`%${searchTerm}%`]
      );

      return result.rows;
    } else if (queryParam === "subject") {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies
                FROM books
                WHERE subject_type = $1`,
        [searchTerm]
      );

      return result.rows;
    } else if (queryParam === "title") {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies
                FROM books
                WHERE title ILIKE $1`,
        [`%${searchTerm}%`]
      );

      return result.rows;
    }
  }
  static async update(isbn, data) {
    let { query, values } = partialUpdate("books", data, "isbn", isbn);
    const result = await db.query(query, values);
    const book = result.rows[0];
    if (!book) {
      throw new ExpressError(`There exists no book '${isbn}'`, 404);
    }
    return result.rows;
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
