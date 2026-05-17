const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books.controller");

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.get("/:id", getBookById);
router.patch("/:id", updateBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
