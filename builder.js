import { GameMap } from "./arrows.js";

const top = new GameMap("AAACAAAAAAANCwYwALQBxAC3AsoAzADOAAoSUABwAJAAsAB0ApQClQGlAFkCiQKKAosCbAKMAm0GjQJuBo4CjwIBEyEBIgE0AkQCZAElArUAxQInAigDuQG6AnsCuwG8Al0GvQG+An8GvwEJFgIAQgBSAGIAcgCCAJIAogCyAMIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwANCRICMgR1BpkBmgGbAZwBnQGeAZ8BDAYjAVQCxgKYAUoCOwIsAg4CJAYuBz8HEgA1AgMBRQOGAAQPZQJWAmYDdgGmArYBNwJHAlcDZwF3AKcDOABIAFgAaAATB4UBeQJqAFsATAA9BE4EXwQHAJcBEAypAloDqgJLA6sCPAOsAi0HrQI+BK4CTwSvAgUFegJrAlwCTQZeBm8GAQAAAAkJEAAAAQACAAMABAAUACQANABEAFQAZAB0AIQAlACkALQAxAAOAUAHUQcQAVAEoAITAGAEBQBwBgoCgAJxAMICAQSQArACsQGiArICCwDAAA0AkQAMAJIC");
const bottom = new GameMap("AAACAAAAAAAHCgEAACAAGAUwAEAAUAAxA0EDUQMJDwIAEgAiAFMAVABVAFYAVwBYAFkAWgBbAFwAXQBeAF8ADAEyAlIADgFCAAUEAQ8GAzgBGQI5ARoCOgEbAjsBHAI8AR0CPQEeAj4BHwI/AQQDBwIXAicCNwELBikAKgArACwALQAuAC8AAQAAAAQKAxAFEgIyAlICEwAwAQkGUAAEABQAJAA0AEQAVAADADEBDQFRAVMH");

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    const byteCount = bytes.length;
    const lastByte = byteCount - 1;

    let yOffset = -byteCount * 2 - 19;

    gameMap.paste(top, -2, yOffset);

    yOffset += 13;

    for (let i = 0; i < byteCount; ++i) {
        const byte = bytes[i];

        gameMap.setArrow(0, yOffset, 9, 0, false);
        gameMap.setArrow(18, yOffset, 9, 0, false);

        gameMap.setArrow(-2, yOffset, 10, 0, false);

        gameMap.setArrow(3, yOffset, 19, 1, false);
        gameMap.setArrow(4, yOffset, 16, 1, false);
        gameMap.setArrow(5, yOffset, 13, 1, false);

        let xOffset = 7;
        for (const bit of byte.toString(2).padStart(8, "0").split("").map((bit) => bit === "1")) {
            gameMap.setArrow(xOffset, yOffset, bit ? 7 : 1, 1, false);
            gameMap.setArrow(xOffset, yOffset + 1, 10, 2, false);
            ++xOffset;
        }
        ++yOffset;

        gameMap.setArrow(0, yOffset, 9, 0, false);
        gameMap.setArrow(18, yOffset, 9, 0, false);

        gameMap.setArrow(2, yOffset, 10, 0, false);
        if (i < lastByte) {
            gameMap.setArrow(3, yOffset, 6, 0, false);
            gameMap.setArrow(4, yOffset, 12, 2, false);
            gameMap.setArrow(5, yOffset, 10, 3, false);
        } else {
            gameMap.setArrow(3, yOffset, 3, 0, false);
            gameMap.setArrow(5, yOffset, 14, 2, false);
        }
        
        gameMap.setArrow(16, yOffset, 10, 2, false);

        ++yOffset;
    }

    gameMap.paste(bottom, -2, yOffset);

    return gameMap.save();
}