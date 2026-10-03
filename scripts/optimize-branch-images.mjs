import { mkdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import sharp from "sharp";
import { siteData } from "../data/site-data.js";

const root = process.cwd();
const targetWidths = [480, 640, 768, 1024];
const images = (siteData.branches || [])
  .flatMap((branch) => Array.isArray(branch.images) ? branch.images : [])
  .filter((image) => image?.modern === true && typeof image.src === "string");

for (const image of images) {
  const input = resolve(root, image.src.replace(/^\//, ""));
  const extension = extname(input);
  const outputBase = input.slice(0, -extension.length);
  const metadata = await sharp(input).metadata();
  if (!metadata.width) throw new Error(`Image width could not be read: ${image.src}`);

  const widths = [...new Set([...targetWidths, metadata.width])]
    .filter((width) => width <= metadata.width)
    .sort((a, b) => a - b);

  for (const width of widths) {
    const suffix = width === metadata.width ? "" : `-${width}`;
    const webpPath = `${outputBase}${suffix}.webp`;
    const avifPath = `${outputBase}${suffix}.avif`;
    mkdirSync(dirname(webpPath), { recursive: true });

    await Promise.all([
      sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(webpPath),
      sharp(input).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 52, effort: 5 }).toFile(avifPath),
    ]);
  }

  console.log(`${image.src}: ${widths.join(", ")}px AVIF + WebP`);
}
