import { siteData } from "/data/site-data.js";
import { hasText, safeLink, phoneLink, formatPrice, formatAddress, getMenuGroups, filterMenuGroups } from "./content.js";
import { createStructuredData } from "./seo.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setText(selector, value) {
  if (!hasText(value)) return;
  document.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
}

function icon(name) {
  const image = el("img", "icon");
  image.src = `/assets/icons/${name}.svg`;
  image.alt = "";
  image.width = 20;
  image.height = 20;
  return image;
}

function linkButton(label, href, iconName = "arrow-up-right") {
  const link = el("a", "text-link", label);
  link.href = href;
  link.append(icon(iconName));
  return link;
}

function contentImage(src, alt, className, width = 640, height = 480) {
  const image = el("img", className);
  image.src = src;
  image.alt = alt;
  image.width = width;
  image.height = height;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

function addDetail(container, value, iconName, href) {
  if (!hasText(value)) return;
  const row = el("p", "detail-row");
  row.append(icon(iconName));
  const content = el(href ? "a" : "span", "", value);
  if (href) content.href = href;
  row.append(content);
  container.append(row);
}

setText("[data-brand]", siteData.brand);
setText("[data-year]", String(new Date().getFullYear()));
setText("[data-about-title]", siteData.about?.title);
setText("[data-about-copy]", siteData.about?.description);
setText("[data-menu-branch]", siteData.menu?.branchName);

document.querySelectorAll("[data-logo]").forEach((image) => {
  if (safeLink(siteData.logoPath)) image.src = siteData.logoPath;
});

document.querySelectorAll("[data-hero-image]").forEach((image) => {
  if (safeLink(siteData.heroImage)) image.src = siteData.heroImage;
  if (hasText(siteData.heroSrcset)) {
    image.srcset = siteData.heroSrcset;
    image.sizes = image.closest(".hero") ? "100vw" : "(min-width: 768px) 55vw, 100vw";
  }
  image.addEventListener("error", () => {
    if (safeLink(siteData.fallbackHeroImage)) {
      image.removeAttribute("srcset");
      image.src = siteData.fallbackHeroImage;
    }
  }, { once: true });
});

const header = document.querySelector("[data-header]");
const mobileMenu = document.querySelector(".mobile-menu");
if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  let scheduled = false;
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateHeader(); scheduled = false; });
  }, { passive: true });
  updateHeader();
}

