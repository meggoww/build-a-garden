import express from 'express';
import {products} from './data.js';
import cors from 'cors';
import pg from 'pg';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8000;

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

// This is essential for parsing incoming requests with data in the request in JSON format
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.get('/api/products', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Database error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
