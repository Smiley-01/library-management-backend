CREATE DATABASE LibraryManagement;
USE LibraryManagement;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES Authors(id)
);

CREATE TABLE BorrowingHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id INT,
    borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returned_at TIMESTAMP NULL,
    FOREIGN KEY (book_id) REFERENCES Books(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO authors (name, bio) 
VALUES 
('J.K. Rowling', 'British author, best known for writing the Harry Potter series.'),
('George R.R. Martin', 'American novelist and short story writer, famous for "A Song of Ice and Fire" series.'),
('J.R.R. Tolkien', 'English writer, poet, and professor, renowned for "The Lord of the Rings".'),
('Agatha Christie', 'English writer known for her detective novels, especially featuring Hercule Poirot and Miss Marple.'),
('Stephen King', 'American author of horror, supernatural fiction, suspense, and fantasy novels.');



