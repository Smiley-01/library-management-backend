const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add a new author
router.post('/', async (req, res) => {
    const { name, bio } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO Authors (name, bio) VALUES (?, ?)',
            [name, bio]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
