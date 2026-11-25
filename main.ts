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

const EPITAPH =
  "Here I lie. I asked Death for five more minutes. He laughed.";

// Why this line (from the brainstorm in the build notes, 20 candidates scored
// on the judge's five criteria): "Here I lie" is the first-person epitaph
// frame, so the line is both dying speech — the plea to Death — and something
// carved in stone. The joke is the universal snooze-button plea denied
// forever: you ask Death for five more minutes, and Death laughs. At 60
// characters it is short on purpose: short lines read more like a carving,
// and the smaller text wins an exact tie.

// The sealed gate takes UTF-8 text of 1 to 150 characters, not only
// whitespace. Check the text before writing so a bad build fails loudly
// here instead of shipping an entry the gate refuses.
const chars = [...EPITAPH].length;
if (chars < 1 || chars > 150 || EPITAPH.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-150`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), EPITAPH + '\n', 'utf8');

console.log(`wrote entry.txt (${chars} characters + newline)`);
