import "./chdir.js";
import fg from "fast-glob";
import { kbGlob } from "./utils.js";
import { basename } from "path";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

const files = await fg(kbGlob, {
    onlyFiles: true
});

const filesByTitle = new Map(files.map(n => [basename(n), n]));

for (const file of files) {
    let content = await readFile(file, { encoding: "utf-8" });
    content = content.replace(/\[(.+?)]\(\/(.+?)(#.+?)?\)/g, (d, ht, p, h) => {
        console.log(`"/${file}" -> "/${p}";`);
        if (!existsSync(p)) {
            // fix the link
            const correctFile = filesByTitle.get(basename(p));
            if (correctFile) {
                return `[${ht}](/${correctFile}${h ?? ""})`;
            } else {
                console.log(`no file found for broken link ${p}`);
            }
        }
        return d;
    });
    await writeFile(file, content);
}
