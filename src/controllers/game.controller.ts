import type { Request, Response } from "express";
import { checkGuess, getLevel } from "../data/levels.js";
import { prisma } from "../lib/prisma.js";

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

export async function registerWinner(req: Request, res: Response) {
    const { name, scene, timeMs } = req.body;

    if (typeof name !== "string" || typeof scene !== "number" || typeof timeMs !== "number") {
        return res.status(400).json({ error: "name, scene and timeMs are required" });
    }

    if (!getLevel(scene)) {
        return res.status(404).json({ error: "Level not found" });
    }

    const winner = await prisma.winner.create({
        data: { name, scene, timeMs },
    });

    res.status(201).json(winner);
}

export async function listWinners(req: Request, res: Response) {
    const scene = Number(req.params.sceneId);

    if (Number.isNaN(scene)) {
        return res.status(400).json({ error: "Invalid scene id" });
    }

    const winners = await prisma.winner.findMany({
        where: { scene },
        orderBy: { timeMs: "asc" },
        take: 10,
    });

    res.json(winners);
}