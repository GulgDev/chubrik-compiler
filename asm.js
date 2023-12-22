const TOKEN = {
    INSTRUCTION: 0x0,
    NUMBER: 0x1,
    NAME: 0x2,
    CHAR: 0x03
};

const instructions = [
    "adc", "add", "and", "dec", "exp", "inc", "jc", "jmp",
    "jnc", "jno", "jns", "jnz", "jo", "js", "jz", "ld",
    "ldi", "mov", "neg", "nop", "not", "or", "rcl", "rcr",
    "rnd", "sar", "sbb", "shl", "shr", "st", "sub", "xor"
];

class Token {
    constructor(type, value, position) {
        this.type = type;
        this.value = value;
        this.position = position;
    }
}

export class Asm {
    static *tokenize(asm) {
        yield new Token(TOKEN.CHAR, ".", [0, 0]);
    }
    
    static compile(asm) {
        const gen = this.tokenize(asm);
        let token = gen.next().value;
        return [0b00000000, 0b01010100];
    }
}
