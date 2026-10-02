import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getMenuGroups, filterMenuGroups, formatPrice, formatAddress, safeLink, phoneLink, validHours } from "../assets/content.js";
import { createStructuredData } from "../assets/seo.js";
import { siteData } from "../data/site-data.js";

const fixture = {
  categories: [{ id: "a", name: "TEST Kategori A" }, { id: "b", name: "TEST Kategori B" }, { id: "empty", name: "TEST Boş" }],
  products: [
    { id: "one", category: "a", name: "TEST FISTIK", price: 100, available: true },
    { id: "two", category: "b", name: "TEST İçecek", description: "TEST Açıklama", price: null },
    { id: "hidden", category: "a", name: "TEST Gizli", available: false },
    { id: "orphan", category: "missing", name: "TEST Bağsız" }
  ]
};

test("an empty catalog stays empty and the permanent menu route is preserved", () => {
  assert.deepEqual(getMenuGroups({ categories: [], products: [] }), []);
  assert.equal(siteData.branches.length, 4);
  assert.equal(siteData.qrMenuPath, "/menu/");
  for (const branch of siteData.branches) {
    assert.ok(branch.id && branch.slug && branch.name);
    assert.equal(branch.slug, branch.id);
    assert.ok(Array.isArray(branch.images));
    assert.ok(Object.hasOwn(branch, "mapEmbed"));
    assert.ok(Object.hasOwn(branch, "menuUrl"));
  }
});

