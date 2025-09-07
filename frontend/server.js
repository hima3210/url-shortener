const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/shorten', async (req, res) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/shorten/`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
});

app.get('/api/urls', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/urls/`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
});