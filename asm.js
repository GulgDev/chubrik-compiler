const Args = {
    A: 0x0,
    B: 0x1,
    C: 0x2,
    D: 0x3,
    ZERO: 0x4,
    NUM: 0x5,
    REF: 0x6
};

const instructions = [
    "adc", "add", "and", "dec", "exp", "hlt", "inc", "jc",
    "jmp", "jnc", "jno", "jns", "jnz", "jo", "js", "jz",
    "ld", "ldi", "mov", "neg", "not", "or", "rcl", "rcr",
    "rnd", "sar", "sbb", "shl", "shr", "st", "sub", "xor"
];

const registers = ["a", "b", "c", "d"];

class Command {
    constructor(instruction, args, opcode) {
        this.instruction = instruction;
        this.args = args;
        this.opcode = opcode;
    }

    match(instruction, args) {
        const argc = this.args.length;
        let match = this.instruction === instruction && argc === args.length;
        if (match)
            for (let i = 0; i < argc; ++i) {
                const argType = this.args[i];
                const input = args[i][0];
                if (argType !== input && !(input === Args.ZERO && argType === Args.NUM) && !(input === Args.NUM && argType === Args.REF)) {
                    match = false;
                    break;
                }
            }
        return match;
    }
}

const commands = [
    new Command("mov", [Args.A, Args.ZERO], 0x00),
    new Command("mov", [Args.A, Args.B], 0x01),
    new Command("mov", [Args.A, Args.C], 0x02),
    new Command("mov", [Args.A, Args.D], 0x03),
    new Command("mov", [Args.A, Args.ZERO], 0x04),
    new Command("mov", [Args.B, Args.A], 0x05),
    new Command("mov", [Args.C, Args.A], 0x06),
    new Command("mov", [Args.D, Args.A], 0x07),
    new Command("and", [Args.A, Args.ZERO], 0x08),
    new Command("and", [Args.A, Args.B], 0x09),
    new Command("and", [Args.A, Args.C], 0x0A),
    new Command("and", [Args.A, Args.D], 0x0B),
    new Command("and", [Args.A, Args.ZERO], 0x0C),
    new Command("and", [Args.B, Args.A], 0x0D),
    new Command("and", [Args.C, Args.A], 0x0E),
    new Command("and", [Args.D, Args.A], 0x0F),
    
    new Command("or", [Args.A, Args.ZERO], 0x10),
    new Command("or", [Args.A, Args.B], 0x11),
    new Command("or", [Args.A, Args.C], 0x12),
    new Command("or", [Args.A, Args.D], 0x13),
    new Command("or", [Args.A, Args.ZERO], 0x14),
    new Command("or", [Args.B, Args.A], 0x15),
    new Command("or", [Args.C, Args.A], 0x16),
    new Command("or", [Args.D, Args.A], 0x17),
    new Command("xor", [Args.A, Args.ZERO], 0x18),
    new Command("xor", [Args.A, Args.B], 0x19),
    new Command("xor", [Args.A, Args.C], 0x1A),
    new Command("xor", [Args.A, Args.D], 0x1B),
    new Command("xor", [Args.A, Args.ZERO], 0x1C),
    new Command("xor", [Args.B, Args.A], 0x1D),
    new Command("xor", [Args.C, Args.A], 0x1E),
    new Command("xor", [Args.D, Args.A], 0x1F),

    new Command("add", [Args.A, Args.ZERO], 0x20),
    new Command("add", [Args.A, Args.B], 0x21),
    new Command("add", [Args.A, Args.C], 0x22),
    new Command("add", [Args.A, Args.D], 0x23),
    new Command("add", [Args.A, Args.ZERO], 0x24),
    new Command("add", [Args.B, Args.A], 0x25),
    new Command("add", [Args.C, Args.A], 0x26),
    new Command("add", [Args.D, Args.A], 0x27),
    new Command("adc", [Args.A, Args.ZERO], 0x28),
    new Command("adc", [Args.A, Args.B], 0x29),
    new Command("adc", [Args.A, Args.C], 0x2A),
    new Command("adc", [Args.A, Args.D], 0x2B),
    new Command("adc", [Args.A, Args.ZERO], 0x2C),
    new Command("adc", [Args.B, Args.A], 0x2D),
    new Command("adc", [Args.C, Args.A], 0x2E),
    new Command("adc", [Args.D, Args.A], 0x2F),

    new Command("sub", [Args.A, Args.ZERO], 0x30),
    new Command("sub", [Args.A, Args.B], 0x31),
    new Command("sub", [Args.A, Args.C], 0x32),
    new Command("sub", [Args.A, Args.D], 0x33),
    new Command("sub", [Args.A, Args.ZERO], 0x34),
    new Command("sub", [Args.B, Args.A], 0x35),
    new Command("sub", [Args.C, Args.A], 0x36),
    new Command("sub", [Args.D, Args.A], 0x37),
    new Command("sbb", [Args.A, Args.ZERO], 0x38),
    new Command("sbb", [Args.A, Args.B], 0x39),
    new Command("sbb", [Args.A, Args.C], 0x3A),
    new Command("sbb", [Args.A, Args.D], 0x3B),
    new Command("sbb", [Args.A, Args.ZERO], 0x3C),
    new Command("sbb", [Args.B, Args.A], 0x3D),
    new Command("sbb", [Args.C, Args.A], 0x3E),
    new Command("sbb", [Args.D, Args.A], 0x3F),

    new Command("not", [Args.A], 0x40),
    new Command("not", [Args.B], 0x41),
    new Command("not", [Args.C], 0x42),
    new Command("not", [Args.D], 0x43),
    new Command("neg", [Args.A], 0x44),
    new Command("neg", [Args.B], 0x45),
    new Command("neg", [Args.C], 0x46),
    new Command("neg", [Args.D], 0x47),
    new Command("inc", [Args.A], 0x48),
    new Command("inc", [Args.B], 0x49),
    new Command("inc", [Args.C], 0x4A),
    new Command("inc", [Args.D], 0x4B),
    new Command("dec", [Args.A], 0x4C),
    new Command("dec", [Args.B], 0x4D),
    new Command("dec", [Args.C], 0x4E),
    new Command("dec", [Args.D], 0x4F),

    new Command("shl", [Args.A], 0x50),
    new Command("shl", [Args.B], 0x51),
    new Command("shl", [Args.C], 0x52),
    new Command("shl", [Args.D], 0x53),
    new Command("shr", [Args.A], 0x54),
    new Command("shr", [Args.B], 0x55),
    new Command("shr", [Args.C], 0x56),
    new Command("shr", [Args.D], 0x57),
    new Command("sar", [Args.A], 0x58),
    new Command("sar", [Args.B], 0x59),
    new Command("sar", [Args.C], 0x5A),
    new Command("sar", [Args.D], 0x5B),
    new Command("exp", [Args.A], 0x5C),
    new Command("exp", [Args.B], 0x5D),
    new Command("exp", [Args.C], 0x5E),
    new Command("exp", [Args.D], 0x5F),

    new Command("rcl", [Args.A], 0x60),
    new Command("rcl", [Args.B], 0x61),
    new Command("rcl", [Args.C], 0x62),
    new Command("rcl", [Args.D], 0x63),
    new Command("rcr", [Args.A], 0x64),
    new Command("rcr", [Args.B], 0x65),
    new Command("rcr", [Args.C], 0x66),
    new Command("rcr", [Args.D], 0x67),

    new Command("ld", [Args.A, Args.NUM], 0x80),
    new Command("ld", [Args.B, Args.NUM], 0x81),
    new Command("ld", [Args.C, Args.NUM], 0x82),
    new Command("ld", [Args.D, Args.NUM], 0x83),
    new Command("ld", [Args.A, Args.NUM], 0x84),
    new Command("ld", [Args.B, Args.NUM], 0x85),
    new Command("ld", [Args.C, Args.NUM], 0x86),
    new Command("ld", [Args.D, Args.NUM], 0x87),
    new Command("ldi", [Args.A, Args.NUM], 0x88),
    new Command("ldi", [Args.B, Args.NUM], 0x89),
    new Command("ldi", [Args.C, Args.NUM], 0x8A),
    new Command("ldi", [Args.D, Args.NUM], 0x8B),
    new Command("ldi", [Args.A, Args.NUM], 0x8C),
    new Command("ldi", [Args.B, Args.NUM], 0x8D),
    new Command("ldi", [Args.C, Args.NUM], 0x8E),
    new Command("ldi", [Args.D, Args.NUM], 0x8F),
    
    new Command("ld", [Args.A, Args.A], 0x90),
    new Command("ld", [Args.B, Args.A], 0x91),
    new Command("ld", [Args.C, Args.A], 0x92),
    new Command("ld", [Args.D, Args.A], 0x93),
    new Command("ld", [Args.A, Args.B], 0x94),
    new Command("ld", [Args.B, Args.B], 0x95),
    new Command("ld", [Args.C, Args.B], 0x96),
    new Command("ld", [Args.D, Args.B], 0x97),
    new Command("ld", [Args.A, Args.C], 0x98),
    new Command("ld", [Args.B, Args.C], 0x99),
    new Command("ld", [Args.C, Args.C], 0x9A),
    new Command("ld", [Args.D, Args.C], 0x9B),
    new Command("ld", [Args.A, Args.D], 0x9C),
    new Command("ld", [Args.B, Args.D], 0x9D),
    new Command("ld", [Args.C, Args.D], 0x9E),
    new Command("ld", [Args.D, Args.D], 0x9F),

    new Command("st", [Args.A, Args.NUM], 0xA0),
    new Command("st", [Args.B, Args.NUM], 0xA1),
    new Command("st", [Args.C, Args.NUM], 0xA2),
    new Command("st", [Args.D, Args.NUM], 0xA3),
    new Command("st", [Args.A, Args.NUM], 0xA4),
    new Command("st", [Args.B, Args.NUM], 0xA5),
    new Command("st", [Args.C, Args.NUM], 0xA6),
    new Command("st", [Args.D, Args.NUM], 0xA7),
    new Command("rnd", [Args.A], 0xA8),
    new Command("rnd", [Args.B], 0xA9),
    new Command("rnd", [Args.C], 0xAA),
    new Command("rnd", [Args.D], 0xAB),
    new Command("rnd", [Args.A], 0xAC),
    new Command("rnd", [Args.B], 0xAD),
    new Command("rnd", [Args.C], 0xAE),
    new Command("rnd", [Args.D], 0xAF),

    new Command("st", [Args.A, Args.A], 0xB0),
    new Command("st", [Args.B, Args.A], 0xB1),
    new Command("st", [Args.C, Args.A], 0xB2),
    new Command("st", [Args.D, Args.A], 0xB3),
    new Command("st", [Args.A, Args.B], 0xB4),
    new Command("st", [Args.B, Args.B], 0xB5),
    new Command("st", [Args.C, Args.B], 0xB6),
    new Command("st", [Args.D, Args.B], 0xB7),
    new Command("st", [Args.A, Args.C], 0xB8),
    new Command("st", [Args.B, Args.C], 0xB9),
    new Command("st", [Args.C, Args.C], 0xBA),
    new Command("st", [Args.D, Args.C], 0xBB),
    new Command("st", [Args.A, Args.D], 0xBC),
    new Command("st", [Args.B, Args.D], 0xBD),
    new Command("st", [Args.C, Args.D], 0xBE),
    new Command("st", [Args.D, Args.D], 0xBF),

    new Command("jz", [Args.A], 0xC0),
    new Command("jc", [Args.A], 0xC1),
    new Command("js", [Args.A], 0xC2),
    new Command("jo", [Args.A], 0xC3),
    new Command("jz", [Args.B], 0xC4),
    new Command("jc", [Args.B], 0xC5),
    new Command("js", [Args.B], 0xC6),
    new Command("jo", [Args.B], 0xC7),
    new Command("jz", [Args.C], 0xC8),
    new Command("jc", [Args.C], 0xC9),
    new Command("js", [Args.C], 0xCA),
    new Command("jo", [Args.C], 0xCB),
    new Command("jz", [Args.D], 0xCC),
    new Command("jc", [Args.D], 0xCD),
    new Command("js", [Args.D], 0xCE),
    new Command("jo", [Args.D], 0xCF),

    new Command("jnz", [Args.A], 0xD0),
    new Command("jnc", [Args.A], 0xD1),
    new Command("jns", [Args.A], 0xD2),
    new Command("jno", [Args.A], 0xD3),
    new Command("jnz", [Args.B], 0xD4),
    new Command("jnc", [Args.B], 0xD5),
    new Command("jns", [Args.B], 0xD6),
    new Command("jno", [Args.B], 0xD7),
    new Command("jnz", [Args.C], 0xD8),
    new Command("jnc", [Args.C], 0xD9),
    new Command("jns", [Args.C], 0xDA),
    new Command("jno", [Args.C], 0xDB),
    new Command("jnz", [Args.D], 0xDC),
    new Command("jnc", [Args.D], 0xDD),
    new Command("jns", [Args.D], 0xDE),
    new Command("jno", [Args.D], 0xDF),

    new Command("jz", [Args.REF], 0xE0),
    new Command("jc", [Args.REF], 0xE1),
    new Command("js", [Args.REF], 0xE2),
    new Command("jo", [Args.REF], 0xE3),
    new Command("jnz", [Args.REF], 0xE4),
    new Command("jnc", [Args.REF], 0xE5),
    new Command("jns", [Args.REF], 0xE6),
    new Command("jno", [Args.REF], 0xE7),
    new Command("jmp", [Args.REF], 0xE8),
    new Command("jmp", [Args.REF], 0xE9),
    new Command("jmp", [Args.REF], 0xEA),
    new Command("jmp", [Args.REF], 0xEB),
    new Command("hlt", [], 0xEC),
    new Command("hlt", [], 0xED),
    new Command("hlt", [], 0xEE),
    new Command("hlt", [], 0xEF),

    new Command("jmp", [Args.A], 0xF0),
    new Command("jmp", [Args.A], 0xF1),
    new Command("jmp", [Args.A], 0xF2),
    new Command("jmp", [Args.A], 0xF3),
    new Command("jmp", [Args.B], 0xF4),
    new Command("jmp", [Args.B], 0xF5),
    new Command("jmp", [Args.B], 0xF6),
    new Command("jmp", [Args.B], 0xF7),
    new Command("jmp", [Args.C], 0xF8),
    new Command("jmp", [Args.C], 0xF9),
    new Command("jmp", [Args.C], 0xFA),
    new Command("jmp", [Args.C], 0xFB),
    new Command("jmp", [Args.D], 0xFC),
    new Command("jmp", [Args.D], 0xFD),
    new Command("jmp", [Args.D], 0xFE),
    new Command("jmp", [Args.D], 0xFF),
];

