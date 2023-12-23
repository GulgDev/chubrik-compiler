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
    "adc", "add", "and", "dec", "exp", "inc", "jc", "jmp",
    "jnc", "jno", "jns", "jnz", "jo", "js", "jz", "ld",
    "ldi", "mov", "neg", "nop", "not", "or", "rcl", "rcr",
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
                if (argType !== input && !(input === Args.ZERO && argType === Args.NUM)) {
                    match = false;
                    break;
                }
            }
        return match;
    }
}

const commands = [
    new Command("mov", [Args.A, Args.ZERO], 0x00),
    new Command("mov", [Args.A, Args.B], 0x01)
];

class Token {
    static INSTRUCTION = 0x0;
    static NUMBER = 0x1;
    static NAME = 0x2;
    static CHAR = 0x3;
    static REGISTER = 0x4;

    constructor(type, value, position) {
        this.type = type;
        this.value = value;
        this.position = position;
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
        ++this.offset;
        if (this.peekch() === "\n") {
            ++this.line;
            this.column = 0;
        } else
            ++this.column;
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
            return null;
        else if (letter.test(ch))
            return this.readName();
        else if (digit.test(ch))
            return this.readNumber();
        else {
            this.consume();
            return new Token(Token.CHAR, ch, this.position);
        }
    }

    readName() {
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
        return new Token(type, name, this.position);
    }

    readNumber() {
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

        return new Token(Token.NUMBER, number, this.position)
    }
}

export class Asm {
    static parseNumber(token) {
        if (token.value.length > 2 && token.value[0] === "0")
            switch (token.value[1].toLowerCase()) {
                case "x":
                    return parseInt(token.value.slice(2), 16);
                case "b":
                    return parseInt(token.value.slice(2), 2);
            }
        return parseInt(token.value);
    }

    static parseArg(args, token, required=false) {
        if (token?.type === Token.REGISTER)
            args.push([registers.indexOf(token.value), token.value]);
        else if (token?.type === Token.NAME)
            args.push([Args.REF, token.value]);
        else if (token?.type === Token.NUMBER) {
            const number = this.parseNumber(token);
            args.push([number === 0 ? Args.ZERO : Args.NUM, number]);
        } else if (required)
            throw new Error("unexpected end of argument list");
    }

    static compile(asm) {
        const tokenizer = new Tokenizer(asm);

        const bytes = [];
        const refs = {};

        let token;
        while ((token = tokenizer.next()) != null) {
            if (token.type === Token.INSTRUCTION) {
                const instruction = token.value;
                const args = [];

                this.parseArg(args, tokenizer.lookahead());

                if (args.length > 0) {
                    tokenizer.next();
                    while ((token = tokenizer.next())?.type === Token.CHAR && token.value === ",")
                        this.parseArg(args, tokenizer.next(), true);
                }

                let opcode;
                for (const command of commands)
                    if (command.match(instruction, args)) {
                        opcode = command.opcode;
                        break;
                    }

                if (opcode == null)
                    throw new Error("unknown command");

                bytes.push(opcode);
            } else
                throw new Error("unexpected token");
        }

        if (Object.values(refs).length > 0)
            throw new Error("unresolved reference(-s)");

        console.log(bytes);

        return bytes;
    }
}