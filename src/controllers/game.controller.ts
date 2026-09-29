import type { Request, Response } from "express";
import { checkGuess, getLevel } from "../data/levels.js";

export function guessCharacter(req: Request, res: Response) {
    const { levelId, name, x, y } = req.body;

    if (
        typeof levelId !== "number" ||
        typeof name !== "string" ||
        typeof x !== "number" ||
        typeof y !== "number"
    ) {
        return res.status(400).json({ error: "levelId, name, x and y are required" });
    }

    const level = getLevel(levelId);
    if (!level) {
        return res.status(404).json({ error: "Level not found" });
    }

    const result = checkGuess(levelId, name, x, y);

    res.json(result);
}