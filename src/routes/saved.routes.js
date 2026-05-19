const express = require("express");
const {
  getSaved,
  createSaved,
  deleteSaved,
} = require("../controllers/saved.controller");

const router = express.Router();

router.get("/", getSaved);
router.post("/", createSaved);
router.delete("/:id", deleteSaved);

module.exports = router;
