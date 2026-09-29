import 'dotenv/config'
import express from "express";
import router from "./routes/game.routes.js"
import cors from 'cors';

const app = express();


app.use(express.json());

app.use(cors({
	origin: process.env.FRONTEND_URL ?? "*",
}));

app.use('/api', router);

const PORT = process.env.PORT ?? 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));