import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildCatalog, findProducts, getCategoryCoverProduct, readContext, readCategory, categoryHash } from "../menu/utils/catalog.js";
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

test("the final customer-approved categories and product groups are published", () => {
  const expected = [
    ["pasta", "Pasta", 26],
    ["coffee", "Sıcak İçecekler", 20],
    ["ice-coffee", "Soğuk Kahveler", 10],
    ["bitki-caylari", "Bitki Çayları", 6],
    ["icecekler", "İçecekler", 19],
    ["milkshake", "Milkshake", 3],
    ["frozen", "Frozen", 5],
    ["frappe", "Frappe", 4],
    ["limonata", "Limonata", 3],
    ["kokteyl", "Kokteyl", 10]
  ];
  assert.deepEqual(categories.map(category => [
    category.id,
    category.name,
    products.filter(product => product.categories.includes(category.id)).length
  ]), expected);
  assert.equal(products.length, 102);
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.ok(products.every(product => product.categories.every(id => categories.some(category => category.id === id))));
  assert.doesNotMatch(JSON.stringify({ categories, products }), /fl[aâ]neur|fl[aâ]nöz|demo-/i);
  for (const id of ["hamburger-menu", "sweet-croissant", "matcha", "kahvalti"]) {
    assert.equal(categories.some(category => category.id === id), false);
  }
});

test("removed product records are not exposed", () => {
  const removed = [
    "berry-bliss", "dondurmali-cookie", "cikolatali-cookie-dondurmali", "cikolatali-cookie",
    "laktozsuz-latte", "flat-white", "zebra-mocha", "berrywhite-latte", "irish-cream-macchiato",
    "kis-lattesi", "cookies-latte", "toffee-nut-latte", "cortado", "espresso-cekirdegi-1-kg",
    "elma-tarcin", "kirmizi-orman-meyveleri", "ice-latte-laktozsuz", "ice-zebra-mocha",
    "ice-berrywhite-latte", "ice-caramel-macchiato", "ice-cookies-latte", "ice-irish-cream-macchiato",
    "ice-toffee-nut-latte", "ice-hazelnut-latte", "naneli-limonata", "cilekli-limonata",
    "kuzukulakli-limonata", "yesil-elma-limonata", "passion", "meyveli-soguk-cay",
    "french-kiss", "hawana-special", "kamikaze-redbull", "daffy-duck-redbull",
    "apex-redbull", "berry-margarita", "tropical-rush", "ice-chai-tea-latte",
    "ice-single-americano", "vanilya-latte", "single-americano", "kuzu-kulagi",
    "green-apple-kokteyl"
  ];
  assert.deepEqual(products.filter(product => removed.includes(product.id)), []);
});

