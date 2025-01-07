const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add a new user
router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO Users (name, email, phone) VALUES (?, ?, ?)',
            [name, email,phone]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch user details by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;  // Extract the user ID from the request parameters
    try {
        const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(rows[0]);  // Send back the user data
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
