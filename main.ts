import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Why this line fits: the cat ignores the expensive $400 tree for the
// cardboard box it came in, then delivers the complaint in the deadpan
// shape of a real one-star review — "One star." as the sting.
const line =
  "He bought a $400 cat tree. I sleep in the box it came in. He calls this progress. One star.";

// Runtime validation guard: single line, 1-200 chars, not whitespace-only.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (line.endsWith("\n") || line.endsWith("\r")) {
  throw new Error("entry must not end with a trailing newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Byte round-trip assertion: what landed on disk must be exactly the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from the entry line");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(line, "utf8")) {
  throw new Error("round-trip mismatch: byte length of /output/entry.txt differs from the entry line");
}
