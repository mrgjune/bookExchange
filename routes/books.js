const express = require("express");
const router = new express.Router();
const Book = require("../models/books")
const ExpressError = require("../helpers/expressError")
const db = require("../db")
const jsonschema = require("jsonschema");
const postBookSchema = require("../schemas/postBookSchema")
const { adminRequired } = require('../middleware/auth');

// /** POST/books, return JSON of {books: book} */
router.post("/", adminRequired, async function (req, res, next) {
    try {
        const result = jsonschema.validate(req.body, postBookSchema)

        if (!result.valid) {
            let listOfErrors = result.errors.map(error => error.stack)
            throw new ExpressError(listOfErrors, 400)

            return next(err)
        }
        let books = await Book.create(req.body);
        return res.json({ books })
    } catch (err) {
        return next(err)
    }
})
/** GET/books/return JSON of {books: [ book:{book details},..]
 * or get books from user
*/
router.get("/", async function (req, res, next) {
    //turn into json object
    let username = req.query.user;
    let school = req.query.school;
    let subject = req.query.subject;
    let author = req.query.subject;

    if (!username | !school | !subect | !author) {
        try {

            let books = await Book.getAll();
            return res.json({ books })

        } catch (err) {
            return next(err)
        }
    }
    else if (username) {
        try {

            let books = await Book.getUserBooks(username)
            if (books.length !== 0) {
                return res.json({ books })
            }
            throw new ExpressError("No books checked out", 400);

        } catch (err) {
            return next(err)
        }

    }

})


/** GET/books/[title], return JSON of {book: book details} */
router.get("/:isbn", async function (req, res, next) {
    let isbn = req.params.isbn;
    try {
        let book = await Book.get(isbn);

        if (book) {
            return res.json({ book })
        }

        throw new ExpressError("User Not Found", 404);


    } catch (err) {
        return next(err)
    }
})

/** PATCH/books/[isbn], update a book by finding with isbn,
 * should return JSON of {book} */
router.patch("/:isbn", async function (req, res, next) {
    try {
        if ('isbn' in req.body) {
            throw new ExpressError(
                'You are not allowed to change username or is_admin properties.',
                400);
        }
        const book = await Book.update(req.params.isbn, req.body);
        return res.json({ book });
    } catch (err) {
        return next(err);
    }
});


/** DELETE/books/[isbn], return JSON of { message: "Book deleted" } */
router.delete("/:isbn", adminRequired, async function (req, res, next) {
    let isbn = req.params.isbn;
    try {
        const result = await db.query(`DELETE FROM books WHERE isbn=$1`, [isbn])
        if (result.rowCount !== 0) {
            return res.json({ message: "Book deleted" })
        }

        throw new ExpressError("Book Not Found", 404);
    } catch (err) {
        return next(err)
    }
})



module.exports = router; 