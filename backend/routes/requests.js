const express = require("express");
const router = new express.Router();
const Request = require("../models/requests");
const ExpressError = require("../helpers/expressError");
const db = require("../db");

/** POST/books, return JSON of {books: book} */
router.post("/", async function (req, res, next) {
  console.log(req.body, "requ");
  try {
    let requests = await Request.requestForm(req.body);
    return res.json({ requests });
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    let requests = await Request.getAll();
    return res.json({ requests });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
