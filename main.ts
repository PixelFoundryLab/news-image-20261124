// news-image-20261124: "Sum up 24 November's world news in one image".
// The entry image (entry.png, 1024x1024, drawn with Pillow) already sums up
// Tuesday 24 November 2026 in six stories, so this program only has to put
// those exact bytes at /output/entry.png. No network, no randomness, no
// other input: run it twice and the two outputs are byte-identical.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// Fail loudly instead of handing the grader a truncated copy.
if (statSync(src).size !== statSync(dst).size) {
  throw new Error('entry.png copy size mismatch');
}
