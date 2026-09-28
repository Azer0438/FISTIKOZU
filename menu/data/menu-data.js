import { siteData } from "../../data/site-data.js";

// Gerçek ürün ve kategoriler data/site-data.js içindeki menu alanından gelir.
export const menuData = {
  ...siteData.menu,
  settings: {
    defaultBranch: "cafe-pastane",
    unavailableMode: "hide"
  },
  // Şube kimliği -> { products: { ürünKimliği: { price, available, hidden } }, categories: { kategoriKimliği: { active } } }
  branchOverrides: {}
};
