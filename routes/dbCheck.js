const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Check database connection
router.get('/check', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Error executing test query:', err);
            res.status(500).send('Database connection failed');
        } else {
            res.send('Database connection successful');
        }
    });
});

module.exports = router;
