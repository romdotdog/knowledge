import "./chdir.js";
import fg from "fast-glob";
import { kbGlob } from "./utils.js";
import { readFile } from "fs/promises";

const files = await fg(kbGlob, {
    onlyFiles: true
});

for (const file of files) {
    const content = await readFile(file, { encoding: "utf-8" });
    const matches = content.matchAll(/(\${1,2})(\s*).*?(\s*)(\${1,2})/gs);

    for (const match of matches) {
        if(match[1] !== match[4] || match[1] === "$" && (match[2] !== "" || match[3] !== "")) {
            console.log(`broken math in ${file}:`, match[0]);
        }        
    }
}