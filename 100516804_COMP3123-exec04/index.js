const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.type('text/plain').send('Hello Express JS');
});

app.get('/user', (req, res) => {
  const firstname = req.query.firstname || 'Pritesh';
  const lastname = req.query.lastname || 'Patel';
  res.json({ firstname, lastname });
});

app.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

app.post('/users', (req, res) => {
  const users = req.body;
  if (!Array.isArray(users)) {
    return res.status(400).json({
      error: 'Request body must be an array of users with firstname and lastname'
    });
  }
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/instruction.html to view the static page.`);
});
