import OpenAI from "openai";
import { tools, availableFunctions } from "./tools.js";
import ansiStyles from "ansi-styles";
import assert from "assert";
import { config } from "dotenv";
import { readFile, writeFile } from "fs/promises";
config();

assert(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

assert(process.env.PROMPT);

const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
        role: "system",
        content: process.env.PROMPT
    }
];

try {
    const transcript = await readFile(".transcript", { encoding: "utf-8" });
    pushMessage(...JSON.parse(transcript).slice(1));
} catch {}

export function pushMessage(
    ...m: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) {
    messages.push(...m);
    writeFile(".transcript", JSON.stringify(messages));
}

export async function chat(write: (s: string) => void) {
    let yieldToUser = false;
    while (!yieldToUser) {
        yieldToUser = true;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages,
            tools,
            max_tokens: 500,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            stream: true
        });

        let res = "";
        const toolCalls: Partial<OpenAI.Chat.Completions.ChatCompletionMessageToolCall>[] =
            [];
        const successfulToolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[] =
            [];
        const toolResponses: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
            [];

        for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta;
            if (delta === undefined) continue;
            if (delta.content) {
                const s = delta.content;
                write(s);
                res += s;
            }

            if (delta.tool_calls) {
                for (const payload of delta.tool_calls) {
                    let toolCall = toolCalls[payload.index];
                    if (toolCall === undefined)
                        toolCall = toolCalls[payload.index] = {
                            type: "function"
                        };
                    if (payload.id) {
                        toolCall.id = payload.id;
                    }
                    if (payload.function?.name) {
                        if (toolCall.function) {
                            toolCall.function.name = payload.function.name;
                        } else {
                            toolCall.function = {
                                name: payload.function.name,
                                arguments: ""
                            };
                        }
                    }
                    if (payload.function?.arguments) {
                        if (toolCall.function) {
                            toolCall.function.arguments +=
                                payload.function.arguments;
                        } else {
                            toolCall.function = {
                                name: "",
                                arguments: payload.function.arguments
                            };
                        }
                    }
                }
            }

            if (chunk.choices[0].finish_reason === "tool_calls") {
                for (const toolCall of toolCalls) {
                    if (
                        toolCall.function?.arguments === undefined ||
                        toolCall.id === undefined
                    )
                        continue;
                    const functionName = toolCall.function.name;
                    if (functionName === undefined) continue;
                    const functionToCall = availableFunctions[functionName];
                    if (functionToCall === undefined) {
                        console.log(
                            `${ansiStyles.red.open}UNKNOWN FUNCTION ${functionName}${ansiStyles.red.close}`
                        );
                        continue;
                    }
                    let functionArgs;
                    try {
                        functionArgs = JSON.parse(toolCall.function.arguments);
                    } catch {
                        functionArgs = {};
                    }
                    const functionResponse = await functionToCall(functionArgs);
                    toolResponses.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        content: functionResponse.replace(/\r\n/g, "\n")
                    });
                    console.log(
                        `${
                            ansiStyles.gray.open
                        }CALLED ${functionName} with ${JSON.stringify(
                            functionArgs
                        )}${ansiStyles.gray.close}`
                    );
                    successfulToolCalls.push({
                        id: toolCall.id,
                        function: {
                            name: functionName,
                            arguments: toolCall.function.arguments
                        },
                        type: "function"
                    });
                    yieldToUser = false;
                }
            }
        }

        messages.push({
            role: "assistant",
            ...(successfulToolCalls.length
                ? { tool_calls: successfulToolCalls }
                : {}),
            ...(res ? { content: res } : {})
        });

        messages.push(...toolResponses);
    }
}
