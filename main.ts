// Famous Last Words: The Funniest Epitaph — a make.fun entry (Node 22+,
// standard library only, no network, no model calls, fully deterministic:
// the same line every run).
//
// The entry is one line of famous last words as a tombstone epitaph, written
// to /output/entry.txt. The line: "Here I lie. I asked Death for five more
// minutes. He laughed."
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "Here I lie. I asked Death for five more minutes. He laughed.";

// The sealed gate takes UTF-8 text of 1 to 150 characters, not only
// whitespace. Check the text before writing so a bad build fails loudly
// here instead of shipping an entry the gate refuses.
const chars = [...LINE].length;
if (chars < 1 || chars > 150 || LINE.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-150`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${chars} characters + newline)`);
