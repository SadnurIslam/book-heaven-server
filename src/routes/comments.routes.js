const express = require("express");
const {
  addComment,
  getCommentsByBookId,
} = require("../controllers/comments.controller");

const router = express.Router();

router.post("/", addComment);
router.get("/:bookId", getCommentsByBookId);

module.exports = router;
