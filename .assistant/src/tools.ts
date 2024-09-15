import { readFile } from "fs/promises";
import OpenAI from "openai";
import fg from "fast-glob";
import path from "path";
import { kbGlob } from "./utils.js";

export const availableFunctions: Record<
    string,
    (args: unknown) => Promise<string>
> = {};

export function addTool(
    name: string,
    impl: (args: unknown) => Promise<string>
) {
    if (availableFunctions[name] !== undefined) {
        throw new Error(`Tool ${name} already exists`);
    }

    availableFunctions[name] = impl;
}

async function filesFormatted() {
    console.log(process.cwd());
    const files = await fg(kbGlob, {
        markDirectories: true
    });
    console.log(files);
    return files.join(", ") || "No files";
}

addTool("list", async () => {
    return "Concepts available: " + (await filesFormatted());
});

addTool("read", async args => {
    if (typeof args !== "object" || args === null || args === undefined) {
        return "error: invalid arguments";
    }
    if ("path" in args && typeof args.path === "string") {
        try {
            const content = await readFile(`./${args.path}`, {
                encoding: "utf-8"
            });
            return content;
        } catch {
            return "error: file not found";
        }
    } else {
        return "error: path not specified";
    }
});

addTool("think", async args => {
    if (
        typeof args === "object" &&
        args !== null &&
        args !== undefined &&
        "content" in args &&
        typeof args.content === "string"
    ) {
        return args.content;
    }
    if (typeof args === "string") {
        return args;
    }
    return JSON.stringify(args);
});
