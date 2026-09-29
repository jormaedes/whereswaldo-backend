import { Router } from "express";
import { guessCharacter } from "../controllers/game.controller.js";

const router = Router();

router.post("/guess", guessCharacter);

export default router;