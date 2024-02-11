import { GameMap } from "./arrows.js";

const top = new GameMap("AAACAAAAAAAGCRMAARAAIAAwAEAAAQICAgMCBAIFBAYEBwMIAQkBCgELAQwBDQEOAQ8BDAFBATICEwBCAQEAMwMQAEMBDgE0AUQEChUlAkUCJgJGAicCRwIoAkgCKQJJAioCSgIrAksCLAJMAi0CTQIuAk4CLwJPAgEAAAABCQoAAQEBAgEDAQQBBQEGARYAJgA2AEYACgkgAkACIQJBAiICQgIjAkMCJAJEAg==");
const bottom = new GameMap("AAAEAAAAAQABCggAAwIDEwAEAwYDCAMKAwwDDgMYCCMAMwBDACQDNANEAyUDNQNFAwAAAAAOCRsBABEAIQAxAEEAUQBhAXEBgQGRAaEAsQDBANEA4QDiAOQE5QTmBOcE6ATpBOoE6wTsBO0E7gTvBA4GAwbGA1cEyAPKA8wDzgMKFRMAUwRjAcMA8wAkAAUDFQZlASYDRgCmA2cBaAK4A1kDWgG6A1sDrAO+A18DCwkzABQBJQEGB2YBdgKHAHgBSQNpAQwLcwCTANMABABUApQBlgWYBZoFnAWeBX8BAwWDAGQCtAB1AYgCXAISAaMARAIBObMANAKkAFUBhQE2AVYChgG2AAcDFwEnAHcDCAMYASgDOAEJAxkAKQM5AYkBCgYaASoDOgFKA4oBCwMbASsDOwBLA4sBDAMcAiwCPAJMA4wBDQMdAC0APQFNAI0BDgIeAS4DPgBOA44BDwMfAi8BPwJPA48BDQJ0BlgBXQcTCMQAtQY3ArcGSAK5BrsGvQa/BgcBNQJFAhAMlQTFA0cBlwTHB5kEyQebBMsHnQTNB58EzwcFBaUEpwSpBKsErQSvBAQKegGqAmsBewBsAXwDvABtAX0DbgKuAgYAfgEBAAAACwEmAAMQATADQACAAQEDEQAxAUEDgQECAhIBIgMyAUIDcgOCAQMDEwEjAzMCQwNTAWMAgwEEAxQBJAM0AEQAVABkAwUDFQIlAjUCRQJVAmUDCwMgASEDhAH1AhAGUANwAJEEwQdiAJMEwwcMA2ABkAVSB5IFCgagA7IDdAOVArUC1QJ2AwQBsACiAg4CwAPCA7QHCRTgBOEE4gTjAOQA5gAHABcAJwA3AEcAVwBnAHcAhwCXAKcAtwDHANcA5wATBFEDYQFxA7EGswYFAaEEowQIAJQBDQCkBwEAAQAACgIAAwIDBAM=");
const line = new GameMap("AAACAAAAAAAGCQEAABAAEwACAQYAEgAQAAMBDAATAAcABAEKCxQDFQIWAhcCGAIZAhoCGwIcAh0CHgIfAgEAAAABCgQQAhECEgITAhQCCQEGABYA");

export function buildDisk(bytes) {
    const gameMap = new GameMap();

    const byteCount = bytes.length;

    if (byteCount < 8)
        bytes.push(...Array(8 - byteCount).fill(0));
    if (byteCount % 4 != 0)
        bytes.push(...Array(4 - byteCount).fill(0));

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