class Token {
    static INSTRUCTION = 0x0;
    static NUMBER = 0x1;
    static NAME = 0x2;
    static CHAR = 0x3;
    static REGISTER = 0x4;
    static EOF = 0x5;

    constructor(type, value, position) {
        this.type = type;
        this.value = value;
        this.position = position;
    }

    toString() {
        return this.type === Token.EOF ? "<eof>" : `'${this.value}'`;
    }
}

const whitespace = /^[ \n\r]$/;
const digit = /^[0-9]$/;
const letter = /^[a-z]$/i;

class Tokenizer {
    line = 0;
    column = 0;
    offset = 0;

    constructor(source) {
        this.source = source;
    }

    get position() {
        return [this.line, this.column];
    }

    peekch() {
        return this.source[this.offset];
    }

    consume() {
        if (this.peekch() === "\n") {
            ++this.line;
            this.column = 0;
        } else
            ++this.column;
        ++this.offset;
    }

    lookahead() {
        const { offset, line, column } = this;
        const token = this.next();
        this.offset = offset;
        this.line = line;
        this.column = column;
        return token;
    }

    next() {
        while (whitespace.test(this.peekch()))
            this.consume();
        
        while (this.peekch() === ";") {
            this.consume();
            while (this.peekch() !== "\n" && this.peekch() != null)
                this.consume();
        }

        let ch = this.peekch();
        if (ch == null)
            return new Token(Token.EOF, null, this.position);
        else if (letter.test(ch))
            return this.readName();
        else if (digit.test(ch))
            return this.readNumber();
        else {
            const { position } = this;
            this.consume();
            return new Token(Token.CHAR, ch, position);
        }
    }

