import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { categories, products } from "../menu/data/catalog.js";

const lines = [
  "FISTIKÖZÜ QR MENÜ FİYAT LİSTESİ",
  "",
  `Toplam benzersiz ürün: ${products.length}`,
  ""
];

for (const category of categories) {
  const categoryProducts = products
    .filter(product => product.categories.includes(category.id))
    .sort((left, right) => left.categoryOrder[category.id] - right.categoryOrder[category.id]);

  lines.push(category.name.toLocaleUpperCase("tr-TR"));
  for (const product of categoryProducts) {
    const price = product.price === null ? "Fiyat belirtilmedi" : `${product.price} ₺`;
    lines.push(`${product.name}: ${price}`);
  }
  lines.push("");
}

const outputPath = fileURLToPath(new URL("../menu/MENU-FIYAT-LISTESI.txt", import.meta.url));
await writeFile(outputPath, `${lines.join("\n").trimEnd()}\n`, "utf8");
console.log(`Menü fiyat listesi oluşturuldu: ${outputPath}`);
