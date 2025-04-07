import { GameMap } from "./arrows.js";

const top = new GameMap("AAACAAAAAAAGCRMAARAAIAAwAEAAAQICAgMCBAIFBAYEBwMIAQkBCgELAQwBDQEOAQ8BDAFBATICEwBCAQEAMwMQAEMBDgE0AUQEChUlAkUCJgJGAicCRwIoAkgCKQJJAioCSgIrAksCLAJMAi0CTQIuAk4CLwJPAgEAAAABCQoAAQEBAgEDAQQBBQEGARYAJgA2AEYACgkgAkACIQJBAiICQgIjAkMCJAJEAg==");
const bottom = new GameMap("AAAEAAAAAQABCggAAwIDEwAEAwYDCAMKAwwDDgMYCCMAMwBDACQDNANEAyUDNQNFAwAAAAAOCRsBABEAIQAxAEEAUQBhAXEBgQGRAaEAsQDBANEA4QDiAOQE5QTmBOcE6ATpBOoE6wTsBO0E7gTvBA4GAwbGA1cEyAPKA8wDzgMKFhMAUwRjAcMA8wAkAAUDFQZlASYDRgCmA2cBaAKIArgDWQNaAboDWwOsA74DXwMLCTMAFAElAQYHZgF2AocAeAFJA2kBDAtzAJMA0wAEAFQClAGWBZgFmgWcBZ4FfwEDBYMAZAK0AHUBqAJcAhIBowBEAgE5swA0AqQAVQGFATYBVgKGAbYABwMXAScAdwMIAxgBKAM4AQkDGQApAzkBiQEKBhoBKgM6AUoDigELAxsBKwM7AEsDiwEMAxwCLAI8AkwDjAENAx0ALQA9AU0AjQEOAh4BLgM+AE4DjgEPAx8CLwE/Ak8DjwENAnQGWAFdBxMIxAC1BjcCtwZIArkGuwa9Br8GBwE1AkUCEAyVBMUDRwGXBMcHmQTJB5sEywedBM0HnwTPBwUFpQSnBKkEqwStBK8EBAp6AaoCawF7AGwBfAO8AG0BfQNuAq4CBgB+AQEAAAALASYAAxABMANAAIABAQMRADEBQQOBAQICEgEiAzIBQgNyA4IBAwMTASMDMwJDA1MBYwCDAQQDFAEkAzQARABUAGQDBQMVAiUCNQJFAlUCZQMLAyABIQOEAfUCEAZQA3AAkQTBB2IAkwTDBwwDYAGQBVIHkgUKBqADsgN0A5UCtQLVAnYDBAGwAKICDgLAA8IDtAcJFOAE4QTiBOMA5ADmAAcAFwAnADcARwBXAGcAdwCHAJcApwC3AMcA1wDnABMEUQNhAXEDsQazBgUBoQSjBAgAlAENAKQHAQABAAAKAgADAgMEAw==");
const line = new GameMap("AAACAAAAAAAGCQEAABAAEwACAQYAEgAQAAMBDAATAAcABAEKCxQDFQIWAhcCGAIZAhoCGwIcAh0CHgIfAgEAAAABCgQQAhECEgITAhQCCQEGABYA");

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    let byteCount = bytes.length;

    if (byteCount < 8)
        bytes.push(...Array(8 - byteCount).fill(0));
    else if (byteCount % 4 != 0)
        bytes.push(...Array(4 - (byteCount % 4)).fill(0));
    
    byteCount = bytes.length;

    gameMap.paste(top, 1, 0);

    for (let row = 0; row < byteCount / 4; ++row) {
        let bytes_row = bytes.splice(0, 4);
        let y = row * 2 + 3;

        if (row > 0)
            gameMap.paste(line, 1, y);

        for (let i = 0; i < 4; ++i) {
            let byte = bytes_row.at(i);
            let x = i * 4 + 6;

            for (let j = 0; j < 4; ++j) {
                switch (byte & 0b11) {
                    case 0:
                        gameMap.setArrow(x + j, y, 1, 1);
                        break;
                    case 1:
                        gameMap.setArrow(x + j, y, 7, 1);
                        break;
                    case 2:
                        gameMap.setArrow(x + j, y, 7, 1, true);
                        break;
                    default:
                        gameMap.setArrow(x + j, y, 8, 1);
                }

                byte >>= 2;
            }
        }
    }
    gameMap.paste(bottom, 0, byteCount / 2 + 2);

    return gameMap.save();
}
