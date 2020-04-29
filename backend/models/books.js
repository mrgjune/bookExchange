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
    if (Object.keys(searchObject).length === 1 && searchObject.school_handle) {
      if (searchObject.school_handle === "All Schools") {
        let result = await db.query(
          `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
          available,school_handle,copies from books`
        );

        return result.rows;
      } else {
        let result = await db.query(
          `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
          available,school_handle,copies from books 
            Where school_handle = $1`,
          [searchObject.school_handle]
        );
        return result.rows;
      }
    }
    if (searchObject.school_handle === "All Schools") {
      if (searchObject.author) {
        let result = await db.query(
          `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
          available,school_handle,copies 
                FROM books
                  WHERE author ILIKE $1`,
          [searchObject.author]
        );
        return result.rows;
      } else if (searchObject.title) {
        let result = await db.query(
          `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
          available,school_handle,copies 
                FROM books
                WHERE title ILIKE $1`,
          [searchObject.title]
        );
        return result.rows;
      } else if (searchObject.subject) {
        console.log("hello");
        let result = await db.query(
          `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
          available,school_handle,copies 
                FROM books
                WHERE subject_type = $1 `,
          [searchObject.subject]
        );
        return result.rows;
      }
    } else if (searchObject.author) {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies 
              FROM books
                WHERE author ILIKE $1 AND school_handle = $2`,
        [searchObject.author, searchObject.school_handle]
      );
      return result.rows;
    } else if (searchObject.title) {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies 
              FROM books
              WHERE title ILIKE $1 AND school_handle = $2`,
        [searchObject.title, searchObject.school_handle]
      );
      return result.rows;
    } else if (searchObject.subject) {
      let result = await db.query(
        `SELECT isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
        available,school_handle,copies 
              FROM books
              WHERE subject_type = $1 AND school_handle = $2`,
        [searchObject.subject, searchObject.school_handle]
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
