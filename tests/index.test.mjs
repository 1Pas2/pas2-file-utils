import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as api from "../dist/index.js";
test("write replace and read", async () => {
  const d = await mkdtemp(join(tmpdir(), "pas2-file-"));
  try {
    const p = join(d, "x.json");
    await api.writeJsonAtomic(p, { n: 1 });
    await api.writeJsonAtomic(p, { n: 2 });
    assert.deepEqual(await api.readJson(p), { n: 2 });
  } finally {
    await rm(d, { recursive: true, force: true });
  }
});
test("undefined rejected", async () =>
  await assert.rejects(
    api.writeJsonAtomic("unused.json", undefined),
    TypeError,
  ));
test("missing parent fails", async () =>
  await assert.rejects(
    api.writeFileAtomic(join(tmpdir(), "pas2-missing-" + Date.now(), "x"), "x"),
  ));
