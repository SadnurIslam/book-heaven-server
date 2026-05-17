const asyncHandler = require("../middlewares/asyncHandler");
const { getCollections } = require("../config/db");

const addComment = asyncHandler(async (req, res) => {
  const comment = req.body;
  if (!comment || typeof comment !== "object" || !comment.bookId) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const payload = { ...comment, createdAt: new Date() };
  const { commentsCollection } = await getCollections();
  const result = await commentsCollection.insertOne(payload);

  res.status(201).json(result);
});

const getCommentsByBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { commentsCollection } = await getCollections();
  const comments = await commentsCollection
    .find({ bookId })
    .sort({ createdAt: -1 })
    .toArray();

  res.json(comments);
});

module.exports = { addComment, getCommentsByBookId };
