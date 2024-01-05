const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// SQLite Database connection
const db = new sqlite3.Database('./db/loginapp.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  }
});

// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    db.get("SELECT * FROM users WHERE username = ?", [username], async (error, row) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (row) {
        return res.status(401).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (error) {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ id: this.lastID, username });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    db.get("SELECT * FROM users WHERE username = ?", [username], async (error, row) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (row) {
        const validPassword = await bcrypt.compare(password, row.password);
        if (validPassword) {
          res.json({ message: "Logged in successfully!" });
        } else {
          res.status(400).json("Invalid Password");
        }
      } else {
        res.status(400).json("User does not exist");
      }
    });
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