test("customer-approved prices and the intentionally unpriced birthday cake are preserved", () => {
  const expectedPrices = {
    "tiramisu": 200, "flan-raffaello": 220, "tart": 220, "amerikan-brownie": 200,
    "citir-belcika-cikolatali-mono": 220, "fistikli-mono": 220, "orman-meyveli-spoonful": 220,
    "sutlu-cikolata-spoonful": 220, "lotus-spoonful": 220, "san-sebastian": 220,
    "san-sebastian-sutlu-cikolata": 220, "orman-meyveli-cheesecake": 220, "ekstra-muz": 50,
    "ekstra-cilek": 50, "ekstra-cikolata": 50, "magnolya": 220, "pavlova": 220,
    "profiterol": 220, "budapeste": 220, "frambuaz": 220, "fransiz-ekler": 150,
    "rulo-pasta-muzlu-cikolata": 220, "cupta-cikolatali-spoonful": 150,
    "cupta-orman-meyveli-spoonful": 150, "ruby-mono": 220,
    "latte": 150, "filtre-kahve": 150, "sutlu-filtre": 175,
    "double-americano": 175, "cappucino": 175, "turk-kahvesi": 100, "mocha": 175,
    "white-chocolate-mocha": 175, "caramel-macchiato": 200,
    "hazelnut-latte": 175, "espresso": 175, "ekstra-shot": 50, "ekstra-aroma": 50,
    "menengic": 120, "damla-sakizli-turk-kahvesi": 120, "sutlu-turk-kahvesi": 120,
    "cafe-milano": 180, "bal-badem-salep": 165, "damla-sakizli-salep": 165,
    "chai-tea-latte": 165,
    "su": 40, "cay": 40, "soda": 60, "limonata": 150, "cola": 100, "fanta": 100,
    "sprite": 80, "churchill": 150, "double-turk-kahvesi": 150, "salep": 150,
    "fincan-cay": 60, "sut": 70, "portakal-suyu": 150, "red-bull": 150,
    "sicak-cikolata": 150, "mojito": 225, "cilekli-mojito": 225, "ayran": 60,
    "papatya-cayi": 120, "yesil-cay": 120, "kis-cayi": 120, "nane-limon": 120, "ihlamur": 120,
    "hibiscus-cayi": 130,
    "ice-latte": 180, "ice-filtre-kahve": 180, "ice-sutlu-filtre-kahve": 180,
    "ice-double-americano": 180, "ice-mocha": 180, "ice-white-chocolate-mocha": 180,
    "ice-vanilya-latte": 180, "ice-milano": 180, "ice-karamel-latte": 180,
    "ice-turk-kahvesi": 180,
    "milkshake-vanilya": 225, "milkshake-karamel": 225, "milkshake-orman-meyve": 225,
    "frozen-cilek": 210, "frozen-karpuz": 210, "frozen-kavun": 210,
    "frozen-orman-meyve": 210, "frozen-frambuaz": 210,
    "frappe-cikolata": 225, "frappe-orman-meyve": 225, "frappe-karamel": 225,
    "frappe-vanilya": 225,
    "limonata-kavunlu": 160, "limonata-cilekli": 160, "limonata-naneli": 160,
    "flamingo-milkshake": 225, "coko-coko-milkshake": 225, "sakura": 160,
    "turunc-bahcesi": 160, "kirmizi-bahar": 160, "blody-jack": 240, "cindirella": 240
  };
  assert.equal(Object.keys(expectedPrices).length, 101);
  for (const [id, price] of Object.entries(expectedPrices)) {
    assert.equal(products.find(product => product.id === id)?.price, price, id);
  }
  assert.deepEqual(products.filter(product => product.price === null).map(product => product.id), ["dogum-gunu-pastasi"]);
});

test("barista revision products are searchable and removed records stay hidden", () => {
  const catalog = buildCatalog(menuData);
  const categoryProducts = (id) => findProducts(catalog, "", id).map(product => product.id);

  assert.equal(products.find(product => product.id === "ice-double-americano").name, "Ice Americano");
  assert.deepEqual(categoryProducts("milkshake"), ["milkshake-vanilya", "milkshake-karamel", "milkshake-orman-meyve"]);
  assert.deepEqual(categoryProducts("frozen"), ["frozen-cilek", "frozen-karpuz", "frozen-kavun", "frozen-orman-meyve", "frozen-frambuaz"]);
  assert.deepEqual(categoryProducts("frappe"), ["frappe-cikolata", "frappe-orman-meyve", "frappe-karamel", "frappe-vanilya"]);
  assert.deepEqual(categoryProducts("limonata"), ["limonata-kavunlu", "limonata-cilekli", "limonata-naneli"]);

  for (const [query, id] of [
    ["hibiscus cayi", "hibiscus-cayi"],
    ["damla sakizli turk kahvesi", "damla-sakizli-turk-kahvesi"],
    ["ice milano", "ice-milano"],
    ["turunc bahcesi", "turunc-bahcesi"]
  ]) {
    assert.ok(findProducts(catalog, query).some(product => product.id === id), query);
  }

  for (const id of [
    "ice-chai-tea-latte", "ice-single-americano", "vanilya-latte",
    "single-americano", "kuzu-kulagi", "green-apple-kokteyl"
  ]) {
    assert.equal(products.some(product => product.id === id), false, id);
  }
});

