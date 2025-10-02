const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const isDev = process.env.NODE_ENV === 'development';
  res.type('text/plain'); // Set content type to text/plain
  res.status(500).send(`Error ${res.statusCode}: ${isDev ? err.message : 'Something went wrong!'}\nPlease try again later.`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});