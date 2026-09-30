import { hasText, normalizeText } from "../../assets/content.js";

const list = (value) => Array.isArray(value) ? value : [];
const order = (item) => Number.isFinite(item.order) ? item.order : Number.MAX_SAFE_INTEGER;
const belongsToBranch = (item, branch) => !Array.isArray(item.branchIds) || item.branchIds.includes(branch);

function unique(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || !hasText(item.id) || !hasText(item.name) || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function readContext(url, branches, defaultBranch = "cafe-pastane") {
  const parsed = new URL(url, "https://menu.invalid");
  const requested = parsed.searchParams.get("branch");
  const id = requested === "cafe" ? "cafe-pastane" : requested;
  const known = list(branches);
  const branch = known.find((item) => item.id === id) || known.find((item) => item.id === defaultBranch) || known[0] || null;
  const table = parsed.searchParams.get("table") || "";
  return { branch, table: /^[A-Za-z0-9_-]{1,32}$/.test(table) ? table : "" };
}

export function buildCatalog(data = {}, branchId = "") {
  const overrides = data.branchOverrides?.[branchId] || {};
  const categories = unique(list(data.categories))
    .filter((item) => belongsToBranch(item, branchId))
    .map((item) => ({ ...item, active: overrides.categories?.[item.id]?.active ?? item.active }))
    .filter((item) => item.active !== false)
    .sort((a, b) => order(a) - order(b));
  const ids = new Set(categories.map((item) => item.id));
  const products = unique(list(data.products))
    .filter((item) => belongsToBranch(item, branchId))
    .map((item) => {
      const override = overrides.products?.[item.id] || {};
      const categories = [...new Set(Array.isArray(item.categories) ? item.categories : [item.category])].filter((id) => ids.has(id));
      return {
        ...item, categories,
        price: Object.hasOwn(override, "price") ? override.price : item.price,
        available: override.available ?? item.available,
        hidden: override.hidden ?? item.hidden
      };
    })
    .filter((item) => item.categories.length && !item.hidden
      && (item.available !== false || data.settings?.unavailableMode === "show"))
    .sort((a, b) => order(a) - order(b));
  return {
    categories: categories.map((category) => ({ ...category, count: products.filter((item) => item.categories.includes(category.id)).length }))
      .filter((category) => category.count > 0),
    products
  };
}

export function findProducts(catalog, query = "", categoryId = "") {
  const words = normalizeText(query).trim().split(/\s+/).filter(Boolean);
  const names = new Map(catalog.categories.map((item) => [item.id, item.name]));
  const matches = catalog.products.filter((item) => {
    if (categoryId && !item.categories.includes(categoryId)) return false;
    const text = normalizeText([item.name, item.description, ...item.categories.map((id) => names.get(id))].filter(hasText).join(" "));
    return words.every((word) => text.includes(word));
  });
  if (categoryId) matches.sort((a, b) => {
    const rank = (item) => Number.isFinite(item.categoryOrder?.[categoryId]) ? item.categoryOrder[categoryId] : order(item);
    return rank(a) - rank(b);
  });
  return matches;
}

export function getCategoryCoverProduct(catalog, categoryId) {
  return findProducts(catalog, "", categoryId)[0] || null;
}

export function categoryHash(id) {
  return id ? `#kategori/${encodeURIComponent(id)}` : "";
}

export function readCategory(hash, categories) {
  if (!hash.startsWith("#kategori/")) return "";
  try {
    const id = decodeURIComponent(hash.slice(10));
    return categories.some((category) => category.id === id) ? id : "";
  } catch { return ""; }
}