test("shared items are unique and retain their position in each category", () => {
  const catalog = buildCatalog(menuData);
  assert.deepEqual(products.find(product => product.id === "turk-kahvesi").categories, ["coffee", "icecekler"]);
  assert.deepEqual(products.find(product => product.id === "limonata").categories, ["icecekler", "kokteyl"]);
  assert.deepEqual(products.find(product => product.id === "mojito").categories, ["icecekler", "kokteyl"]);
  assert.equal(findProducts(catalog, "", "icecekler")[8].id, "turk-kahvesi");
  assert.equal(findProducts(catalog, "", "kokteyl")[2].id, "limonata");
  assert.equal(findProducts(catalog, "mojito").length, 2);
});

test("photo fields and per-category order overrides survive catalog normalization", () => {
  const catalog = buildCatalog({ categories: [{ id: "a", name: "TEST" }], products: [
    { id: "first", name: "First", categories: ["a"], order: 1, categoryOrder: { a: 2 } },
    { id: "second", name: "Second", categories: ["a"], order: 2, categoryOrder: { a: 1 }, image: "/image.webp", imageKind: "generated" }
  ] });
  assert.deepEqual(findProducts(catalog, "", "a").map(item => item.id), ["second", "first"]);
  assert.equal(catalog.products[1].imageKind, "generated");
});

test("category covers follow the first product in each category order", () => {
  const catalog = buildCatalog(menuData);
  for (const category of catalog.categories) {
    const firstProduct = findProducts(catalog, "", category.id)[0];
    assert.equal(getCategoryCoverProduct(catalog, category.id)?.id, firstProduct.id, category.id);
    assert.ok(firstProduct.image, `${category.id} cover image`);
  }

  const reordered = buildCatalog({ categories: [{ id: "a", name: "TEST" }], products: [
    { id: "first", name: "First", categories: ["a"], order: 1, categoryOrder: { a: 2 }, image: "/first.webp" },
    { id: "second", name: "Second", categories: ["a"], order: 2, categoryOrder: { a: 1 }, image: "/second.webp" }
  ] });
  assert.equal(getCategoryCoverProduct(reordered, "a")?.image, "/second.webp");
});

