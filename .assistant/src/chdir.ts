import assert from "assert";
import escalade from "escalade";

const newCwd = await escalade(process.cwd(), (dir, names) => {
    if (names.includes(".assistant")) {
        return dir;
    }
});

assert(newCwd);
process.chdir(newCwd);
