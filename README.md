---

## 🟩 SERVER SIDE — `README.md` (Node.js + Express + MongoDB)

```markdown
# 🛠️ The Book Haven Server

Backend service for **The Book Haven**, a digital library web application.  
Built with **Node.js**, **Express.js**, and **MongoDB Atlas**, this API manages books, users, and comments, providing secure CRUD functionality and authentication handling.

---

## 🌐 Live API URL
🔗 [Deployed API on Vercel](https://the-book-haven-server.vercel.app)

---

## 📁 Folder Structure

book-haven-server/
│
├── index.js # Entry point
├── package.json
├── .env # Environment variables
└── /routes
└── books.js # All book-related routes


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

## 🧱 API Endpoints

### 🔹 Books Collection

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/books` | Get all books (supports sorting/filtering) |
| GET | `/books/:id` | Get single book details |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/myBooks?email=user@gmail.com` | Get books added by a specific user |

### 🔹 Comments (optional)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/comments` | Add a new comment for a book |
| GET | `/comments/:bookId` | Get all comments for a book |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
DB_NAME=bookHavenDB

🚀 Run Locally

# Clone the repo
git clone https://github.com/yourusername/the-book-haven-server.git

# Go to server directory
cd the-book-haven-server

# Install dependencies
npm install

# Run the server
npm run start

Server runs on:
http://localhost:5000

🧾 Example Book Schema

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

🧰 Dependencies
Package	Purpose
express	Server framework
mongodb	MongoDB client
cors	Handle CORS
dotenv	Manage environment variables
nodemon	Auto-restart during development
🧑‍💻 Developer Info

Developer: [Sadnur Islam]
📧 Contact: [sadnurislam@gmail.com]
🔗 Client Repo: https://github.com/yourusername/the-book-haven-client
