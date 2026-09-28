import { siteData } from "../../data/site-data.js";
import { categories, products } from "./catalog.js";

// QR kataloğu bağımsızdır; ana sitenin ürün bölümünü değiştirmez.
export const menuData = {
  ...siteData.menu,
  categories,
  products,
  settings: {
    defaultBranch: "cafe-pastane",
    unavailableMode: "hide"
  },
  // Şube kimliği -> { products: { ürünKimliği: { price, available, hidden } }, categories: { kategoriKimliği: { active } } }
  branchOverrides: {}
};
