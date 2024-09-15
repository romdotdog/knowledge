export const kbGlob = ["**/*", "!.*", "!readme.md"];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
export function day() {
    return days[new Date().getDay()];
}

export function today() {
    return new Date().toLocaleDateString();
}

export function time() {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}`;
}
