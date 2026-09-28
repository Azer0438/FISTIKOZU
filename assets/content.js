export const hasText = (value) => typeof value === "string" && value.trim().length > 0;

export function normalizeText(value) {
  return String(value ?? "").toLocaleLowerCase("tr-TR").replace(/ı/g, "i")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function safeLink(value) {
  if (!hasText(value)) return "";
  try {
    const url = new URL(value, "https://www.fıstıközü.com.tr");
    return ["https:", "http:"].includes(url.protocol) ? value : "";
  } catch {
    return "";
  }
}

export function phoneLink(value) {
  if (!hasText(value)) return "";
  const number = value.replace(/[^\d+]/g, "");
  return /^\+?\d{5,15}$/.test(number) ? `tel:${number}` : "";
}

export function formatPrice(value, currency = "TRY") {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  }
  return hasText(value) ? value.trim() : "";
}

export function formatAddress(address) {
  if (hasText(address)) return address;
  if (!address || typeof address !== "object") return "";
  return [address.streetAddress, address.postalCode, address.addressLocality, address.addressRegion]
    .filter(hasText).join(", ");
}

export const dayNames = {
  Monday: "Pazartesi", Tuesday: "Salı", Wednesday: "Çarşamba", Thursday: "Perşembe",
  Friday: "Cuma", Saturday: "Cumartesi", Sunday: "Pazar"
};

export function validHours(hours) {
  if (!Array.isArray(hours)) return [];
  const time = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return hours.filter((item) => Array.isArray(item.days) && item.days.length
    && item.days.every((day) => Object.hasOwn(dayNames, day))
    && time.test(item.opens) && time.test(item.closes));
}

export function getMenuGroups(menu = {}) {
  const products = Array.isArray(menu.products) ? menu.products : [];
  const categories = Array.isArray(menu.categories) ? menu.categories : [];
  return categories.filter((category) => hasText(category.id) && hasText(category.name))
    .map((category) => ({
      ...category,
      items: products.filter((product) => product.category === category.id && hasText(product.id)
        && hasText(product.name) && product.available !== false)
    })).filter((category) => category.items.length > 0);
}

export function filterMenuGroups(groups, query = "", categoryId = "") {
  const needle = normalizeText(query).trim();
  return groups.filter((group) => !categoryId || group.id === categoryId)
    .map((group) => ({
      ...group,
      items: group.items.filter((product) => normalizeText([
        group.name, product.name, product.description
      ].filter(hasText).join(" ")).includes(needle))
    })).filter((group) => group.items.length > 0);
}
