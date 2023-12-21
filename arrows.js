const CHUNK_SIZE = 16;

class Arrow {
    type = 0;
    rotation = 0;
    flipped = false;
}

class Chunk {
    arrows = new Array(CHUNK_SIZE ** 2).fill().map(() => new Arrow());
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getArrow(x, y) {
        return this.arrows[x + y * 16];
    }

    getArrowTypes() {
        const arrowTypes = new Set();
        for (const arrow of this.arrows)
            arrowTypes.add(arrow.type);
        return Array.from(arrowTypes);
    }
}

export class GameMap {
    chunks = [];

    setArrow(x, y, type, rotation, flipped) {
        Object.assign(this.getArrow(x, y), { type, rotation, flipped });
    }

    getArrow(x, y) {
        const chunk = this.getChunkByArrowCoordinates(x, y);
        return chunk.getArrow(x - chunk.x * CHUNK_SIZE, y - chunk.y * CHUNK_SIZE);
    }

    getChunkByArrowCoordinates(x, y) {
        const negativeCorrectionX = x < 0 ? 1 : 0;
        const negativeCorrectionY = x < 0 ? 1 : 0;
        const chunkX = ~~((x + negativeCorrectionX) / CHUNK_SIZE) - negativeCorrectionY;
        const chunkY = ~~((y + negativeCorrectionX) / CHUNK_SIZE) - negativeCorrectionY;
        return this.getChunk(chunkX, chunkY);
    }

    getChunk(x, y) {
        for (const chunk of this.chunks)
            if (chunk.x === x && chunk.y === y)
                return chunk;
        
        const chunk = new Chunk(x, y);
        this.chunks.push(chunk);
        return chunk;
    }

    save() {
        const buffer = [];
        buffer.push(0, 0);
        buffer.push(this.chunks.length & 0xFF, (this.chunks.length >> 8) & 0xFF);
        this.chunks.forEach((chunk) => {
            const arrowsTypes = chunk.getArrowTypes();
            const chunkBytesX = [
                Math.abs(chunk.x) & 0xFF,
                (Math.abs(chunk.x) >> 8) & 0xFF,
            ];
            const chunkBytesY = [
                Math.abs(chunk.y) & 0xFF,
                (Math.abs(chunk.y) >> 8) & 0xFF,
            ];
            if (chunk.x < 0)
                chunkBytesX[1] |= 0x80;
            else
                chunkBytesX[1] &= 0x7F;
            if (chunk.y < 0)
                chunkBytesY[1] |= 0x80;
            else
                chunkBytesY[1] &= 0x7F;
            buffer.push(...chunkBytesX);
            buffer.push(...chunkBytesY);
            buffer.push(arrowsTypes.length - 1);
            arrowsTypes.forEach((type) => {
                buffer.push(type);
                buffer.push(0);
                const typesCountIndex = buffer.length - 1;
                let typeCount = 0;
                for (let i = 0; i < CHUNK_SIZE; i++) {
                    for (let j = 0; j < CHUNK_SIZE; j++) {
                        const arrow = chunk.getArrow(i, j);
                        if (arrow.type === type) {
                            const position = i | (j << 4);
                            const rotation = arrow.rotation | ((arrow.flipped ? 1 : 0) << 2);
                            buffer.push(position);
                            buffer.push(rotation);
                            typeCount++;
                        }
                    }
                }
                buffer[typesCountIndex] = typeCount - 1;
            });
        });

        let binary = "";
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);

        return buffer;
    }
}
