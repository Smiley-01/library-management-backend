const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Borrow a book
router.post('/', async (req, res) => {
    const { user_id, book_id } = req.body;
    try {
        // Check if the book is available in the Books table
        const [book] = await db.execute('SELECT is_available FROM Books WHERE id = ?', [book_id]);
        if (book.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the book is already borrowed
        const [borrowed] = await db.execute(
            'SELECT * FROM BorrowingHistory WHERE book_id = ? AND returned_at IS NULL',
            [book_id]
        );
        
        if (borrowed.length > 0) {
            // If there's already an active borrow record
            return res.status(400).json({ error: 'Book is currently borrowed' });
        }

        // Proceed to borrow the book
        await db.execute('INSERT INTO BorrowingHistory (user_id, book_id) VALUES (?, ?)', [user_id, book_id]);

        // Mark the book as not available
        await db.execute('UPDATE Books SET is_available = FALSE WHERE id = ?', [book_id]);

        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Return a book
router.put('/return/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Mark the book as returned in BorrowingHistory
        await db.execute('UPDATE BorrowingHistory SET returned_at = CURRENT_TIMESTAMP WHERE id = ? AND returned_at IS NULL', [id]);

        // Get the book_id of the returned book
        const [borrow] = await db.execute('SELECT book_id FROM BorrowingHistory WHERE id = ?', [id]);
        if (borrow.length === 0) return res.status(404).json({ error: 'Borrow record not found' });

        // Mark the book as available in Books
        await db.execute('UPDATE Books SET is_available = TRUE WHERE id = ?', [borrow[0].book_id]);

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Borrowing History for a User or Book
router.get('/history/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the borrowing history for a specific user or book
        const [history] = await db.execute(
            `SELECT bh.id, bh.user_id, bh.book_id, bh.borrowed_at, bh.returned_at, b.title as book_title, u.name as user_name 
            FROM BorrowingHistory bh 
            JOIN Books b ON bh.book_id = b.id
            JOIN Users u ON bh.user_id = u.id
            WHERE bh.user_id = ? OR bh.book_id = ?`,
            [id, id]
        );

        if (history.length === 0) {
            return res.status(404).json({ error: 'No borrowing history found' });
        }

        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
