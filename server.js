import express from 'express';
import {products} from './data.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const PORT = process.env.PORT || 8000;

// This is essential for parsing incoming requests with data in the request in JSON format
app.use(express.json());
app.use(cors());

app.get('/api/products', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
