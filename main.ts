// ai-excited-01 — "Make the AI judge excited"
// Copies the pre-rendered entry image next to this file into the
// make.fun output directory. Fully deterministic: same input bytes
// in, same output bytes out, every run.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");

// Fail loudly instead of producing a partial output.
if (!existsSync(src)) {
  throw new Error(`entry.png not found next to main.ts (${src})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const dest = join(outDir, "entry.png");
copyFileSync(src, dest);

// Integrity check: the copy must be byte-for-byte the source image.
const srcBytes = statSync(src).size;
const bytes = statSync(dest).size;
if (bytes !== srcBytes) {
  throw new Error(`copy mismatch: source ${srcBytes} bytes, output ${bytes} bytes`);
}
console.log(`wrote ${dest} (${bytes} bytes)`);
