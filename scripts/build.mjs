import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "public");

function copyRecursive(source, target) {
  const stats = statSync(source);

  if (stats.isDirectory()) {
    mkdirSync(target, { recursive: true });
    for (const entry of readdirSync(source)) {
      copyRecursive(join(source, entry), join(target, entry));
    }
    return;
  }

  mkdirSync(resolve(target, ".."), { recursive: true });
  copyFileSync(source, target);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const entry of ["menu", "assets", "data"]) {
  copyRecursive(resolve(root, entry), resolve(outDir, basename(entry)));
}

copyRecursive(resolve(root, "index.html"), resolve(outDir, "index.html"));

console.log("Static site copied to public/");
