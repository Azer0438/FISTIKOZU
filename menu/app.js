import { siteData } from "../data/site-data.js";
import { menuData } from "./data/menu-data.js";
import { safeLink } from "../assets/content.js";
import { createStructuredData } from "../assets/seo.js";
import { buildCatalog, readContext, findProducts, getCategoryCoverProduct, categoryHash, readCategory } from "./utils/catalog.js";
import { node, icon, categoryCard, productCard, productDetail } from "./components.js";

const $ = (selector) => document.querySelector(selector);
const pageUrl = new URL(location.href);
if (pageUrl.searchParams.has("demo")) {
  pageUrl.searchParams.delete("demo");
  history.replaceState(history.state, "", pageUrl);
}
const context = readContext(location.href, siteData.branches, menuData.settings.defaultBranch);
const data = menuData;
const catalog = buildCatalog(data, context.branch?.id);
const logo = safeLink(siteData.logoPath) || "/assets/logo-original.jpg";
const currency = data.currency || "TRY";
const search = $("[data-search]");
const title = $("[data-title]");
const productList = $("[data-products]");
const categoryGrid = $("[data-categories]");
const detailDialog = $("#product-detail");
const categoryDialog = $("#category-sheet");
const homeUrl = new URL(location.href);
homeUrl.hash = "";
let activeCategory = readCategory(location.hash, catalog.categories);
let returnScroll = 0;
let returnCategory = "";

$("[data-year]").textContent = new Date().getFullYear();
$("[data-branch]").textContent = context.branch?.name || siteData.menu.branchName;
$("[data-header-branch]").textContent = context.branch?.label || "Cafe / Pastane";
$("[data-brand-link]").href = homeUrl.href;
$("[data-brand-link]").setAttribute("aria-label", `Fıstıközü ${context.branch?.label || "Cafe / Pastane"}, ana menü`);
document.querySelectorAll("[data-logo]").forEach((image) => { image.src = logo; });

let schema = $("#structured-data");
if (!schema) {
  schema = node("script");
  schema.type = "application/ld+json";
  schema.id = "structured-data";
  document.head.append(schema);
}
schema.textContent = JSON.stringify(createStructuredData(siteData, true));

function openDialog(dialog) {
  dialog.showModal();
  document.documentElement.classList.add("qr-modal-open");
}
for (const dialog of [categoryDialog, detailDialog]) {
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...dialog.querySelectorAll("button:not([disabled]), a[href], [tabindex='0']")].filter((item) => item.getClientRects().length);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]")) document.documentElement.classList.remove("qr-modal-open");
  });
}
function showProduct(product) {
  const categoryName = catalog.categories.filter((category) => product.categories.includes(category.id)).map((category) => category.name).join(" · ");
  $("[data-detail]").replaceChildren(productDetail(product, { logo, currency, categoryName }));
  openDialog(detailDialog);
  detailDialog.scrollTop = 0;
}

