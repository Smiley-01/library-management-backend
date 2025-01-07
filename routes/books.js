const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add a new book
router.post('/', async (req, res) => {
    const { title, author_id, is_available, published_date, genre } = req.body;
    try {
        // Format the date explicitly to YYYY-MM-DD
        const formattedDate = new Date(published_date).toISOString().split('T')[0];
        const [result] = await db.execute(
            'INSERT INTO Books (title, author_id, is_available, published_date, genre) VALUES (?, ?, ?, ?, ?)',
            [title, author_id, is_available, formattedDate, genre]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get book details by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute(
            'SELECT Books.id, Books.title, Books.is_available, Books.published_date, Books.genre, Authors.name AS author_name FROM Books JOIN Authors ON Books.author_id = Authors.id WHERE Books.id = ?',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });

        // Format the date explicitly to YYYY-MM-DD
        const formattedDate = new Date(rows[0].published_date).toISOString().split('T')[0];

        res.status(200).json({
            ...rows[0],
            published_date: formattedDate,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search for books by title or author
router.get('/search', async (req, res) => {
    const { q } = req.query;  // Get the search term from query parameters
    try {
        const [books] = await db.execute(
            'SELECT * FROM Books WHERE title LIKE ? OR author_name LIKE ?',
            [`%${q}%`, `%${q}%`]
        );
        if (books.length === 0) {
            return res.status(404).json({ error: 'No books found' });
        }
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