test("branch cards and detail routes use the four central branch records", () => {
  assert.deepEqual(siteData.branches.map((branch) => branch.slug), [
    "organize", "sehir-hastanesi", "yeni-sanayi", "cafe-pastane"
  ]);
  const homeScript = readFileSync(new URL("../assets/site.js", import.meta.url), "utf8");
  const branchTemplate = readFileSync(new URL("../subeler/index.html", import.meta.url), "utf8");
  const branchScript = readFileSync(new URL("../subeler/app.js", import.meta.url), "utf8");
  assert.match(homeScript, /\/subeler\/\$\{slug\}\//);
  assert.match(branchTemplate, /data-branch-map/);
  assert.match(branchTemplate, /data-branch-gallery/);
  assert.doesNotMatch(branchTemplate, /data-branch-hero-image/);
  assert.match(branchScript, /branch\.type === "cafe"/);
  assert.match(branchScript, /phoneLink\(number\)/);
  assert.match(branchScript, /gallery-count-3/);
});

test("confirmed Organize branch details and supplied images are published without inferred days", () => {
  const branch = siteData.branches.find((item) => item.slug === "organize");
  assert.equal(branch.address.streetAddress, "Anbar Mahallesi 14. Cadde No: 12");
  assert.equal(branch.phone, "0507 957 25 15");
  assert.equal(branch.mapsUrl, "https://maps.app.goo.gl/1Zt68nCuZwHn2f87A");
  assert.equal(branch.workingHoursText, "06:00 - 21:00");
  assert.deepEqual(validHours(branch.workingHours), []);
  assert.equal(branch.images.length, 3);
  assert.deepEqual(branch.images.map((image) => image.src), [
    "/assets/images/sube-organize-gallery-01.jpg",
    "/assets/images/sube-organize-gallery-02.jpg",
    "/assets/images/sube-organize-gallery-03.jpg"
  ]);
  assert.ok(branch.images.every((image) => safeLink(image.src)));
  const business = createStructuredData(siteData)["@graph"].find((item) => item.name === branch.name);
  assert.equal(business.telephone, branch.phone);
  assert.equal(business.address.addressLocality, "Melikgazi");
  assert.equal(business.openingHoursSpecification, undefined);
});

test("confirmed Şehir Hastanesi details retain both phone numbers without inferred days", () => {
  const branch = siteData.branches.find((item) => item.slug === "sehir-hastanesi");
  assert.equal(branch.address.streetAddress, "Şeker Mahallesi, Muhsin Yazıcıoğlu Bulvarı No: 76/76A");
  assert.deepEqual(branch.phones, ["+90 545 218 38 08", "+90 543 846 96 09"]);
  assert.equal(branch.mapsUrl, "https://maps.app.goo.gl/FyUnLZM4ZekMNX1S7");
  assert.equal(branch.workingHoursText, "05:30 - 00:00");
  assert.deepEqual(validHours(branch.workingHours), []);
  assert.equal(branch.images.length, 3);
  assert.equal(branch.images.at(-1).src, "/assets/images/sube-sehir-hastanesi-gece.jpg");
  const business = createStructuredData(siteData)["@graph"].find((item) => item.name === branch.name);
  assert.deepEqual(business.telephone, branch.phones);
  assert.equal(business.address.addressLocality, "Kocasinan");
  assert.equal(business.openingHoursSpecification, undefined);
});

test("confirmed Yeni Sanayi details retain both phone numbers and supplied photo", () => {
  const branch = siteData.branches.find((item) => item.slug === "yeni-sanayi");
  assert.equal(branch.address.streetAddress, "Şeker Mahallesi, 6180. Sokak, Yeni Sanayi Sitesi No: 1");
  assert.equal(branch.address.postalCode, "38060");
  assert.deepEqual(branch.phones, ["+90 507 957 25 15", "+90 553 305 38 11"]);
  assert.equal(branch.workingHoursText, "07:00 - 21:00");
  assert.deepEqual(validHours(branch.workingHours), []);
  assert.deepEqual(branch.images.map((image) => image.src), ["/assets/images/sube-yeni-sanayi-gece.jpg"]);
  const business = createStructuredData(siteData)["@graph"].find((item) => item.name === branch.name);
  assert.deepEqual(business.telephone, branch.phones);
  assert.equal(business.address.addressLocality, "Kocasinan");
  assert.equal(business.openingHoursSpecification, undefined);
});

test("confirmed Erkilet Cafe / Pastane details publish without an unconfirmed map or image", () => {
  const branch = siteData.branches.find((item) => item.slug === "cafe-pastane");
  assert.equal(branch.name, "Fıstıközü Erkilet Cafe / Pastane");
  assert.equal(branch.label, "Erkilet Cafe / Pastane");
  assert.equal(branch.address.streetAddress, "Erkilet Bulvarı, Osmangazi Mahallesi, İlkut Apartmanı Altı No: 556/A");
  assert.equal(branch.address.postalCode, "38050");
  assert.deepEqual(branch.phones, ["+90 507 957 25 15", "+90 553 305 38 11"]);
  assert.equal(branch.workingHoursText, "07:00 - 23:00");
  assert.equal(branch.mapsUrl, "");
  assert.equal(branch.image, "");
  assert.deepEqual(branch.images, []);
  const business = createStructuredData(siteData)["@graph"].find((item) => item.name === branch.name);
  assert.deepEqual(business.telephone, branch.phones);
  assert.equal(business.address.addressLocality, "Kocasinan");
  assert.equal(business.hasMap, undefined);
  assert.equal(business.image, undefined);
});

test("empty menu and unavailable items do not create placeholder categories", () => {
  assert.deepEqual(getMenuGroups(), []);
  assert.equal(getMenuGroups(fixture).length, 2);
  assert.deepEqual(getMenuGroups(fixture).flatMap(group => group.items.map(item => item.id)), ["one", "two"]);
});

test("Turkish and ASCII searches match the same products", () => {
  const groups = getMenuGroups(fixture);
  for (const query of ["fıstık", "fistik", "FISTIK"]) {
    assert.equal(filterMenuGroups(groups, query)[0].items[0].id, "one");
  }
  for (const query of ["İÇECEK", "icecek", "açıklama"]) {
    assert.equal(filterMenuGroups(groups, query)[0].items[0].id, "two");
  }
});

test("category and text filters compose without leaving empty sections", () => {
  const groups = getMenuGroups(fixture);
  assert.equal(filterMenuGroups(groups, "", "a")[0].items.length, 1);
  assert.deepEqual(filterMenuGroups(groups, "icecek", "a"), []);
  assert.deepEqual(filterMenuGroups(groups, "not-present"), []);
  assert.equal(filterMenuGroups(groups, "Kategori A")[0].items.length, 1);
  assert.equal(filterMenuGroups(groups, "").length, 2);
});

test("price is optional; zero and fractional confirmed prices remain valid", () => {
  for (const value of [null, undefined, "", NaN, -10]) assert.equal(formatPrice(value), "");
  assert.match(formatPrice(0), /0/);
  assert.match(formatPrice(123.5), /123,50/);
  assert.equal(formatPrice("  TEST fiyat  "), "TEST fiyat");
});

test("missing addresses and invalid URLs never become made-up contact links", () => {
  assert.equal(formatAddress(null), "");
  assert.equal(formatAddress({}), "");
  assert.equal(formatAddress({ streetAddress: "TEST", addressLocality: "TEST" }), "TEST, TEST");
  assert.equal(safeLink("javascript:alert(1)"), "");
  assert.equal(safeLink("data:text/html,test"), "");
  assert.equal(phoneLink(""), "");
  assert.equal(phoneLink("TEST"), "");
  assert.equal(safeLink("/assets/logo-original.jpg"), "/assets/logo-original.jpg");
});

test("unconfirmed local business data is not published as structured data", () => {
  const graph = createStructuredData({ ...siteData, branches: [{ id: "test", name: "TEST", address: null }] })["@graph"];
  assert.deepEqual(graph.map(item => item["@type"]), ["Organization", "WebSite"]);
  assert.ok(graph.every(item => !item.telephone && !item.address && !item.geo));
});

test("confirmed branch details add a local business with only supplied properties", () => {
  const data = structuredClone(siteData);
  data.branches = [{ id: "test", name: "TEST", type: "bakery" }];
  data.branches[0].address = { streetAddress: "TEST ADDRESS", addressLocality: "TEST CITY", addressCountry: "TR" };
  data.branches[0].coordinates = { latitude: 0, longitude: 0 };
  data.branches[0].workingHours = [{ days: ["Monday"], opens: "09:00", closes: "18:00" }];
  const branch = createStructuredData(data)["@graph"].at(-1);
  assert.equal(branch["@type"], "Bakery");
  assert.equal(branch.address.streetAddress, "TEST ADDRESS");
  assert.equal(branch.geo.latitude, 0);
  assert.equal(branch.openingHoursSpecification[0].opens, "09:00");
  assert.equal(branch.telephone, undefined);
  assert.equal(branch.hasMap, undefined);
});

test("invalid hours and coordinates are excluded", () => {
  assert.deepEqual(validHours([{ days: ["Monday"], opens: "25:00", closes: "18:00" }]), []);
  assert.deepEqual(validHours([{ days: ["not-a-day"], opens: "09:00", closes: "18:00" }]), []);
  assert.deepEqual(validHours(null), []);
});
