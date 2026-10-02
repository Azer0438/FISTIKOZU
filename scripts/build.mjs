import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join, resolve } from "node:path";
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

  if ([".md", ".csv"].includes(extname(source).toLowerCase())) return;

  mkdirSync(resolve(target, ".."), { recursive: true });
  copyFileSync(source, target);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const entry of ["menu", "subeler", "assets", "data"]) {
  copyRecursive(resolve(root, entry), resolve(outDir, basename(entry)));
}

copyRecursive(resolve(root, "index.html"), resolve(outDir, "index.html"));

for (const page of ["index.html", "menu/index.html", "subeler/index.html"]) {
  const target = resolve(outDir, page);
  const schema = JSON.stringify(createStructuredData(siteData, page.startsWith("menu/"))).replace(/</g, "\\u003c");
  const html = readFileSync(target, "utf8").replace("<!-- structured-data -->", `<script type="application/ld+json" id="structured-data">${schema}</script>`);
  writeFileSync(target, html);
}

const canonical = new URL(siteData.canonicalBase).origin;
const branchTemplate = readFileSync(resolve(root, "subeler/index.html"), "utf8");
const branchSchema = JSON.stringify(createStructuredData(siteData)).replace(/</g, "\\u003c");
const branchRoutes = [];

for (const branch of siteData.branches || []) {
  const slug = branch.slug || branch.id;
  if (!slug || !branch.name) continue;
  const title = `${branch.name} | Kayseri`;
  const description = `${branch.name} hakkında bilgiler ve şube detayları.`;
  const canonicalUrl = `${canonical}/subeler/${slug}/`;
  const image = branch.image ? new URL(branch.image, canonical).href : `${canonical}${siteData.logoPath}`;
  const imageAlt = branch.imageAlt || `${branch.name} - Fıstıközü`;
  const html = branchTemplate
    .replace("<title>Şube Detayı | Fıstıközü</title>", `<title>${title}</title>`)
    .replace('<meta name="description" content="Fıstıközü şube detayları.">', `<meta name="description" content="${description}">`)
    .replace('href="https://www.xn--fstkz-mua7b24ac.com.tr/subeler/"', `href="${canonicalUrl}"`)
    .replace('<meta property="og:title" content="Şube Detayı | Fıstıközü">', `<meta property="og:title" content="${title}">`)
    .replace('<meta property="og:description" content="Fıstıközü şube detayları.">', `<meta property="og:description" content="${description}">`)
    .replace('<meta property="og:url" content="https://www.xn--fstkz-mua7b24ac.com.tr/subeler/">', `<meta property="og:url" content="${canonicalUrl}">`)
    .replace('<meta property="og:image" content="https://www.xn--fstkz-mua7b24ac.com.tr/assets/logo-original.jpg">', `<meta property="og:image" content="${image}">`)
    .replace('<meta property="og:image:alt" content="Fıstıközü logosu">', `<meta property="og:image:alt" content="${imageAlt}">`)
    .replace("<!-- structured-data -->", `<script type="application/ld+json" id="structured-data">${branchSchema}</script>`);
  const target = resolve(outDir, "subeler", slug, "index.html");
  mkdirSync(resolve(target, ".."), { recursive: true });
  writeFileSync(target, html);
  branchRoutes.push(`${canonical}/subeler/${slug}/`);
}

writeFileSync(resolve(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${canonical}/sitemap.xml\n`);
const sitemapUrls = [`${canonical}/`, `${canonical}/menu/`, ...branchRoutes]
  .map((url) => `<url><loc>${url}</loc></url>`).join("");
writeFileSync(resolve(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls}</urlset>\n`);

console.log("Static site copied to public/");