    readName() {
        const { position } = this;

        let name = "";

        let ch;
        while (letter.test(ch = this.peekch())) {
            this.consume();
            name += ch;
        }

        let type = Token.NAME;
        if (instructions.includes(name))
            type = Token.INSTRUCTION;
        else if (registers.includes(name))
            type = Token.REGISTER;
        return new Token(type, name, position);
    }

    readNumber() {
        const { position } = this;

        let number = "";

        let ch;
        while (digit.test(ch = this.peekch())) {
            this.consume();
            number += ch;
        }
        while (letter.test(ch = this.peekch()) || digit.test(ch)) {
            this.consume();
            number += ch;
        }

        return new Token(Token.NUMBER, number, position)
    }
}

class AsmError {
    constructor(position, message) {
        this.position = position;
        this.message = message;
    }
}

export class Compiler {
    bytes = [];
    errors = [];

    parseNumber(token) {
        try {
            if (token.value.length > 2 && token.value[0] === "0")
                switch (token.value[1].toLowerCase()) {
                    case "x":
                        return parseInt(token.value.slice(2), 16);
                    case "b":
                        return parseInt(token.value.slice(2), 2);
                }
            return parseInt(token.value);
        } catch {
            this.errors.push(new AsmError(token.position, `invalid number ${token.value}`));
        }
    }

