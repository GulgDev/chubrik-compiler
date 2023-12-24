import { Compiler } from "./asm.js";
import { buildDisk } from "./builder.js";

function compile(asm) {
    const compiler = new Compiler(asm);
    compiler.compile();

    if (compiler.errors.length > 0) {
        let errorMessage = `Compilation failed (${compiler.errors.length} error${compiler.errors.length > 1 ? "s" : ""})\n\n`;
        for (const error of compiler.errors)
            errorMessage += `Error at line ${error.position[0] + 1}, column ${error.position[1] + 1}: ${error.message}\n\n`;
        return errorMessage;
    }

    if (compiler.bytes.length === 0)
        return "";

    return buildDisk(compiler.bytes);
}

document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("source");
    const output = document.getElementById("output");

    function update() {
        if (source.value.trim())
            history.pushState(null, "", `${location.pathname}?code=${encodeURIComponent(source.value)}`);
        else
            history.pushState(null, "", location.pathname);
        output.value = compile(source.value);
    }

    source.value = new URLSearchParams(location.search).get("code");
    source.addEventListener("input", update);
    update();
});
