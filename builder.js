import { GameMap } from "./arrows.js";

const top = new GameMap("AAACAAAAAAALCwWgAIUDxQGmAccDiQYKB8AAlAG0AsQAmwGrAssDnQEBOJEBkgEkAWQBJQFlAXUDlQG1AiYBNgFGAVYBZgEnATcBRwFXAWcBpwYoATgBSAFYAWgBuAQpATkBSQFZAWkByQcqAToBSgFaAWoBKwE7AUsBWwFrASwBPAFMAVwBbAEtAT0BTQFdAW0BLwM/A08DXwNvAwkWAgASACIAMgBCAFIAYgByALIAwgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPAA0DggKiBKQAxgcMA5MBpQG2A58BBQo0AEQAVAA1AUUBVQEuAT4BTgFeAW4BEgJ0AJYAtwEOA4QFhgGaAqoFDwGHAqgBEAGXAakABA14AYgAmADIA3kBmQN6AYoDewGLA3wBjAN9Ao0DAQAAAAkJFwAAAQACAAMABAAFAAYABwAIAAkACgALABsAKwA7AEsAWwBrAHsAiwCbAKsAuwDLAAoMUAKAAoECggJjAoMCZAaEAmUGhQKGAocCeAATB3ACYQBSAEMANARFBFYEZwQNB5ABkQGSAZMBlAGVAZYBmAAQDqACUQOhAkIDogIzA6MCJAekAjUEpQJGBKYCVwSnAgEPsAGxAnICsgGzAlQGtAG1AnYGtgGXArcCuAGpArkCyQIMA0ECMgIjApkCBQZxAmICUwJEBlUGZgZ3BgsDwQDDAMUAxwAOAyUHNgdHB1gH");
const bottom = new GameMap("AAACAAAAAAAFCgoQADAAUABBA0MDRQNHA0kDSwNNA08DCwFhAxUACQ8CABIAIgAjAiQAJQAmACcAKAApACoAKwAsAC0ALgAvABgIYgNyAIIAYwNzAIMAZAN0AIQAAQIEAQUBFgASAAYEAQAAAAIJCiAAIQAiACMAJAAlACYAJwALABsAKwAKBkEDQwNFA0cDCQIpAkkDDQEoASoH");
const line = new GameMap("AAACAAAAAAAJCgEQABoFCQECABIABwEEBhQGDgEFARUBEgEGBBYEBQEHARcBDAEIARgBAwEJARkBCwAKBgEECwUMBQ0FDgUPBQEAAAABAQoABQEFAgUDBQQFBQUGBQcFCAUJAhkCCQELABsA");

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    const byteCount = bytes.length;

    gameMap.paste(bottom, -2, -2);

    let y = -3;

    for (let i = 0; i < byteCount; ++i) {
        let byteA = bytes[i];
        let byteB = bytes[++i] ?? 0;

        for (let x = 9; x < 21; ++x) {
            gameMap.setArrow(x, y, byteB & 0b10000000 ? 13 : 10, 1, true);
            byteB <<= 1;

            ++x;

            gameMap.setArrow(x, y, byteA & 0b10000000 ? 13 : 10, 1, true);
            byteA <<= 1;
        }

        const bitBA = byteB & 0b10000000;
        const bitBB = (byteB << 1) & 0b10000000;
        if (bitBA && bitBB)
            gameMap.setArrow(21, y, 14, 0, false);
        else if (bitBA)
            gameMap.setArrow(21, y, 1, 0, false);
        else if (bitBB)
            gameMap.setArrow(21, y, 11, 0, false);

        const bitAA = byteA & 0b10000000;
        const bitAB = (byteA << 1) & 0b10000000;
        if (bitAA && bitAB)
            gameMap.setArrow(22, y, 14, 0, false);
        else if (bitAA)
            gameMap.setArrow(22, y, 1, 0, false);
        else if (bitAB)
            gameMap.setArrow(22, y, 11, 0, false);

        --y;

        gameMap.paste(line, -2, y);

        --y;
    }

    y -= 12;

    gameMap.paste(top, -2, y);

    return gameMap.save();
}