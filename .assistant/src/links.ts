import "./chdir.js";
import fg from "fast-glob";
import { kbGlob } from "./utils.js";
import { basename, join, relative } from "path";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

const files = await fg(kbGlob, {
    onlyFiles: true
});

const filesByTitle = new Map(files.map(n => [basename(n), n]));

for (const file of files) {
    let content = await readFile(file, { encoding: "utf-8" });
    content = content.replace(
        /\[(.+?)]\(((?:\.|\/).+?)(#.+?)?\)/g,
        (d, ht, p, h) => {
            if (p.startsWith(".")) {
                p = join(file, "..", p);
            } else if (p.startsWith("/")) {
                p = p.slice(1);
            }

            if (!existsSync(p)) {
                // fix the link
                const correctFile = filesByTitle.get(basename(p));
                if (correctFile === undefined) {
                    console.log(`no file found for broken link ${p}`);
                    return d;
                }

                console.log(`broken link ${p} -> ${correctFile}`);
                p = correctFile;
            }

            if (!p.startsWith(".")) {
                let relativePath = relative(join(file, ".."), p);

                if (!relativePath.startsWith(".")) {
                    relativePath = `./${relativePath}`;
                }

                d = `[${ht}](${relativePath}${h ?? ""})`;
            }

            console.log(`"/${file}" -> "/${p}";`);
            return d;
        }
    );
    await writeFile(file, content);
}
