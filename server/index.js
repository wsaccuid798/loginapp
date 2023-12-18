const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database connection
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust limit as needed
  host: '192.168.1.101', // Your MySQL server address
  user: 'loginappuser', // Replace with your MySQL username
  password: 'loginappuserpw', // Replace with your MySQL password
  database: 'loginapp',
  port: 3306
});

// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        
        if (results.length > 0) {
          return res.status(401).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user into database
        pool.query(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hashedPassword],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ id: results.insertId, username });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
          const validPassword = await bcrypt.compare(password, results[0].password);
          if (validPassword) {
            res.json({ message: "Logged in successfully!" });
          } else {
            res.status(400).json("Invalid Password");
          }
        } else {
          res.status(400).json("User does not exist");
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: "Test endpoint is working" });
});


// Start the server
const PORT = 5000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});
