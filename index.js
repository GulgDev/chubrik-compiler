import { GameMap } from "./arrows.js";

function compile(asm) {
    const gameMap = new GameMap();
    gameMap.setArrow(0, 0, 1, 0, false);
    return gameMap.save();
}

document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("source");
    const output = document.getElementById("output");

    source.addEventListener("input", () => {
        output.value = compile(source.value);
    });
});
