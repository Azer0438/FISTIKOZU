import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";
import { siteData } from "../data/site-data.js";
import { createStructuredData } from "../assets/seo.js";

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

for (const page of ["index.html", "menu/index.html"]) {
  const target = resolve(outDir, page);
  const schema = JSON.stringify(createStructuredData(siteData, page.startsWith("menu/"))).replace(/</g, "\\u003c");
  const html = readFileSync(target, "utf8").replace("<!-- structured-data -->", `<script type="application/ld+json" id="structured-data">${schema}</script>`);
  writeFileSync(target, html);
}

const canonical = new URL(siteData.canonicalBase).origin;
writeFileSync(resolve(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${canonical}/sitemap.xml\n`);
writeFileSync(resolve(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}/</loc></url><url><loc>${canonical}/menu/</loc></url></urlset>\n`);

console.log("Static site copied to public/");
