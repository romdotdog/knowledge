import assert from "assert";
import escalade_ from "escalade";

const escalade = escalade_ as unknown as typeof escalade_.default; // TODO: fix this

const newCwd = await escalade(process.cwd(), (dir, names) => {
    if (names.includes(".assistant")) {
        return dir;
    }
});

assert(newCwd);
process.chdir(newCwd);
