import { readFile, watch } from "fs/promises";
import { createPatch, createTwoFilesPatch } from "diff";
import { pushMessage } from "./chat.js";
import Watcher from "watcher";
import path from "path";
import fg from "fast-glob";
import { kbGlob } from "./utils.js";

const r = "===================================================================";
function processPatch(s: string) {
    return s.split(r).slice(1).join(r).trim();
}

const readFilesState = new Map();
export async function markFileRead(p: string) {
    p = path.relative(process.cwd(), p);
    if (readFilesState.has(p)) {
        return;
    }

    readFilesState.set(p, await readFile(p, { encoding: "utf-8" }));

    const w = new Watcher(p, { renameDetection: true });
    w.on("rename", (_, np) => {
        readFilesState.delete(p);
        markFileRead(np);
        w.close();
    }).on("change", async () => {
        const old = readFilesState.get(p);
        const new_ = await readFile(p, { encoding: "utf-8" });

        let diff = createPatch(p, old, new_);
        diff = processPatch(diff);
        console.log(diff);
        pushMessage({ role: "system", content: diff });

        readFilesState.set(p, new_);
    });
}

async function addFile(p: string) {
    p = path.relative(process.cwd(), p);

    const f = await fg(kbGlob, {
        onlyFiles: true
    });
    if (!f.includes(p)) {
        return;
    }
    const content = await readFile(p, { encoding: "utf-8" });
    let diff = createTwoFilesPatch("/dev/null", p, "", content);
    diff = processPatch(diff);
    console.log(diff);
    pushMessage({ role: "system", content: diff });
    markFileRead(p);
}

function watchDir(p: string) {
    new Watcher(p, { recursive: true, ignoreInitial: true })
        .on("add", addFile)
        .on("addDir", watchDir);
}

const dirs = await fg(kbGlob, {
    onlyDirectories: true
});

watchDir(".");

for (const dir of dirs) {
    watchDir(dir);
}
