import 'dotenv/config'
import express from "express";
import { prisma } from './lib/prisma';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const user = await prisma.winner.create({
        data: {
            name: 'Herodes',
            scene: 0,
            timeMs: 78,
        },
    })
    res.json({user: user});
})

const PORT = process.env.PORT ?? 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));