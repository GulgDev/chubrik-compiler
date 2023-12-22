import { GameMap } from "./arrows.js";
import { Asm } from "./asm.js";

function compile(asm) {
    const gameMap = new GameMap();

    let yOffset = 0;
    for (const byte of Asm.compile(asm)) {
        gameMap.setArrow(0, yOffset, 9, 0, false);
        gameMap.setArrow(18, yOffset, 9, 0, false);

        gameMap.setArrow(3, yOffset, 19, 1, false);
        gameMap.setArrow(4, yOffset, 16, 1, false);
        gameMap.setArrow(5, yOffset, 13, 1, true);

        let bitOffset = 7;
        for (const bit of byte.toString(2).padStart(8, "0").split("").map((bit) => bit === "1")) {
            gameMap.setArrow(bitOffset, yOffset, bit ? 7 : 1, 1, false);
            gameMap.setArrow(bitOffset, yOffset + 1, 10, 2, false);
            bitOffset++;
        }
        yOffset++;

        gameMap.setArrow(2, yOffset, 10, 0, false);
        gameMap.setArrow(3, yOffset, 6, 0, false);
        gameMap.setArrow(4, yOffset, 12, 1, false);
        gameMap.setArrow(5, yOffset, 10, 3, true);

        gameMap.setArrow(16, yOffset, 10, 2, false);

        gameMap.setArrow(0, yOffset, 9, 0, false);
        gameMap.setArrow(18, yOffset, 9, 0, false);

        yOffset++;
    }
    return gameMap.save();
}

document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("source");
    const output = document.getElementById("output");

    source.addEventListener("input", () => {
        output.value = compile(source.value);
    });
});
