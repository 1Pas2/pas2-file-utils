import { writeJsonAtomic, readJson } from "../dist/index.js";
await writeJsonAtomic("./settings.json", { theme: "dark" });
console.log(await readJson("./settings.json"));