    parseArg(args, token, required=false) {
        if (token.type === Token.REGISTER)
            args.push([registers.indexOf(token.value), token.value, token.position]);
        else if (token.type === Token.NAME)
            args.push([Args.REF, token.value, token.position]);
        else if (token.type === Token.NUMBER) {
            const number = this.parseNumber(token);
            args.push([number === 0 ? Args.ZERO : Args.NUM, number, token.position]);
        } else if (required) {
            this.errors.push(new AsmError(token.position, `unexpected ${token}`));
            return false;
        }
        return true;
    }

    compile(source) {
        const tokenizer = new Tokenizer(source);

        const refs = [];
        const labels = {};

        let token;
        while ((token = tokenizer.next()).type !== Token.EOF)
            parse: if (token.type === Token.INSTRUCTION) {
                const instruction = token.value;
                const { position } = token;
                const args = [];

                this.parseArg(args, tokenizer.lookahead());

                if (args.length > 0) {
                    tokenizer.next();
                    while ((token = tokenizer.lookahead()).type === Token.CHAR && token.value === ",") {
                        tokenizer.next();
                        if (!this.parseArg(args, tokenizer.next(), true))
                            break parse;
                    }
                }

                let opcode;
                for (const command of commands)
                    if (command.match(instruction, args)) {
                        opcode = command.opcode;
                        break;
                    }

                if (opcode == null) {
                    this.errors.push(new AsmError(position, "unknown command"));
                    break parse;
                }

                this.bytes.push(opcode);

                for (const [type, value, position] of args) {
                    if (type === Args.NUM)
                        this.bytes.push(value & 0xFF);
                    else if (type === Args.REF) {
                        const offset = labels[value];
                        if (offset)
                            this.bytes.push(offset);
                        else {
                            refs.push([value, bytes.length, position]);
                            this.bytes.push(0x00);
                        }
                    }
                }
            } else if (token.type === Token.NAME) {
                const name = token.value;
                const { position } = token;

                if ((token = tokenizer.next()).type !== Token.CHAR || token.value !== ":") {
                    this.errors.push(new AsmError(token.position, `unexpected ${token}`));
                    continue;
                }

                if (name in labels) {
                    this.errors.push(new AsmError(position, `label ${name} is already defined`));
                    continue;
                }

                labels[name] = this.bytes.length;

                const refCount = refs.length;
                for (let i = 0; i < refCount; ++i) {
                    const ref = refs[i];
                    if (ref[0] === name) {
                        this.bytes[ref[1]] = this.bytes.length;
                        refs.splice(i--, 1);
                    }
                }
            } else
                this.errors.push(new AsmError(token.position, `unexpected ${token}`));
        
        for (const [name, _offset, position] of refs)
            this.errors.push(new AsmError(position, `unresolved ${name}`));
    }
}