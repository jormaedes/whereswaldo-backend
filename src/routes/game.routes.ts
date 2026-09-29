import { Router } from "express";
import { guessCharacter, listWinners, registerWinner } from "../controllers/game.controller.js";

const router = Router();

router.post("/guess", guessCharacter);
router.post("/winner", registerWinner);
router.get("/levels/:sceneId/winners", listWinners);

export default router;