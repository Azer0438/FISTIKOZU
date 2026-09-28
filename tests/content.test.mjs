import test from "node:test";
import assert from "node:assert/strict";
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
    assert.ok(branch.id && branch.name);
  }
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
