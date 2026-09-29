import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildCatalog, findProducts, readContext, readCategory, categoryHash } from "../menu/utils/catalog.js";
import { menuData } from "../menu/data/menu-data.js";
import { categories, products } from "../menu/data/catalog.js";
import { siteData } from "../data/site-data.js";

const fixture = {
  categories: [
    { id: "a", name: "Kahveler", order: 2 },
    { id: "b", name: "Çilekli Tatlılar", order: 1 },
    { id: "empty", name: "Boş" },
    { id: "off", name: "Gizli", active: false }
  ],
  products: [
    { id: "p1", name: "FISTIK", categories: ["a", "b", "a"], price: 120, order: 3 },
    { id: "p2", name: "Çilek", category: "b", description: "İçecek açıklaması", price: null, order: 1 },
    { id: "p3", name: "Geçici", categories: ["a"], available: false },
    { id: "p4", name: "Şube özel", categories: ["a"], branchIds: ["organize"] },
    { id: "p5", name: "Gizli kategori ürünü", categories: ["off"] }
  ]
};

test("the production QR catalog is independent from homepage data", () => {
  assert.equal(menuData.products, products);
  assert.equal(menuData.categories, categories);
  assert.notEqual(menuData.products, siteData.menu.products);
  assert.deepEqual(buildCatalog(), { categories: [], products: [] });
  assert.deepEqual(buildCatalog({ categories: [null, {}], products: [null, {}] }), { categories: [], products: [] });
});
test("multiple categories, legacy category, explicit order, active state and empty categories", () => {
  const catalog = buildCatalog(fixture, "cafe-pastane");
  assert.deepEqual(catalog.categories.map(item => item.id), ["b", "a"]);
  assert.deepEqual(catalog.products.map(item => item.id), ["p2", "p1"]);
  assert.equal(catalog.categories[0].count, 2);
  assert.deepEqual(catalog.products[1].categories, ["a", "b"]);
  assert.equal(findProducts(catalog, "", "a").length, 1);
  assert.equal(findProducts(catalog, "", "b").length, 2);
});
test("unavailable items are centrally hidden or shown without altering source data", () => {
  const before = structuredClone(fixture);
  const catalog = buildCatalog({ ...fixture, settings: { unavailableMode: "show" } });
  assert.equal(catalog.products.find(item => item.id === "p3").available, false);
  assert.equal(buildCatalog(fixture).products.some(item => item.id === "p3"), false);
  assert.deepEqual(fixture, before);
});
test("branch overrides preserve zero and null prices, availability and explicit hiding", () => {
  const data = { ...fixture, branchOverrides: { organize: {
    products: { p1: { price: 0 }, p2: { price: null }, p3: { available: true }, p4: { hidden: true } }
  } } };
  const products = buildCatalog(data, "organize").products;
  assert.equal(products.find(item => item.id === "p1").price, 0);
  assert.equal(products.find(item => item.id === "p2").price, null);
  assert.ok(products.find(item => item.id === "p3"));
  assert.equal(products.some(item => item.id === "p4"), false);
  assert.equal(buildCatalog(data, "cafe-pastane").products.find(item => item.id === "p1").price, 120);
});
test("branch-only categories and category visibility cannot leak products", () => {
  const data = structuredClone(fixture);
  data.categories[0].branchIds = ["organize"];
  assert.equal(buildCatalog(data, "cafe-pastane").categories.length, 1);
  data.branchOverrides = { organize: { categories: { b: { active: false } } } };
  assert.deepEqual(buildCatalog(data, "organize").categories.map(item => item.id), ["a"]);
});
test("search handles Turkish, category names, multiple words and no duplicate results", () => {
  const catalog = buildCatalog(fixture);
  for (const query of ["fistik", "Fıstık", "FISTIK", "kahveler"]) assert.deepEqual(findProducts(catalog, query).map(item => item.id), ["p1"]);
  assert.equal(findProducts(catalog, "cilek").length, 2);
  assert.equal(findProducts(catalog, "icecek aciklamasi")[0].id, "p2");
  assert.equal(findProducts(catalog, "icecek", "a").length, 0);
  assert.equal(findProducts(catalog, "not-present").length, 0);
});
test("duplicate IDs and orphan products cannot create duplicate cards", () => {
  const data = structuredClone(fixture);
  data.categories.push(data.categories[0]);
  data.products.push(data.products[0], { id: "orphan", name: "TEST", categories: ["unknown"] });
  assert.equal(buildCatalog(data).products.length, 2);
});
test("branch and table URL parameters are validated; demo no longer switches catalogs", () => {
  const branches = siteData.branches;
  assert.equal(readContext("/menu/?branch=organize&table=12", branches).branch.id, "organize");
  assert.equal(readContext("/menu/?branch=cafe", branches).branch.id, "cafe-pastane");
  assert.equal(readContext("/menu/?branch=unknown", branches).branch.id, "cafe-pastane");
  assert.equal(readContext("/menu/?table=12", branches).table, "12");
  assert.equal(readContext("/menu/?table=%3Cscript%3E", branches).table, "");
  assert.deepEqual(readContext("/menu/?demo=1", branches), readContext("/menu/", branches));
});
test("category links survive encoding and reject unknown or malformed hashes", () => {
  const categories = [{ id: "çilek & kahve" }];
  assert.equal(readCategory(categoryHash(categories[0].id), categories), categories[0].id);
  assert.equal(readCategory("#kategori/%ZZ", categories), "");
  assert.equal(readCategory("#kategori/unknown", categories), "");
  assert.equal(categoryHash(""), "");
});
test("menu is independent from homepage script and styles; all module syntax is valid", () => {
  const html = readFileSync(new URL("../menu/index.html", import.meta.url), "utf8");
  const components = readFileSync(new URL("../menu/components.js", import.meta.url), "utf8");
  assert.doesNotMatch(html, /(?:src|href)="\/assets\/(?:site\.js|styles\.css)/);
  assert.match(html, /src="\/menu\/app\.js"/);
  assert.doesNotMatch(components, /Temsili görsel/);
  for (const path of ["app.js", "components.js", "utils/catalog.js", "data/menu-data.js", "data/catalog.js"]) {
    execFileSync(process.execPath, ["--check", fileURLToPath(new URL(`../menu/${path}`, import.meta.url))]);
  }
});

test("all approved categories and screenshot product groups are imported", () => {
  const baseline = { pasta: 20, "hamburger-menu": 9, "sweet-croissant": 11, coffee: 26, icecekler: 19, matcha: 5, "bitki-caylari": 5, kahvalti: 10, "ice-coffee": 17, kokteyl: 20 };
  for (const [id, count] of Object.entries(baseline)) {
    assert.ok(categories.find(category => category.id === id));
    assert.ok(products.filter(product => product.categories.includes(id)).length >= count, `missing product in ${id}`);
  }
  assert.ok(products.length >= 135);
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.ok(products.every(product => product.categories.every(id => categories.some(category => category.id === id))));
  assert.doesNotMatch(JSON.stringify({ categories, products }), /fl[aâ]neur|fl[aâ]nöz|demo-/i);
});

test("shared items are unique and retain their position in each category", () => {
  const catalog = buildCatalog(menuData);
  assert.deepEqual(products.find(product => product.id === "ekstra-cikolata").categories, ["pasta", "sweet-croissant"]);
  assert.equal(findProducts(catalog, "", "sweet-croissant").at(-1).id, "ekstra-cikolata");
  assert.equal(findProducts(catalog, "", "kahvalti")[2].id, "nutella-kruvasan");
  assert.equal(findProducts(catalog, "", "icecekler")[8].id, "turk-kahvesi");
  assert.equal(findProducts(catalog, "", "kokteyl")[13].id, "limonata");
  assert.equal(findProducts(catalog, "nutella kruvasan").length, 1);
  assert.equal(findProducts(catalog, "zebra mocha").length, 2, "hot and iced variants must remain distinct");
});

test("photo fields and per-category order overrides survive catalog normalization", () => {
  const catalog = buildCatalog({ categories: [{ id: "a", name: "TEST" }], products: [
    { id: "first", name: "First", categories: ["a"], order: 1, categoryOrder: { a: 2 } },
    { id: "second", name: "Second", categories: ["a"], order: 2, categoryOrder: { a: 1 }, image: "/image.webp", imageKind: "generated" }
  ] });
  assert.deepEqual(findProducts(catalog, "", "a").map(item => item.id), ["second", "first"]);
  assert.equal(catalog.products[1].imageKind, "generated");
});

test("provided Pasta images are connected to the matching products", () => {
  const pastaProducts = products.filter(product => product.categories.includes("pasta"));
  const withImages = pastaProducts.filter(product => product.image);
  assert.equal(withImages.length, 20);
  assert.deepEqual(pastaProducts.filter(product => !product.image), []);

  for (const product of withImages.filter(product => product.id !== "ekstra-cikolata")) {
    assert.match(product.image, /^\/menu\/images\/products\/pasta\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }

  const extraChocolate = withImages.find(product => product.id === "ekstra-cikolata");
  assert.equal(extraChocolate.image, "/assets/logo-original.jpg");
  assert.equal(extraChocolate.imageKind, "logo");
});

test("provided Sweet Croissant images and logo are connected to the matching products", () => {
  const croissantProducts = products.filter(product => product.categories.includes("sweet-croissant"));
  assert.equal(croissantProducts.length, 11);
  assert.ok(croissantProducts.every(product => product.image));

  for (const product of croissantProducts.filter(product => product.id !== "ekstra-cikolata")) {
    assert.match(product.image, /^\/menu\/images\/products\/sweet-croissant\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }

  const extraChocolate = croissantProducts.find(product => product.id === "ekstra-cikolata");
  assert.equal(extraChocolate.image, "/assets/logo-original.jpg");
  assert.equal(extraChocolate.imageKind, "logo");
});
