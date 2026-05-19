const express = require("express");
require("./config/env");
const cors = require("cors");
const booksRoutes = require("./routes/books.routes");
const commentsRoutes = require("./routes/comments.routes");
const savedRoutes = require("./routes/saved.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const { connectToDatabase } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Haven API is running");
});

app.use("/books/comments", commentsRoutes);
app.use("/books", booksRoutes);
app.use("/saved", savedRoutes);

app.use(notFound);
app.use(errorHandler);

// Warm up the DB connection without blocking startup.
connectToDatabase().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

module.exports = app;
