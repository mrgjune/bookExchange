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
 * or return books by the serach param
*/
router.get("/", async function (req, res, next) {
    let searchObject = req.query;
    console.log(searchObject, "Sdfds")
    if (Object.keys(searchObject).length == 0) {
        try {

            let books = await Book.getAll();
            return res.json({ books })

        } catch (err) {
            return next(err)
        }
    }

    else {

        try {

            let books = await Book.search(searchObject)

            return res.json({ books })

            // throw new ExpressError("No books matching this search field", 400);

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

        throw new ExpressError("Book Not Found", 404);


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
                'You are not allowed to change the isbn.',
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