import 'dotenv/config'
import express from "express";
import { prisma } from './lib/prisma.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.json({sucess: 'ok'})
})

const PORT = process.env.PORT ?? 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));