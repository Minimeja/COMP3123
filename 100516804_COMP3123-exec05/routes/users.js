const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET all users');
});

router.post('/', (req, res) => {
    res.send('POST a new user');
});

router.put('/:id', (req, res) => {
    res.send(`UPDATE user with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE user with ID: ${req.params.id}`);
});

module.exports = router;
