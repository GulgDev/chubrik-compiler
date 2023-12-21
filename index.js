import { GameMap } from "./arrows";
import { Asm } from "./asm";

function compile(asm) {
    const gameMap = new GameMap();
    let byteOffset = 0;
    for (const byte of Asm.compile(asm)) {
        let bitOffset = 0;
        for (const bit of byte.toString(2).padStart(8, "0").split("").map((bit) => bit === "1"))
            gameMap.setArrow(bitOffset, byteOffset * 2, bit ? 7 : 1, 1, false);
        byteOffset++;
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
