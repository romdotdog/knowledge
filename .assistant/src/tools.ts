import { readFile } from "fs/promises";
import OpenAI from "openai";
import fg from "fast-glob";
import path from "path";
import { kbGlob } from "./utils.js";

export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [];

export const availableFunctions: Record<
    string,
    (args: unknown) => Promise<string>
> = {};

export function addTool(
    schema: OpenAI.Chat.Completions.ChatCompletionTool & {
        impl: (args: unknown) => Promise<string>;
    }
) {
    if (availableFunctions[schema.function.name] !== undefined) {
        throw new Error(`Tool ${schema.function.name} already exists`);
    }

    availableFunctions[schema.function.name] = schema.impl;
    // @ts-ignore
    delete schema.impl;
    tools.push(schema);
}

async function filesFormatted() {
    console.log(process.cwd());
    const files = await fg(kbGlob, {
        markDirectories: true
    });
    console.log(files);
    return files.map(name => name.replace(".md", "")).join(", ") || "No files";
}

addTool({
    type: "function",
    function: {
        name: "list",
        description: "List the directory tree of the knowledge base",
        parameters: {
            type: "object",
            properties: {}
        }
    },
    impl: async () => {
        return (
            "Concepts available (separated by ,): " + (await filesFormatted())
        );
    }
});

addTool({
    type: "function",
    function: {
        name: "read",
        description: "Read a file",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description: "The path of the file to read"
                }
            },
            required: ["path"]
        }
    },
    impl: async (args: unknown) => {
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
    }
});

addTool({
    type: "function",
    function: {
        name: "think",
        description: "Jot down your thoughts and self-criticism",
        parameters: {
            type: "object",
            properties: {
                content: {
                    type: "string",
                    description: "The content of the thought"
                }
            },
            required: ["content"]
        }
    },
    impl: async args => {
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
    }
});
