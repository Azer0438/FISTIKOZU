import { siteData } from "/data/site-data.js";
import { dayNames, formatAddress, hasText, phoneLink, safeLink, validHours } from "/assets/content.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(name) {
  const image = el("img", "icon");
  image.src = `/assets/icons/${name}.svg`;
  image.alt = "";
  image.width = 20;
  image.height = 20;
  return image;
}

function action(label, href, className, iconName, external = false) {
  const link = el("a", `button ${className}`, label);
  link.href = href;
  link.append(icon(iconName));
  if (external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
}

function setMeta(selector, value) {
  const meta = document.querySelector(selector);
  if (meta) meta.content = value;
}

function renderNotFound() {
  document.title = "Şube Bulunamadı | Fıstıközü";
  const section = el("section", "branch-not-found");
  const container = el("div", "container");
  container.append(el("p", "section-kicker", "ŞUBELERİMİZ"), el("h1", "", "Aradığınız şubeyi bulamadık."));
  container.append(el("p", "", "Şubelerimizi ana sayfadan inceleyebilirsiniz."));
  const link = action("Şubelerimize Dön", "/#subeler", "button-primary", "arrow-left");
  container.append(link);
  section.append(container);
  document.querySelector("[data-branch-page-content]")?.replaceChildren(section);
}

const pathParts = window.location.pathname.split("/").filter(Boolean);
const slug = pathParts[0] === "subeler" ? pathParts[1] : "";

if (!slug) {
  window.location.replace("/#subeler");
} else {
  const branch = (siteData.branches || []).find((item) => (item.slug || item.id) === slug);
  if (!branch) {
    renderNotFound();
  } else {
    const brandLabel = branch.type === "cafe" ? siteData.shortBrand : siteData.brand;
    const title = `${branch.name} | Kayseri`;
    const description = `${branch.name} hakkında bilgiler ve şube detayları.`;
    const canonical = new URL(`/subeler/${slug}/`, siteData.canonicalBase).href;

    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonical);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.href = canonical;

    document.querySelector("[data-branch-brand]").textContent = brandLabel;
    document.querySelector("[data-branch-label]").textContent = branch.label || branch.name;

    if (hasText(branch.description)) {
      const descriptionNode = document.querySelector("[data-branch-description]");
      descriptionNode.textContent = branch.description;
      descriptionNode.hidden = false;
    }

    if (safeLink(branch.image)) {
      const imageAlt = hasText(branch.imageAlt) ? branch.imageAlt : branch.name;
      setMeta('meta[property="og:image"]', new URL(branch.image, siteData.canonicalBase).href);
      setMeta('meta[property="og:image:alt"]', imageAlt);
    }

    const actions = document.querySelector("[data-branch-actions]");
    if (safeLink(branch.mapsUrl)) {
      const directions = action("Yol Tarifi Al", branch.mapsUrl, "button-primary", "map-pin", true);
      directions.setAttribute("aria-label", `${branch.name} yol tarifini yeni sekmede aç`);
      actions.append(directions);
    }
    const phoneNumbers = [branch.phone, ...(Array.isArray(branch.phones) ? branch.phones : [])]
      .filter(hasText).map((number) => ({ number, href: phoneLink(number) })).filter((item) => item.href)
      .filter((item, index, items) => items.findIndex((entry) => entry.href === item.href) === index);
    for (const item of phoneNumbers) {
      const label = phoneNumbers.length > 1 ? `${item.number} Ara` : "Telefon Et";
      const call = action(label, item.href, "button-secondary", "phone");
      call.setAttribute("aria-label", `${branch.name} şubesini ${item.number} numarasından ara`);
      actions.append(call);
    }
    const menuUrl = safeLink(branch.menuUrl || (branch.qrMenu ? siteData.qrMenuPath : ""));
    if (menuUrl) actions.append(action("Menüyü İncele", menuUrl, "button-secondary", "arrow-up-right"));
    actions.hidden = actions.childElementCount === 0;

    const address = formatAddress(branch.address);
    const addressRow = document.querySelector("[data-branch-address]");
    if (address) {
      document.querySelector("[data-branch-address-value]").textContent = address;
      addressRow.hidden = false;
    }
    const phoneRow = document.querySelector("[data-branch-phone]");
    if (phoneNumbers.length) {
      const phoneValues = document.querySelector("[data-branch-phone-values]");
      for (const item of phoneNumbers) {
        const phoneValue = el("a", "", item.number);
        phoneValue.href = item.href;
        phoneValues.append(phoneValue);
      }
      phoneRow.hidden = false;
    }
    const hours = validHours(branch.workingHours);
    const hoursText = hasText(branch.workingHoursText) ? branch.workingHoursText.trim() : "";
    const hoursRow = document.querySelector("[data-branch-hours]");
    if (hours.length) {
      const hoursList = document.querySelector("[data-branch-hours-value]");
      for (const item of hours) {
        hoursList.append(el("li", "branch-fact-value", `${item.days.map((day) => dayNames[day]).join(", ")}: ${item.opens} - ${item.closes}`));
      }
      hoursRow.hidden = false;
    } else if (hoursText) {
      document.querySelector("[data-branch-hours-value]").append(el("li", "branch-fact-value", hoursText));
      hoursRow.hidden = false;
    }
    const factsPresent = Boolean(address || phoneNumbers.length || hours.length || hoursText);
    document.querySelector("[data-branch-info-empty]").hidden = factsPresent;

    const mapUrl = safeLink(branch.mapEmbed);
    const map = document.querySelector("[data-branch-map]");
    const infoLayout = document.querySelector("[data-branch-info-layout]");
    if (mapUrl) {
      const frame = document.querySelector("[data-branch-map-frame]");
      frame.src = mapUrl;
      frame.title = `${branch.name} haritası`;
      map.hidden = false;
    } else {
      infoLayout.classList.add("no-map");
    }

    const galleryImages = Array.isArray(branch.images) ? branch.images : [];
    const gallery = document.querySelector("[data-branch-gallery]");
    const galleryGrid = document.querySelector("[data-branch-gallery-grid]");
    for (const [index, item] of galleryImages.entries()) {
      const source = typeof item === "string" ? item : item?.src;
      if (!safeLink(source)) continue;
      const figure = el("figure");
      const image = el("img");
      image.src = source;
      image.alt = typeof item === "object" && hasText(item.alt) ? item.alt : `${branch.name} şubesinden görünüm ${index + 1}`;
      if (typeof item === "object" && Number.isFinite(item.width) && Number.isFinite(item.height)) {
        image.width = item.width;
        image.height = item.height;
      }
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => figure.remove(), { once: true });
      figure.append(image);
      galleryGrid.append(figure);
    }
    if (galleryGrid.childElementCount === 3) galleryGrid.classList.add("gallery-count-3");
    const measuredGalleryImages = galleryImages.filter((item) => typeof item === "object" && Number.isFinite(item.width) && Number.isFinite(item.height));
    if (measuredGalleryImages.length === galleryGrid.childElementCount && measuredGalleryImages.every((item) => Math.abs(item.width / item.height - 1) <= 0.1)) {
      galleryGrid.classList.add("gallery-square");
    }
    gallery.hidden = galleryGrid.childElementCount === 0;

    if (branch.type === "cafe" && menuUrl) {
      const menuBand = document.querySelector("[data-branch-menu]");
      document.querySelector("[data-branch-menu-title]").textContent = branch.name;
      document.querySelector("[data-branch-menu-link]").href = menuUrl;
      menuBand.hidden = false;
    }
  }
}
