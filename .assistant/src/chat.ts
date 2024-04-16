import OpenAI from "openai";
import { availableFunctions } from "./tools.js";
import ansiStyles from "ansi-styles";
import assert from "assert";
import { readFile, writeFile } from "fs/promises";
import { AssistantStream } from "openai/lib/AssistantStream.mjs";

assert(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

assert(process.env.ASSISTANT_ID);

const thread = await openai.beta.threads.create();

export function pushMessage(
    m: OpenAI.Beta.Threads.Messages.MessageCreateParams
) {
    return openai.beta.threads.messages.create(thread.id, m);
}

export async function chat(write: (s: string) => void) {
    let toolCalls: Promise<OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput>[] =
        [];

    let run: OpenAI.Beta.Threads.Runs.Run;

    let yieldToUser = false;
    while (!yieldToUser) {
        yieldToUser = true;

        const stream =
            toolCalls.length > 0
                ? openai.beta.threads.runs.submitToolOutputsStream(
                      thread.id,
                      run!.id,
                      {
                          tool_outputs: await Promise.all(toolCalls)
                      }
                  )
                : openai.beta.threads.runs.stream(thread.id, {
                      assistant_id: process.env.ASSISTANT_ID!
                  });

        toolCalls = [];

        function isObj(obj: unknown): obj is Record<string, unknown> {
            return (
                obj != null && typeof obj === "object" && !Array.isArray(obj)
            );
        }

        // openai is bugged, fails to accumulate properly, so we have to fix it
        // https://github.com/openai/openai-node/issues/771
        AssistantStream.accumulateDelta = function (
            acc: Record<string, any>,
            delta: Record<string, any>
        ): Record<string, any> {
            for (const [key, deltaValue] of Object.entries(delta)) {
                if (!acc.hasOwnProperty(key)) {
                    acc[key] = deltaValue;
                    continue;
                }

                let accValue = acc[key];
                if (accValue === null || accValue === undefined) {
                    acc[key] = deltaValue;
                    continue;
                }

                // We don't accumulate these special properties
                if (key === "index" || key === "type") {
                    acc[key] = deltaValue;
                    continue;
                }

                // Type-specific accumulation logic
                if (
                    typeof accValue === "string" &&
                    typeof deltaValue === "string"
                ) {
                    accValue += deltaValue;
                } else if (
                    typeof accValue === "number" &&
                    typeof deltaValue === "number"
                ) {
                    accValue += deltaValue;
                } else if (isObj(accValue) && isObj(deltaValue)) {
                    accValue = this.accumulateDelta(
                        accValue as Record<string, any>,
                        deltaValue as Record<string, any>
                    );
                } else if (
                    Array.isArray(accValue) &&
                    Array.isArray(deltaValue)
                ) {
                    if (
                        accValue.every(
                            x => typeof x === "string" || typeof x === "number"
                        )
                    ) {
                        accValue.push(...deltaValue); // Use spread syntax for efficient addition
                        continue;
                    } else if (
                        deltaValue.every(
                            x =>
                                isObj(x) &&
                                x.hasOwnProperty("index") &&
                                typeof x.index === "number"
                        )
                    ) {
                        for (let i = 0; i < deltaValue.length; i++) {
                            const index = deltaValue[i].index;
                            accValue[index] = this.accumulateDelta(
                                accValue[index],
                                deltaValue[i]
                            );
                        }
                        continue;
                    }
                } else {
                    throw Error(
                        `Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`
                    );
                }
                acc[key] = accValue;
            }

            return acc;
        };

        run = await stream
            .on("textDelta", (textDelta, snapshot) => {
                if (textDelta.value !== undefined) write(textDelta.value);
            })
            .on("toolCallDone", async toolCall => {
                // console.log(toolCall);
                if (toolCall.type !== "function") return;
                if (
                    toolCall.function?.arguments === undefined ||
                    toolCall.id === undefined
                )
                    return;
                const functionName = toolCall.function.name;
                if (functionName === undefined) return;
                const functionToCall = availableFunctions[functionName];
                if (functionToCall === undefined) {
                    console.log(
                        `${ansiStyles.red.open}UNKNOWN FUNCTION ${functionName}${ansiStyles.red.close}`
                    );
                    return;
                }
                let functionArgs;
                try {
                    functionArgs = JSON.parse(toolCall.function.arguments);
                } catch {
                    functionArgs = {};
                }
                console.log(
                    `${
                        ansiStyles.gray.open
                    }CALLED ${functionName} with ${JSON.stringify(
                        functionArgs
                    )}${ansiStyles.gray.close}`
                );
                yieldToUser = false;
                toolCalls.push(
                    functionToCall(functionArgs).then(functionResponse => ({
                        tool_call_id: toolCall.id,
                        output: functionResponse.replace(/\r\n/g, "\n")
                    }))
                );
            })
            .on("event", event => {
                // console.log(JSON.stringify(event));
            })
            .finalRun();
    }

    if (toolCalls.length > 0) {
        await openai.beta.threads.runs.submitToolOutputs(thread.id, run!.id, {
            tool_outputs: await Promise.all(toolCalls)
        });
    }
}
