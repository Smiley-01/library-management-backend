const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const booksRoute = require('./routes/books');
const authorsRoute = require('./routes/authors');
const usersRoute = require('./routes/users');
const borrowingRoute = require('./routes/borrowing');

const app = express();
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System API! Use the /api endpoints to interact with the system.');
});

// Routes
app.use('/api/books', booksRoute);
app.use('/api/authors', authorsRoute);
app.use('/api/users', usersRoute);
app.use('/api/borrow', borrowingRoute);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