if (mobileMenu) {
  const summary = mobileMenu.querySelector("summary");
  const closeMenu = (restoreFocus = false) => {
    mobileMenu.open = false;
    if (restoreFocus) summary.focus();
  };
  mobileMenu.addEventListener("toggle", () => {
    header?.classList.toggle("menu-is-open", mobileMenu.open);
    const label = mobileMenu.open ? "Menüyü kapat" : "Menüyü aç";
    summary.setAttribute("aria-label", label);
    summary.title = label;
  });
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.open) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) closeMenu();
  });
  matchMedia("(min-width: 1100px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

const branches = document.querySelector("[data-branches]");
if (branches) {
  const knownBranches = (siteData.branches || []).filter((branch) => hasText(branch.name));
  knownBranches.forEach((branch, index) => {
    const slug = hasText(branch.slug) ? branch.slug : branch.id;
    const card = el("a", "branch-card");
    card.id = `sube-${branch.id}`;
    card.href = `/subeler/${slug}/`;
    card.setAttribute("aria-label", `${branch.name} şubesini incele`);
    const number = el("span", "branch-index", String(index + 1).padStart(2, "0"));
    number.setAttribute("aria-hidden", "true");
    card.append(number);
    const content = el("div", "branch-content");
    const heading = el("h3");
    if (hasText(branch.label)) {
      heading.append(el("span", "branch-brand", branch.type === "cafe" ? siteData.shortBrand : siteData.brand));
      heading.append(el("span", "branch-name", branch.label));
    } else heading.textContent = branch.name;
    content.append(heading);
    card.append(content);
    const action = el("span", "branch-card-action", "Şubeyi İncele");
    action.append(icon("arrow-up-right"));
    card.append(action);
    branches.append(card);
  });
}

const contact = document.querySelector("[data-contact-details]");
if (contact) {
  const details = siteData.contact || {};
  if (phoneLink(details.phone)) addDetail(contact, details.phone, "phone", phoneLink(details.phone));
  if (hasText(details.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    addDetail(contact, details.email, "mail", `mailto:${details.email}`);
  }
  addDetail(contact, formatAddress(details.address), "map-pin");
  contact.hidden = contact.childElementCount === 0;
}

document.querySelectorAll("[data-social-links]").forEach((container) => {
  (siteData.socialLinks || []).forEach((social) => {
    if (!hasText(social.name) || !safeLink(social.url)) return;
    const link = linkButton(social.name, social.url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    container.append(link);
  });
  container.hidden = container.childElementCount === 0;
});

const groups = getMenuGroups(siteData.menu);
const products = document.querySelector("[data-products]");
if (products) {
  const allProducts = groups.flatMap((group) => group.items.map((product) => ({ ...product, categoryName: group.name })));
  const featured = allProducts.filter((product) => product.featured === true);
  const visibleProducts = (featured.length ? featured : allProducts).slice(0, 6);
  visibleProducts.forEach((product) => {
    const article = el("article", "product-card");
    if (safeLink(product.image)) article.append(contentImage(product.image, product.name, "", 640, 480));
    const body = el("div", "product-card-body");
    body.append(el("p", "section-kicker", product.categoryName), el("h3", "", product.name));
    if (hasText(product.description)) body.append(el("p", "", product.description));
    const price = formatPrice(product.price, siteData.menu.currency);
    if (price) body.append(el("strong", "product-price", price));
    article.append(body);
    products.append(article);
  });
  products.hidden = !visibleProducts.length;
  document.querySelector("[data-product-feature]").hidden = visibleProducts.length > 0;
}

const menu = document.querySelector("[data-menu]");
if (menu && groups.length) {
  document.querySelector("[data-menu-empty]").hidden = true;
  document.querySelector("[data-menu-tools]").hidden = false;
  const nav = document.querySelector("[data-menu-nav]");
  const search = document.querySelector("[data-menu-search]");
  const clear = document.querySelector("[data-search-clear]");
  const count = document.querySelector("[data-menu-count]");
  const noResults = document.querySelector("[data-menu-no-results]");
  let categoryId = "";

  function renderMenu() {
    const filtered = filterMenuGroups(groups, search.value, categoryId);
    const fragment = document.createDocumentFragment();
    filtered.forEach((group) => {
      const section = el("section", "menu-category");
      const heading = el("h2", "", group.name);
      heading.id = `menu-${group.id}`;
      section.setAttribute("aria-labelledby", heading.id);
      section.append(heading);
      const list = el("ul", "menu-items");
      group.items.forEach((product) => {
        const item = el("li");
        if (safeLink(product.image)) item.append(contentImage(product.image, product.name, "menu-product-image", 192, 192));
        const copy = el("div", "menu-item-copy");
        copy.append(el("h3", "", product.name));
        if (hasText(product.description)) copy.append(el("p", "", product.description));
        item.append(copy);
        const price = formatPrice(product.price, siteData.menu.currency);
        if (price) item.append(el("span", "menu-price", price));
        list.append(item);
      });
      section.append(list);
      fragment.append(section);
    });
    menu.replaceChildren(fragment);
    const total = filtered.reduce((sum, group) => sum + group.items.length, 0);
    count.textContent = `${total} ürün`;
    noResults.hidden = total > 0;
    clear.hidden = !search.value;
    nav.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.category === categoryId));
    });
  }

  [{ id: "", name: "Tümü" }, ...groups].forEach((group) => {
    const button = el("button", "", group.name);
    button.type = "button";
    button.dataset.category = group.id;
    button.setAttribute("aria-controls", "menu-content");
    button.addEventListener("click", () => { categoryId = group.id; renderMenu(); });
    nav.append(button);
  });
  const resetSearch = () => { search.value = ""; categoryId = ""; renderMenu(); search.focus(); };
  search.addEventListener("input", renderMenu);
  clear.addEventListener("click", resetSearch);
  document.querySelector("[data-search-reset]").addEventListener("click", resetSearch);
  document.querySelector("[data-search-form]").addEventListener("submit", (event) => event.preventDefault());
  renderMenu();
}

let schema = document.getElementById("structured-data");
if (!schema) {
  schema = document.createElement("script");
  schema.id = "structured-data";
  schema.type = "application/ld+json";
  document.head.append(schema);
}
schema.textContent = JSON.stringify(createStructuredData(siteData, Boolean(menu)));

if ("IntersectionObserver" in window) {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const reveal = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));
  }
  const navigation = document.querySelectorAll(".main-nav a");
  const activeSection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target.classList.contains("hero") ? "#top" : `#${entry.target.id}`;
      navigation.forEach((link) => {
        if (link.getAttribute("href") === target) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -60% 0px" });
  document.querySelectorAll(".hero, #urunler, #subeler, #hakkimizda, #iletisim").forEach((node) => activeSection.observe(node));
}
