const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('blog.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create table for blog entries
db.run(`CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
)`);

app.use(express.json());


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submissions
app.post('/submit', (req, res) => {
    const title = req.body.title;
    const content = req.body.htmlContent; // Retrieve the HTML content instead of Markdown
    console.log('Received title:', title);
    console.log('Received content:', content);
    
    // Insert blog entry into the SQLite database
    db.run('INSERT INTO entries (title, content) VALUES (?, ?)', [title, content], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A new blog entry has been added with ID ${this.lastID}`);
        res.send('Blog entry submitted successfully!');
    });
});

// Route to retrieve blog entries
app.get('/entries', (req, res) => {
    // Select all blog entries from the SQLite database
    db.all('SELECT * FROM entries', (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        res.send(rows);
    });
});

// Start the server
const PORT = process.env.PORT || 3023;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
