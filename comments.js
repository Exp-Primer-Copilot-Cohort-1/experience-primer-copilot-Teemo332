// Create Web server
// Load Node modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_comments'
});

// Connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

// Set cors
app.use(cors());

// Set body parser
app.use(bodyParser.json());

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set port
const port = 5000;

// Listen port
app.listen(port, () => console.log(`Server started on port ${port}`));

// Create API
// Create user
app.post('/api/users/register', (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        image: 'default.png'
    };

    // Check email exists
    const sql = `SELECT * FROM users WHERE email = '${data.email}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({
                status: 400,
                message: 'Email already exists'
            });
        } else {
            // Insert data
            const sql = 'INSERT INTO users SET ?';
            conn.query(sql, data, (err, result) => {
                if (err) throw err;
                res.json({
                    status: 200,
                    message: 'User registered successfully'
                });
            });
        }
    });
});

// Login user
app.post('/api/users/login', (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // Check email exists
    const sql = `SELECT * FROM users WHERE email = '${data.email}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
