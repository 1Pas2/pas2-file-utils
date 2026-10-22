import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { dirname, basename, join } from "node:path";
export async function readJson<T = unknown>(path: string): Promise<T> {
  return JSON.parse((await readFile(path, "utf8")).replace(/^\uFEFF/, "")) as T;
}
export async function writeFileAtomic(
  path: string,
  data: string | Uint8Array,
): Promise<void> {
  const temp = join(
    dirname(path),
    "." + basename(path) + "." + randomUUID() + ".tmp",
  );
  try {
    await writeFile(temp, data, { flag: "wx", mode: 0o600 });
    await rename(temp, path);
  } finally {
    await unlink(temp).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}
export async function writeJsonAtomic(
  path: string,
  value: unknown,
): Promise<void> {
  const text = JSON.stringify(value, null, 2);
  if (text === undefined) throw new TypeError("Value is not JSON serializable");
  await writeFileAtomic(path, text + "\n");
}
