import { GameMap } from "./arrows.js";

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    const byteCount = bytes.length;
    const lastByte = byteCount - 1;
    const penultByte = lastByte - 1;

    let yOffset = -byteCount * 2 - 17;

    for (let xOffset = 0; xOffset < 19; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 9, 0, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 13, 2, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    ++yOffset;

    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-3, yOffset, 3, 1, false);
    for (let xOffset = -2; xOffset < 2; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 1, 1, false);

    gameMap.setArrow(2, yOffset, 12, 2, false);
    gameMap.setArrow(3, yOffset, 4, 2, false);
    for (let xOffset = 4; xOffset < 11; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 4, 3, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 13, 0, true);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-3, yOffset, 18, 0, false);
    gameMap.setArrow(-2, yOffset, 1, 0, false);

    gameMap.setArrow(2, yOffset, 1, 1, false);
    gameMap.setArrow(3, yOffset, 13, 2, true);
    for (let xOffset = 4; xOffset < 9; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 4, 1, false);
    gameMap.setArrow(9, yOffset, 1, 1, false);
    gameMap.setArrow(10, yOffset, 1, 0, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-3, yOffset, 1, 0, false);
    gameMap.setArrow(-2, yOffset, 14, 0, true);

    gameMap.setArrow(2, yOffset, 10, 2, false);
    gameMap.setArrow(3, yOffset, 19, 1, false);
    gameMap.setArrow(4, yOffset, 3, 0, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-2, yOffset, 14, 0, true);

    gameMap.setArrow(2, yOffset, 11, 0, false);
    gameMap.setArrow(3, yOffset, 10, 2, false);
    gameMap.setArrow(4, yOffset, 19, 2, false);
    gameMap.setArrow(5, yOffset, 1, 3, false);
    for (let xOffset = 6; xOffset < 11; ++xOffset) {
        gameMap.setArrow(++xOffset, yOffset, 16, 2, false);
        gameMap.setArrow(++xOffset, yOffset, 19, 3, false);
        gameMap.setArrow(++xOffset, yOffset, 12, 3, false);
    }

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(2, yOffset, 10, 2, false);
    for (let xOffset = 3; xOffset < 13;) {
        gameMap.setArrow(++xOffset, yOffset, 5, 2, false);
        gameMap.setArrow(++xOffset, yOffset, 16, 0, false);
        gameMap.setArrow(++xOffset, yOffset, 19, 3, false);
        gameMap.setArrow(++xOffset, yOffset, 12, 3, false);
    }

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-2, yOffset, 10, 0, false);

    gameMap.setArrow(2, yOffset, 10, 0, false);
    gameMap.setArrow(3, yOffset, 12, 2, false);
    for (let xOffset = 4; xOffset < 15; xOffset += 2)
        gameMap.setArrow(xOffset, yOffset, 5, 2, false);
    gameMap.setArrow(16, yOffset, 10, 2, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(2, yOffset, 10, 2, false);
    for (let xOffset = 2; xOffset < 13;) {
        gameMap.setArrow(++xOffset, yOffset, 12, 1, false);
        gameMap.setArrow(++xOffset, yOffset, 16, 2, false);
    }
    gameMap.setArrow(15, yOffset, 13, 0, false);
    gameMap.setArrow(16, yOffset, 6, 0, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-2, yOffset, 10, 0, false);

    gameMap.setArrow(2, yOffset, 10, 0, false);
    gameMap.setArrow(3, yOffset, 4, 2, false);
    for (let xOffset = 4; xOffset < 15; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 1, 1, false);
    gameMap.setArrow(15, yOffset, 11, 1, false);
    gameMap.setArrow(16, yOffset, 10, 2, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(2, yOffset, 11, 1, false);
    gameMap.setArrow(3, yOffset, 4, 1, false);
    gameMap.setArrow(4, yOffset, 4, 1, false);
    gameMap.setArrow(5, yOffset, 1, 2, false);
    gameMap.setArrow(16, yOffset, 1, 0, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(-2, yOffset, 10, 0, false);

    gameMap.setArrow(2, yOffset, 10, 0, false);
    gameMap.setArrow(3, yOffset, 1, 2, false);
    gameMap.setArrow(4, yOffset, 12, 2, false);
    gameMap.setArrow(5, yOffset, 1, 3, false);
    gameMap.setArrow(16, yOffset, 10, 2, false);

    ++yOffset;

    for (let i = 0; i < byteCount; ++i) {
        const byte = bytes[i];

        gameMap.setArrow(0, yOffset, 9, 0, false);
        gameMap.setArrow(18, yOffset, 9, 0, false);

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

        gameMap.setArrow(-2, yOffset, 10, 0, false);

        gameMap.setArrow(2, yOffset, 10, 0, false);
        if (i < lastByte) {
            gameMap.setArrow(3, yOffset, 6, 0, false);
            gameMap.setArrow(4, yOffset, i === penultByte ? 1 : 12, 2, false);
            gameMap.setArrow(5, yOffset, 10, 3, false);
        } else {
            gameMap.setArrow(3, yOffset, 3, 0, false);
            gameMap.setArrow(4, yOffset, 12, 3, false);
            gameMap.setArrow(5, yOffset, 7, 2, false);
        }

        gameMap.setArrow(0, yOffset, 9, 0, false);
        gameMap.setArrow(18, yOffset, 9, 0, false);
        
        gameMap.setArrow(16, yOffset, 10, 2, false);

        ++yOffset;
    }

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(5, yOffset, 4, 2, false);
    
    ++yOffset;

    gameMap.setArrow(-2, yOffset, 10, 0, false);

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(5, yOffset, 4, 2, false);

    for (let xOffset = 7; xOffset < 14; ++xOffset) {
        gameMap.setArrow(xOffset, yOffset, 1, 2, false);
        gameMap.setArrow(xOffset, yOffset + 1, 11, 0, false);
    }

    gameMap.setArrow(14, yOffset, 10, 1, false);
    gameMap.setArrow(16, yOffset, 10, 2, false);

    ++yOffset;

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(5, yOffset, 4, 2, false);

    ++yOffset;

    gameMap.setArrow(-2, yOffset, 10, 0, false);

    gameMap.setArrow(0, yOffset, 9, 0, false);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    gameMap.setArrow(5, yOffset, 4, 1, false);

    for (let xOffset = 6; xOffset < 14; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 1, 1, false);

    gameMap.setArrow(14, yOffset, 19, 1, false);
    gameMap.setArrow(15, yOffset, 3, 1, false);
    gameMap.setArrow(16, yOffset, 10, 2, false);

    ++yOffset;

    gameMap.setArrow(-2, yOffset, 24, 0, false);
    gameMap.setArrow(-1, yOffset, 24, 3, false);

    gameMap.setArrow(0, yOffset, 14, 2, true);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    ++yOffset;

    gameMap.setArrow(-2, yOffset, 24, 0, false);
    gameMap.setArrow(-1, yOffset, 24, 3, false);

    gameMap.setArrow(0, yOffset, 14, 0, false);
    for (let xOffset = 1; xOffset < 15; ++xOffset)
        gameMap.setArrow(xOffset, yOffset, 9, 0, false);
    gameMap.setArrow(15, yOffset, 13, 1, false);
    gameMap.setArrow(16, yOffset, 10, 2, false);
    gameMap.setArrow(17, yOffset, 13, 3, true);
    gameMap.setArrow(18, yOffset, 9, 0, false);

    return gameMap.save();
}