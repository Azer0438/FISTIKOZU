import { hasText, safeLink, formatPrice } from "../assets/content.js";
import { categoryHash } from "./utils/catalog.js";

export function node(tag, className = "", text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function icon(name, directory = "/assets/icons") {
  const image = node("img", "qr-icon");
  image.src = `${directory}/${name}.svg`;
  image.alt = "";
  image.width = image.height = 20;
  return image;
}

export function media(src, alt, logo, eager = false, imageKind = "") {
  const frame = node("div", "qr-media");
  if (imageKind === "logo") frame.classList.add("is-logo");
  const image = node("img");
  image.width = 640;
  image.height = 480;
  image.alt = alt;
  image.loading = eager ? "eager" : "lazy";
  image.decoding = "async";
  const fallback = () => {
    frame.classList.add("is-fallback");
    image.alt = "Fıstıközü logosu";
    image.src = safeLink(logo) || "/assets/logo-original.jpg";
    image.addEventListener("error", () => {
      image.hidden = true;
      frame.append(node("span", "qr-fallback-name", "Fıstıközü"));
    }, { once: true });
  };
  if (safeLink(src)) {
    image.addEventListener("error", fallback, { once: true });
    image.src = src;
  } else fallback();
  frame.append(image);
  if (imageKind === "generated") frame.append(node("span", "qr-image-note", "Temsili görsel"));
  return frame;
}

export function categoryCard(category, logo, index) {
  const item = node("li");
  const link = node("a", "qr-category-card");
  link.href = categoryHash(category.id);
  link.dataset.category = category.id;
  if (safeLink(category.image)) {
    link.append(media(category.image, category.name, logo, index < 3, category.imageKind));
  } else {
    link.classList.add("is-text-category");
    const symbol = icon(/^[a-z0-9-]+$/.test(category.icon || "") ? category.icon : "utensils-crossed", "/menu/icons");
    symbol.classList.add("qr-category-symbol");
    link.append(symbol);
  }
  const caption = node("div", "qr-category-caption");
  const copy = node("div");
  copy.append(node("h3", "", category.name), node("span", "qr-category-count", `${category.count} ürün`));
  caption.append(copy, icon("arrow-up-right"));
  link.append(caption);
  item.append(link);
  return item;
}

export function productCard(product, { logo, currency, categoryName, onOpen }) {
  const item = node("li", "qr-product-item");
  const button = node("button", "qr-product-card");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-label", `${product.name}, ürün detayı`);
  button.dataset.product = product.id;
  if (safeLink(product.image)) button.append(media(product.image, product.name, logo, false, product.imageKind));
  else button.classList.add("is-text-product");
  const body = node("div", "qr-product-body");
  if (categoryName) body.append(node("span", "qr-product-category", categoryName));
  body.append(node("h3", "", product.name));
  if (hasText(product.description)) body.append(node("p", "qr-description", product.description));
  if (product.available === false) body.append(node("p", "qr-unavailable", "Geçici olarak mevcut değil"));
  const foot = node("div", "qr-product-foot");
  const price = formatPrice(product.price, currency);
  if (price) foot.append(node("span", "qr-price", price));
  foot.append(icon("arrow-up-right"));
  body.append(foot);
  button.append(body);
  button.addEventListener("click", () => onOpen(product));
  item.append(button);
  return item;
}

export function productDetail(product, { logo, currency, categoryName }) {
  const fragment = document.createDocumentFragment();
  if (safeLink(product.image)) fragment.append(media(product.image, product.name, logo, true, product.imageKind));
  const copy = node("div", "qr-detail-copy");
  if (categoryName) copy.append(node("p", "qr-detail-category", categoryName));
  const title = node("h2", "", product.name);
  title.id = "product-title";
  copy.append(title);
  const price = formatPrice(product.price, currency);
  if (price) copy.append(node("p", "qr-price", price));
  if (product.available === false) copy.append(node("p", "qr-unavailable", "Geçici olarak mevcut değil"));
  if (hasText(product.description)) copy.append(node("p", "qr-detail-description", product.description));
  const ingredients = Array.isArray(product.ingredients) ? product.ingredients.filter(hasText).join(", ") : product.ingredients;
  if (hasText(ingredients)) {
    copy.append(node("h3", "qr-ingredients-title", "İçindekiler"), node("p", "qr-detail-description", ingredients));
  }
  fragment.append(copy);
  return fragment;
}
