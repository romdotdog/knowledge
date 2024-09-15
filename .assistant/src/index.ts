import "./env.js";
import "./chdir.js";
import "./watch.js";
import ansiStyles from "ansi-styles";
import readline from "readline";
import { time } from "./utils.js";
import { chat, pushMessage } from "./chat.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query: string) {
    return new Promise<string>(resolve => {
        rl.question(query, resolve);
    });
}

console.log();
while (true) {
    process.stdout.write(ansiStyles.green.open);

    await chat(s => {
        process.stdout.write(s);
    });

    console.log(ansiStyles.green.close);
    console.log();

    const input = await question(ansiStyles.blue.open + "> ");

    if (input.length > 0) {
        pushMessage({
            role: "user",
            content: /* time() + */ input
        });
    }

    console.log(ansiStyles.blue.close);
}
