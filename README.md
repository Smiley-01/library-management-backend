# library-management-backend

Overview
This Library Management System API provides essential functionalities to manage books, users, borrowing history, and related operations. The system includes endpoints to handle books, users, authors, and borrowing/returning books, all supported by a MySQL database. The API is built using Node.js and Express, with a focus on simplicity, scalability, and ease of use.

# Design Choices
Technology Stack:
Node.js: Backend framework to handle requests and server-side logic.
Express: Web framework for building RESTful APIs.
MySQL: Relational database to store data.
Body-parser: Middleware to parse incoming request bodies.
dotenv: Environment variables for configuration (e.g., database credentials, server port).

# Architecture:
The system is designed to follow the RESTful architecture with clear separation of concerns. Each resource (e.g., books, users, borrowing) has its own set of routes, and each endpoint corresponds to a specific CRUD operation on the resource.

# Database Relationships
Tables:
1.Users Table: Stores user details such as name, email, and phone number.

Fields: id, name, email, phone

2.Books Table: Stores information about books such as title, author, and availability.

Fields: id, title, author, is_available

3.BorrowingHistory Table: Keeps track of borrowing and returning events, linking users and books.

Fields: id, user_id, book_id, borrowed_at, returned_at

4. Authors Table: Stores information about authors such as name and biography.

Fields: id, name, bio

# Database Diagram:
The relationships between the tables are as follows:

Users → BorrowingHistory → Books → Authors


# API Implementation
Books Endpoints:
POST /api/books: Adds a new book to the database. Requires the book's title, author, and genre.
GET /api/books: Fetches a list of books with pagination. Supports query parameters like page and limit.
GET /api/books/:id: Fetches details of a specific book by ID, including the author's name.
GET /api/books/search?q=searchTerm: Searches for books by title or author. The search is performed by matching the title or author's name to the query string.

Authors Endpoints:
POST /api/authors: Adds a new author to the database, including their name and biography.

Users Endpoints:
POST /api/users: Adds a new user to the database.
GET /api/users: Fetches a list of all users.
GET /api/users/:id: Fetches details of a specific user by ID.

Borrowing Endpoints:
POST /api/borrow: Allows a user to borrow a book. Checks if the book is available and creates a new entry in the BorrowingHistory table.
PUT /api/borrow/return/:id: Allows a user to return a borrowed book. Marks the book as returned in the BorrowingHistory table 
GET /api/borrow/history/:id: Fetches the borrowing history for a specific user or book.


# Conclusion:
This Library Management System API efficiently manages books, authors, users, and borrowing history. It ensures scalability and prevents redundancy through proper relational database design. The modular API endpoints allow easy extension and integration with front-end applications. The inclusion of authors as a distinct entity allows for greater flexibility when managing books and their relationships to authors.
