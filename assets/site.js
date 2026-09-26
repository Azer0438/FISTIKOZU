import { siteData } from "/data/site-data.js";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;
const cleanPhone = (value) => value.replace(/[^\d+]/g, "");
const normalizeText = (value) =>
  (value || "")
    .toString()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
}

function addDetail(container, label, value, href) {
  if (!hasText(value)) return false;

  const row = el("p", "detail-row");
  row.append(el("span", "detail-label", label));

  if (href) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = value;
    row.append(link);
  } else {
    row.append(document.createTextNode(value));
  }

  container.append(row);
  return true;
}

setText("[data-brand]", siteData.brand);
setText("[data-year]", new Date().getFullYear().toString());

document.querySelectorAll("[data-logo]").forEach((image) => {
  if (!hasText(siteData.logoPath)) return;

  image.src = siteData.logoPath;
  image.addEventListener(
    "load",
    () => {
      image.hidden = false;
    },
    { once: true }
  );
});

document.querySelectorAll("[data-hero-image]").forEach((image) => {
  const fallbackImage = hasText(siteData.fallbackHeroImage)
    ? siteData.fallbackHeroImage
    : image.getAttribute("src");

  if (hasText(siteData.heroImage)) {
    image.src = siteData.heroImage;
  }

  image.addEventListener(
    "error",
    () => {
      if (fallbackImage && image.src !== new URL(fallbackImage, window.location.href).href) {
        image.src = fallbackImage;
      }
    },
    { once: true }
  );
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = link.closest("details");
    if (menu) menu.open = false;
  });
});

const aboutTitle = document.querySelector("[data-about-title]");
if (aboutTitle && hasText(siteData.about?.title)) {
  aboutTitle.textContent = siteData.about.title;
}

const aboutCopy = document.querySelector("[data-about-copy]");
if (aboutCopy) {
  aboutCopy.textContent = hasText(siteData.about?.description)
    ? siteData.about.description
    : "Marka tanıtım metni eklenecek.";
}

const aboutStats = document.querySelector("[data-about-stats]");
if (aboutStats) {
  const stats = siteData.about?.stats?.filter((item) => hasText(item.value) && hasText(item.label)) ?? [];

  stats.forEach((item) => {
    const group = el("div", "stat-item");
    group.append(el("dt", "", item.value));
    group.append(el("dd", "", item.label));
    aboutStats.append(group);
  });
}

const productGroups = document.querySelector("[data-product-groups]");
if (productGroups) {
  const groups = siteData.productGroups?.filter((group) => hasText(group.name)) ?? [];

  groups.forEach((group) => {
    const article = el("article", "product-card");
    if (hasText(group.status)) {
      article.append(el("span", "status-pill", group.status));
    }
    article.append(el("h3", "", group.name));
    if (hasText(group.description)) {
      article.append(el("p", "", group.description));
    }
    productGroups.append(article);
  });
}

const branches = document.querySelector("[data-branches]");
if (branches) {
  siteData.branches.forEach((branch, index) => {
    const article = el("article", "branch-card");

    const media = el("figure", "branch-media");
    const placeholder = el("div", "branch-media-placeholder", "Şube görseli eklenecek");
    if (hasText(branch.image)) {
      const image = document.createElement("img");
      image.src = branch.image;
      image.alt = `${branch.name} şube görseli`;
      image.loading = "lazy";
      image.addEventListener(
        "error",
        () => {
          image.remove();
          media.append(placeholder);
        },
        { once: true }
      );
      media.append(image);
    } else {
      media.append(placeholder);
    }
    article.append(media);

    article.append(el("span", "branch-index", String(index + 1).padStart(2, "0")));

    const heading = el("h3", "", branch.name);
    article.append(heading);

    if (hasText(branch.status)) {
      article.append(el("span", "branch-status", branch.status));
    }

    const details = el("div", "branch-details");
    const hasAddress = addDetail(details, "Adres", branch.address);
    const hasPhone = addDetail(details, "Telefon", branch.phone, hasText(branch.phone) ? `tel:${cleanPhone(branch.phone)}` : "");
    const hasHours = addDetail(details, "Saat", branch.hours);

    if (hasText(branch.mapsUrl)) {
      addDetail(details, "Harita", "Google Haritalar", branch.mapsUrl);
    }

    if (hasAddress || hasPhone || hasHours || hasText(branch.mapsUrl)) {
      article.append(details);
    } else {
      article.append(el("p", "pending-copy", "Şube detayları eklenecek."));
    }

    if (branch.qrMenu) {
      const link = el("a", "branch-link", "QR menüye git");
      link.href = siteData.qrMenuPath;
      article.append(link);
    }

    branches.append(article);
  });
}

