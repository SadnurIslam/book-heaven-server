# 🛠️ The Book Haven Server

Backend service for **The Book Haven**, a digital library web application.  
Built with **Node.js**, **Express.js**, and **MongoDB Atlas**, this API manages books, users, and comments, providing secure CRUD functionality and authentication handling.

---

## 🌐 Live API URL
🔗 [Deployed API on Vercel](https://book-heaven-server-jade.vercel.app/)

---

## 🧩 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Cors**
- **Dotenv**
- **Nodemon**
- **Vercel** for deployment

---

## 🗂️ Project Structure

```
book-heaven-server/
  index.js
  src/
    app.js
    config/
      db.js
      env.js
    controllers/
      books.controller.js
      comments.controller.js
    middlewares/
      asyncHandler.js
      errorHandler.js
      notFound.js
    routes/
      books.routes.js
      comments.routes.js
    utils/
      validateObjectId.js
```

---

## 🧱 API Endpoints

### 🔹 Books Collection

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/books` | Get all books (supports sorting/filtering) |
| GET | `/books/:id` | Get single book details |
| POST | `/books` | Add a new book |
| PATCH/PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/books?email=user@gmail.com` | Get books added by a specific user |

### 🔹 Comments 
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/books/comments` | Add a new comment for a book |
| GET | `/books/comments/:bookId` | Get all comments for a book |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory. `MONGODB_URI` is recommended for local and deployed setups:

```bash
PORT=3000
# Recommended
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.leame9e.mongodb.net/?appName=Cluster0

# Optional (if not using MONGODB_URI)
DB_USER=your_mongodb_user
DB_PASSWORD=your_mongodb_password
DB_HOST=cluster0.leame9e.mongodb.net
DB_APP_NAME=Cluster0
DB_NAME=booksDB
```

---

## 🚀 Run Locally

```bash

## Clone the repo
git clone https://github.com/yourusername/the-book-haven-server.git

# Go to server directory
cd the-book-haven-server

# Install dependencies
npm install

# Run the server
npm run start

# Run with nodemon
npm run dev

Server runs on:
http://localhost:3000
```

---

## 🧾 Example Book Schema

```bash

{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fantasy",
  "rating": 4.5,
  "summary": "Short description about the book.",
  "coverImage": "https://i.ibb.co/xyz.jpg",
  "userEmail": "user@example.com",
  "userName": "User Name",
  "createdAt": "2025-11-12T10:00:00Z"
}
```

---

## 🧰 Dependencies

| Package | Purpose |
|---------|---------|
| express | Server framework |
| mongodb | MongoDB client |
| cors | Handle CORS |
| dotenv | Manage environment variables |
| nodemon | Auto-restart during development |

--- 

## 🧑‍💻 Developer Info

**Developer:** [Sadnur Islam](https://github.com/SadnurIslam)  
**Contact:** sadnurislam@gmail.com  