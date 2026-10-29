import { siteData } from "../../data/site-data.js";
import { categories, products } from "./catalog.js";

// QR kataloğu bağımsızdır; ana sitenin ürün bölümünü değiştirmez.
export const menuData = {
  ...siteData.menu,
  categories,
  products,
  settings: {
    defaultBranch: "cafe-pastane",
    unavailableMode: "hide",
    // Geçici bakım ekranını açmak için active değerini true yapın; katalog verileri korunur.
    maintenance: {
      active: false,
      title: "QR Menümüz Bakımda",
      message: "QR menümüz kısa süreli bir bakım çalışması nedeniyle geçici olarak kullanılamıyor.",
      note: "En kısa sürede yeniden hizmetinizdeyiz."
    }
  },
  // Şube kimliği -> { products: { ürünKimliği: { price, available, hidden } }, categories: { kategoriKimliği: { active } } }
  branchOverrides: {}
};
