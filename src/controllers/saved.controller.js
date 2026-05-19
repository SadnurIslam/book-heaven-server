const asyncHandler = require("../middlewares/asyncHandler");
const { getCollections } = require("../config/db");
const { isValidObjectId, toObjectId } = require("../utils/validateObjectId");

const getSaved = asyncHandler(async (req, res) => {
  const { email, bookId } = req.query;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  const match = { userEmail: email };
  if (bookId) {
    if (!isValidObjectId(bookId)) {
      res.status(400).json({ message: "Invalid book id" });
      return;
    }
    match.bookId = toObjectId(bookId);
  }

  const { savedCollection } = await getCollections();
  const saved = await savedCollection
    .aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: { path: "$book", preserveNullAndEmptyArrays: true } },
    ])
    .toArray();

  res.json(saved);
});

const createSaved = asyncHandler(async (req, res) => {
  const { bookId, userEmail } = req.body || {};
  if (!bookId || !userEmail) {
    res.status(400).json({ message: "Book id and email are required" });
    return;
  }

  if (!isValidObjectId(bookId)) {
    res.status(400).json({ message: "Invalid book id" });
    return;
  }

  const { savedCollection } = await getCollections();
  const existing = await savedCollection.findOne({
    userEmail,
    bookId: toObjectId(bookId),
  });

  if (existing) {
    res.status(200).json({ acknowledged: true, alreadySaved: true, existingId: existing._id });
    return;
  }

  const payload = {
    userEmail,
    bookId: toObjectId(bookId),
    createdAt: new Date(),
  };

  const result = await savedCollection.insertOne(payload);
  res.status(201).json(result);
});

const deleteSaved = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid saved id" });
    return;
  }

  const { savedCollection } = await getCollections();
  const result = await savedCollection.deleteOne({ _id: toObjectId(id) });

  if (result.deletedCount === 0) {
    res.status(404).json({ message: "Saved book not found" });
    return;
  }

  res.json(result);
});

module.exports = { getSaved, createSaved, deleteSaved };