const contactDetails = document.querySelector("[data-contact-details]");
if (contactDetails) {
  contactDetails.append(el("h3", "", "İletişim"));
  const hasEmail = addDetail(
    contactDetails,
    "E-posta",
    siteData.contact.email,
    hasText(siteData.contact.email) ? `mailto:${siteData.contact.email}` : ""
  );
  const hasPhone = addDetail(
    contactDetails,
    "Telefon",
    siteData.contact.phone,
    hasText(siteData.contact.phone) ? `tel:${cleanPhone(siteData.contact.phone)}` : ""
  );
  const hasAddress = addDetail(contactDetails, "Adres", siteData.contact.address);

  if (!hasEmail && !hasPhone && !hasAddress) {
    contactDetails.append(el("p", "pending-copy", "İletişim bilgileri eklenecek."));
  }
}

const franchiseDetails = document.querySelector("[data-franchise-details]");
if (franchiseDetails) {
  franchiseDetails.append(el("h3", "", siteData.franchise.title || "Franchise"));

  if (hasText(siteData.franchise.description)) {
    franchiseDetails.append(el("p", "", siteData.franchise.description));
  }

  const hasEmail = addDetail(
    franchiseDetails,
    "E-posta",
    siteData.franchise.email,
    hasText(siteData.franchise.email) ? `mailto:${siteData.franchise.email}` : ""
  );
  const hasPhone = addDetail(
    franchiseDetails,
    "Telefon",
    siteData.franchise.phone,
    hasText(siteData.franchise.phone) ? `tel:${cleanPhone(siteData.franchise.phone)}` : ""
  );

  if (!hasText(siteData.franchise.description) && !hasEmail && !hasPhone) {
    franchiseDetails.append(el("p", "pending-copy", "Franchise bilgileri eklenecek."));
  }
}

const menuMeta = document.querySelector("[data-menu-meta]");
if (menuMeta) {
  const branch = hasText(siteData.menu.branchName) ? siteData.menu.branchName : siteData.brand;
  menuMeta.append(el("span", "", branch));

  if (hasText(siteData.menu.lastUpdated)) {
    menuMeta.append(el("span", "", `Güncelleme: ${siteData.menu.lastUpdated}`));
  }
}

const menuNav = document.querySelector("[data-menu-nav]");
const menu = document.querySelector("[data-menu]");
const menuSearch = document.querySelector("[data-menu-search]");
const menuCount = document.querySelector("[data-menu-count]");
const menuNoResults = document.querySelector("[data-menu-no-results]");

