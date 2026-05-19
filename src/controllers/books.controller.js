const asyncHandler = require("../middlewares/asyncHandler");
const { getCollections } = require("../config/db");
const { isValidObjectId, toObjectId } = require("../utils/validateObjectId");

const getBooks = asyncHandler(async (req, res) => {
  const { limit, sort, email } = req.query;
  const { booksCollection } = await getCollections();

  const filter = {};
  if (email) {
    filter.userEmail = email;
  }

  let cursor = booksCollection.find(filter);
  if (sort === "latest") {
    cursor = cursor.sort({ updatedAt: -1 });
  } else if (sort === "rating_asc") {
    cursor = cursor.sort({ rating: 1 });
  } else if (sort === "rating_desc") {
    cursor = cursor.sort({ rating: -1 });
  }

  const parsedLimit = Number.parseInt(limit, 10);
  if (Number.isFinite(parsedLimit) && parsedLimit > 0) {
    cursor = cursor.limit(parsedLimit);
  }

  const books = await cursor.toArray();
  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid book id" });
    return;
  }

  const { booksCollection } = await getCollections();
  const book = await booksCollection.findOne({ _id: toObjectId(id) });

  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  res.json(book);
});

const createBook = asyncHandler(async (req, res) => {
  const book = req.body;
  if (!book || typeof book !== "object") {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const now = new Date();
  const payload = { ...book, createdAt: now, updatedAt: now };
  const { booksCollection } = await getCollections();
  const result = await booksCollection.insertOne(payload);

  res.status(201).json(result);
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid book id" });
    return;
  }

  const updates = req.body;
  if (!updates || typeof updates !== "object") {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  delete updates._id;

  const { booksCollection } = await getCollections();
  const payload = { ...updates, updatedAt: new Date() };
  const result = await booksCollection.updateOne(
    { _id: toObjectId(id) },
    { $set: payload }
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  res.json(result);
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid book id" });
    return;
  }

  const { booksCollection } = await getCollections();
  const result = await booksCollection.deleteOne({ _id: toObjectId(id) });

  if (result.deletedCount === 0) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  res.json(result);
});

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
