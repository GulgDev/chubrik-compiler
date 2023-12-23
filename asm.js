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
        if (this.offset >= this.source.length)
            return;

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
            return new Token(Token.EOF, null, this.position);
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
        while ((token = tokenizer.next()).type !== Token.EOF) {
            parseCommand: if (token.type === Token.INSTRUCTION) {
                const instruction = token.value;
                const { position } = token;
                const args = [];

                this.parseArg(args, tokenizer.lookahead());

                if (args.length > 0) {
                    tokenizer.next();
                    while ((token = tokenizer.next()).type === Token.CHAR && token.value === ",")
                        if (!this.parseArg(args, tokenizer.next(), true))
                            break parseCommand;
                }

                let opcode;
                for (const command of commands)
                    if (command.match(instruction, args)) {
                        opcode = command.opcode;
                        break;
                    }

                if (opcode == null)
                    this.errors.push(new AsmError(position, "unknown command"));

                this.bytes.push(opcode);

                for (const [type, value, position] of args) {
                    if (type === Args.NUM)
                        bytes.push(value && 0xFF);
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

                labels[name] = bytes.length;

                const refCount = refs.length;
                for (let i = 0; i < refCount; ++i) {
                    const ref = refs[i];
                    if (ref[0] === name) {
                        bytes[ref[1]] = bytes.length;
                        refs.splice(i--, 1);
                    }
                }
            } else
                this.errors.push(new AsmError(token.position, `unexpected ${token}`));
        }

        for (const [name, _offset, position] of refs)
            this.errors.push(new AsmError(position, `unresolved ${name}`));
    }
}