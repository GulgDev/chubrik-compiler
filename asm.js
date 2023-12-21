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
    static function tokenize(asm) {
    }
    
    static function compile(asm) {
        return [0b00000000, 0b01010100];
    }
}