test("provided Pasta images are connected to the matching products", () => {
  const pastaProducts = products.filter(product => product.categories.includes("pasta"));
  const withImages = pastaProducts.filter(product => product.image);
  const latestIds = [
    "budapeste", "frambuaz", "fransiz-ekler", "lotus-spoonful", "magnolya", "pavlova",
    "profiterol", "ruby-mono", "rulo-pasta-muzlu-cikolata", "cupta-cikolatali-spoonful",
    "cupta-orman-meyveli-spoonful"
  ];
  assert.equal(withImages.length, 26);
  assert.deepEqual(pastaProducts.filter(product => !product.image), []);
  assert.equal(latestIds.every(id => products.find(product => product.id === id).description), true);

  for (const product of withImages.filter(product => product.id !== "ekstra-cikolata")) {
    assert.match(product.image, /^\/menu\/images\/products\/pasta\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }

  const extraChocolate = withImages.find(product => product.id === "ekstra-cikolata");
  assert.equal(extraChocolate.image, "/assets/logo-original.jpg");
  assert.equal(extraChocolate.imageKind, "logo");
});

test("provided hot drink images and brief descriptions are connected", () => {
  const hotDrinks = products.filter(product => product.categories.includes("coffee"));
  const withImages = hotDrinks.filter(product => product.image);
  assert.equal(withImages.length, 20);
  assert.deepEqual(hotDrinks.filter(product => !product.image), []);
  assert.equal(hotDrinks.filter(product => product.description).length, 19);
  assert.equal(products.find(product => product.id === "cappucino").name, "Cappuccino");

  for (const product of withImages.filter(product => !["ekstra-aroma", "turk-kahvesi"].includes(product.id))) {
    assert.match(product.image, /^\/menu\/images\/products\/coffee\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }

  const turkishCoffee = withImages.find(product => product.id === "turk-kahvesi");
  assert.equal(turkishCoffee.image, "/menu/images/products/drinks/turk-kahvesi.webp");
  assert.equal(turkishCoffee.imageKind, "generated");

  const extraAroma = withImages.find(product => product.id === "ekstra-aroma");
  assert.equal(extraAroma.image, "/assets/logo-original.jpg");
  assert.equal(extraAroma.imageKind, "logo");
});

test("provided drink images and brief descriptions are connected", () => {
  const drinks = products.filter(product => product.categories.includes("icecekler"));
  const withImages = drinks.filter(product => product.image);
  assert.equal(withImages.length, 19);
  assert.deepEqual(drinks.filter(product => !product.image).map(product => product.id), []);
  assert.equal(drinks.filter(product => product.description).length, 19);
  assert.equal(drinks.find(product => product.id === "sprite").image, "/menu/images/products/drinks/soda.webp");

  for (const product of withImages) {
    assert.match(product.image, /^\/menu\/images\/products\/drinks\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }
});

test("provided herbal tea images and brief descriptions are connected", () => {
  const herbalTeas = products.filter(product => product.categories.includes("bitki-caylari"));
  const withImages = herbalTeas.filter(product => product.image);
  assert.equal(herbalTeas.length, 6);
  assert.equal(withImages.length, 6);
  assert.equal(herbalTeas.filter(product => product.description).length, 6);
  assert.deepEqual(herbalTeas.filter(product => !product.image), []);

  for (const product of withImages) {
    assert.match(product.image, /^\/menu\/images\/products\/herbal-tea\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }
});

test("provided cold coffee images and brief descriptions are connected", () => {
  const coldCoffees = products.filter(product => product.categories.includes("ice-coffee"));
  const withImages = coldCoffees.filter(product => product.image);
  assert.equal(coldCoffees.length, 10);
  assert.equal(withImages.length, 10);
  assert.equal(coldCoffees.filter(product => product.description).length, 10);
  assert.deepEqual(coldCoffees.filter(product => !product.image), []);
  assert.equal(coldCoffees.find(product => product.id === "ice-double-americano").name, "Ice Americano");

  for (const product of withImages) {
    assert.match(product.image, /^\/menu\/images\/products\/cold-coffee\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }
});

test("new cold drink categories use the provided images and brief descriptions", () => {
  const expectedCounts = { milkshake: 3, frozen: 5, frappe: 4, limonata: 3 };

  for (const [category, count] of Object.entries(expectedCounts)) {
    const categoryProducts = products.filter(product => product.categories.includes(category));
    assert.equal(categoryProducts.length, count, category);
    assert.equal(categoryProducts.filter(product => product.description).length, count, `${category} descriptions`);
    assert.equal(categoryProducts.filter(product => product.image).length, count, `${category} images`);

    for (const product of categoryProducts) {
      assert.match(product.image, new RegExp(`^/menu/images/products/${category}/[a-z0-9-]+\\.webp$`));
      assert.equal(product.imageKind, "generated");
      assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
    }
  }
});

test("provided cocktail images, descriptions and corrected COKO name are connected", () => {
  const cocktails = products.filter(product => product.categories.includes("kokteyl"));
  const providedIds = [
    "flamingo-milkshake", "coko-coko-milkshake", "sakura", "turunc-bahcesi",
    "kirmizi-bahar", "blody-jack", "cindirella"
  ];
  assert.equal(cocktails.length, 10);
  assert.equal(cocktails.filter(product => product.image).length, 10);
  assert.equal(cocktails.filter(product => product.description).length, 10);
  assert.deepEqual(cocktails.filter(product => !product.image), []);
  assert.equal(products.find(product => product.id === "coko-coko-milkshake").name, "COKO Milkshake Çikolatalı");

  for (const id of providedIds) {
    const product = products.find(candidate => candidate.id === id);
    assert.match(product.image, /^\/menu\/images\/products\/cocktails\/[a-z0-9-]+\.webp$/);
    assert.equal(product.imageKind, "generated");
    assert.ok(existsSync(fileURLToPath(new URL(`..${product.image}`, import.meta.url))), `missing ${product.image}`);
  }
});

test("screenshot descriptions are available without the removed competitor name", () => {
  const described = products.filter(product => product.description);
  assert.equal(described.length, 95);
  assert.match(products.find(product => product.id === "tiramisu").description, /Mascarpone.*espresso/i);
  assert.match(products.find(product => product.id === "kis-cayi").description, /Hibiskus.*adaçayı/i);
  assert.match(products.find(product => product.id === "coko-coko-milkshake").description, /Çikolata.*süt/i);
  assert.doesNotMatch(described.map(product => product.description).join(" "), /fl[aâ]neur/i);
});