if (menu) {
  const allCategories = siteData.menu.categories?.filter((category) => hasText(category.name)) ?? [];
  const hasVisibleItems = allCategories.some((category) => category.items?.length);

  if (!allCategories.length) {
    allCategories.push({
      id: "hazirlaniyor",
      name: "Menü",
      description: "Ürün ve fiyat bilgileri eklendiğinde bu sayfa aynı QR bağlantısıyla güncellenecek.",
      pendingText: "Menü hazırlanıyor.",
      items: []
    });
  }

  if (menuNav) {
    menuNav.hidden = false;
    allCategories.forEach((category) => {
      const link = el("a", "", category.name);
      link.href = `#menu-${category.id}`;
      menuNav.append(link);
    });
  }

  if (!hasVisibleItems) {
    const notice = el("section", "empty-panel menu-notice");
    notice.append(el("p", "section-kicker", "YAKINDA"));
    notice.append(el("h2", "", "Cafe / Pastane menüsü hazırlanıyor."));
    notice.append(el("p", "", "Kategoriler hazır; ürün isimleri ve fiyatlar netleştiğinde bu sabit QR sayfasına eklenecek."));
    menu.append(notice);
  }

  allCategories.forEach((category) => {
    const section = el("section", `menu-category${category.items?.length ? "" : " menu-category-pending"}`);
    section.id = `menu-${category.id}`;
    section.dataset.searchText = [
      category.name,
      category.description,
      category.pendingText,
      ...(category.items || []).flatMap((product) => [
        product.name,
        product.description,
        product.price,
        product.unit,
        ...(product.badges || [])
      ])
    ]
      .filter(Boolean)
      .join(" ");
    section.append(el("h2", "", category.name));

    if (hasText(category.description)) {
      section.append(el("p", "menu-category-copy", category.description));
    }

    if (!category.items?.length) {
      const pending = el("div", "category-pending");
      pending.append(el("span", "", "Yakında"));
      pending.append(el("p", "", category.pendingText || "Ürünler ve fiyatlar eklenecek."));
      section.append(pending);
      menu.append(section);
      return;
    }

    const list = el("ul", "menu-items");
    category.items.forEach((product) => {
      if (!hasText(product.name)) return;

      const item = el("li", product.available === false ? "is-unavailable" : "");
      item.dataset.searchText = [
        product.name,
        product.description,
        product.price,
        product.unit,
        ...(product.badges || [])
      ]
        .filter(Boolean)
        .join(" ");
      const content = el("div", "menu-item-copy");
      content.append(el("strong", "", product.name));

      if (hasText(product.description)) {
        content.append(el("span", "", product.description));
      }

      if (Array.isArray(product.badges) && product.badges.length) {
        const badges = el("div", "menu-badges");
        product.badges.filter(hasText).forEach((badge) => badges.append(el("span", "", badge)));
        content.append(badges);
      }

      item.append(content);

      const priceBlock = el("div", "menu-price");
      if (product.available === false) {
        priceBlock.append(el("span", "sold-out", "Tükendi"));
      } else if (hasText(product.price)) {
        priceBlock.append(el("strong", "", product.price));
        if (hasText(product.unit)) {
          priceBlock.append(el("span", "", product.unit));
        }
      }

      item.append(priceBlock);
      list.append(item);
    });

    section.append(list);
    menu.append(section);
  });

  const sections = Array.from(menu.querySelectorAll(".menu-category"));
  const tabLinks = Array.from(menuNav?.querySelectorAll("a") || []);

  function updateMenuCount(visibleCategories, visibleItems, query) {
    if (!menuCount) return;

    if (query) {
      menuCount.textContent =
        visibleItems > 0
          ? `${visibleItems} ürün, ${visibleCategories} kategori bulundu.`
          : `${visibleCategories} kategori bulundu.`;
      return;
    }

    const itemCount = allCategories.reduce((total, category) => total + (category.items?.length || 0), 0);
    menuCount.textContent =
      itemCount > 0
        ? `${itemCount} ürün, ${allCategories.length} kategori`
        : `${allCategories.length} kategori hazır; ürünler yakında eklenecek.`;
  }

  function filterMenu() {
    const query = normalizeText(menuSearch?.value || "");
    let visibleCategories = 0;
    let visibleItems = 0;

    sections.forEach((section) => {
      const items = Array.from(section.querySelectorAll(".menu-items li"));
      const sectionMatches = normalizeText(section.dataset.searchText).includes(query);
      let matchingItems = 0;

      if (items.length) {
        items.forEach((item) => {
          const itemMatches = !query || normalizeText(item.dataset.searchText).includes(query);
          item.hidden = query ? !itemMatches : false;
          if (itemMatches) matchingItems += 1;
        });
      }

      const shouldShow = !query || sectionMatches || matchingItems > 0;
      section.hidden = !shouldShow;

      const tab = tabLinks.find((link) => link.getAttribute("href") === `#${section.id}`);
      if (tab) tab.hidden = !shouldShow;

      if (shouldShow) {
        visibleCategories += 1;
        visibleItems += items.length ? matchingItems : 0;
      }
    });

    if (menuNoResults) {
      menuNoResults.hidden = visibleCategories > 0;
    }

    updateMenuCount(visibleCategories, visibleItems, query);
  }

  menuSearch?.addEventListener("input", filterMenu);
  filterMenu();
}
