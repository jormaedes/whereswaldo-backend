export type Character = {
    name: string;
    x: number;
    y: number;
    radius: number;
};

export type Level = {
    id: number;
    characters: Character[];
};

const DEFAULT_RADIUS = 0.03;

export const levels: Level[] = [
    {
        id: 0,
        characters: [
            { name: "waldo", x: 0.5278, y: 0.4909, radius: DEFAULT_RADIUS },
            { name: "odlaw", x: 0.2378, y: 0.4818, radius: DEFAULT_RADIUS },
            { name: "wizard", x: 0.6235, y: 0.4831, radius: DEFAULT_RADIUS },
        ],
    },
    {
        id: 1,
        characters: [
            { name: "waldo", x: 0.8404, y: 0.2916, radius: DEFAULT_RADIUS },
        ],
    },
    {
        id: 2,
        characters: [
            { name: "waldo", x: 0.9546, y: 0.0564, radius: DEFAULT_RADIUS },
        ],
    },
];

export function getLevel(id: number) {
    return levels.find((level) => level.id === id);
}

export function checkGuess(levelId: number, name: string, x: number, y: number) {
    const level = getLevel(levelId);
    const character = level?.characters.find((c) => c.name === name);
    if (!character) return { correct: false };

    const dx = x - character.x;
    const dy = y - character.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return {
        correct: distance <= character.radius,
        x: character.x,
        y: character.y,
    };
}