function render() {
  const category = catalog.categories.find((item) => item.id === activeCategory);
  const query = search.value.trim();
  const showingProducts = Boolean(category || query);
  const items = findProducts(catalog, query, activeCategory);
  const heading = category?.name || "Menümüz";
  const hasCatalog = catalog.categories.length > 0;
  title.textContent = heading;
  document.title = `${category ? `${category.name} | ` : ""}Fıstıközü | QR Menü`;
  $("[data-header-title]").textContent = heading;
  $("[data-header-title]").hidden = !category;
  $("[data-brand-link]").hidden = Boolean(category);
  $("[data-back]").hidden = !category;
  $("[data-header]").classList.toggle("is-subview", Boolean(category));
  $("[data-intro]").classList.toggle("is-subview", Boolean(category));
  $("[data-greeting]").hidden = Boolean(category);
  $("[data-search-form]").hidden = !hasCatalog;
  $("[data-clear]").hidden = !search.value;
  $("[data-content]").hidden = !hasCatalog || (showingProducts && !items.length);
  $("[data-empty]").hidden = hasCatalog;
  $("[data-no-results]").hidden = !hasCatalog || !showingProducts || items.length > 0;
  $("[data-floating]").hidden = !hasCatalog || !showingProducts;
  $("[data-content-title]").textContent = showingProducts ? (query ? "Bulunan lezzetler" : "Lezzetler") : "Kategoriler";
  $("[data-count]").textContent = showingProducts ? `${items.length} ürün` : `${catalog.categories.length} kategori`;
  $("[data-status]").textContent = hasCatalog ? (showingProducts ? `${heading}: ${items.length} ürün` : `${catalog.categories.length} kategori`) : "";
  categoryGrid.hidden = showingProducts;
  productList.hidden = !showingProducts;
  productList.classList.toggle("is-text-list", items.every((product) => !safeLink(product.image)));
  if (showingProducts) {
    const names = new Map(catalog.categories.map((item) => [item.id, item.name]));
    productList.replaceChildren(...items.map((product) => productCard(product, {
      logo, currency, categoryName: category ? "" : product.categories.map((id) => names.get(id)).join(" · "), onOpen: showProduct
    })));
  } else productList.replaceChildren();
  $("[data-category-list]").querySelectorAll("a").forEach((link) => {
    if (link.dataset.category === activeCategory) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

categoryGrid.replaceChildren(...catalog.categories.map((category, index) => (
  categoryCard(category, getCategoryCoverProduct(catalog, category.id), logo, index)
)));
for (const category of [{ id: "", name: "Ana menü" }, ...catalog.categories]) {
  const link = node("a", "qr-sheet-link");
  link.href = category.id ? categoryHash(category.id) : homeUrl.href;
  link.dataset.category = category.id;
  link.append(node("span", "", category.name));
  if (category.count) link.append(node("span", "qr-sheet-count", String(category.count)));
  link.append(icon("arrow-right"));
  $("[data-category-list]").append(link);
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    categoryDialog.close();
    navigate(category.id);
  });
}

function navigate(id) {
  if (!activeCategory && id) { returnScroll = window.scrollY; returnCategory = id; }
  const next = `${homeUrl.pathname}${homeUrl.search}${categoryHash(id)}`;
  if (`${location.pathname}${location.search}${location.hash}` !== next) history.pushState(null, "", next);
  search.value = "";
  activeCategory = id;
  render();
  title.focus({ preventScroll: true });
  window.scrollTo({ top: id ? 0 : returnScroll, behavior: "instant" });
  if (!id && returnCategory) {
    const link = [...categoryGrid.querySelectorAll("a")].find((item) => item.dataset.category === returnCategory);
    link?.focus({ preventScroll: true });
  }
}
categoryGrid.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-category]");
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate(link.dataset.category);
});
$("[data-back]").addEventListener("click", () => navigate(""));
$("[data-brand-link]").addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate("");
});
window.addEventListener("popstate", () => {
  for (const dialog of [categoryDialog, detailDialog]) if (dialog.open) dialog.close();
  activeCategory = readCategory(location.hash, catalog.categories);
  search.value = "";
  render();
  title.focus({ preventScroll: true });
  window.scrollTo({ top: activeCategory ? 0 : returnScroll, behavior: "instant" });
});
window.addEventListener("hashchange", () => {
  const id = readCategory(location.hash, catalog.categories);
  if (id !== activeCategory) { activeCategory = id; search.value = ""; render(); window.scrollTo({ top: 0, behavior: "instant" }); }
});

search.addEventListener("input", render);
$("[data-search-form]").addEventListener("submit", (event) => { event.preventDefault(); search.blur(); });
const clearSearch = () => { search.value = ""; render(); search.focus(); };
$("[data-clear]").addEventListener("click", clearSearch);
$("[data-reset]").addEventListener("click", clearSearch);
$("[data-category-trigger]").addEventListener("click", () => openDialog(categoryDialog));
$("[data-top]").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  title.focus({ preventScroll: true });
});
let scrollScheduled = false;
window.addEventListener("scroll", () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => { $("[data-top]").hidden = scrollY < 600; scrollScheduled = false; });
}, { passive: true });
render();
clearTimeout(window.qrLoadingTimer);
document.documentElement.classList.remove("qr-loading");
