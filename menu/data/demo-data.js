// DEMO ONLY: Fıstıközü'nün gerçek ürün, kategori veya fiyat listesi değildir.
// Yalnızca /menu/?demo=1 önizlemesinde yüklenir.
const baklava = "/assets/images/baklava-hero-720.webp";
const cake = "/menu/images/demo-cake.webp";
const coffee = "/menu/images/demo-coffee.webp";
export const demoData = {
  currency: "TRY",
  settings: { defaultBranch: "cafe-pastane", unavailableMode: "show" },
  categories: [
    { id: "baklavalar", name: "Baklavalar", slug: "baklavalar", image: baklava, order: 1, active: true },
    { id: "pastane", name: "Pastane", slug: "pastane", image: cake, order: 2, active: true },
    { id: "kahveler", name: "Kahveler", slug: "kahveler", image: coffee, order: 3, active: true }
  ],
  products: [
    { id: "demo-baklava", name: "Fıstıklı Baklava", categories: ["baklavalar"], description: "İnce katlar, fıstık ve tatlı bir mola.", price: 240, image: baklava, available: true, order: 1 },
    { id: "demo-tadim", name: "Baklava Tabağı", categories: ["baklavalar"], description: "Paylaşmak için bir tatlı seçkisi.", price: 320, image: baklava, available: true, order: 2 },
    { id: "demo-pasta", name: "Çilekli Pasta", categories: ["pastane"], description: "Çilek, krema ve yumuşak kek katları.", price: 210, image: cake, available: true, order: 3 },
    { id: "demo-gunun", name: "Günün Tatlısı", categories: ["pastane"], description: "Günün tatlı molasına eşlik eden bir seçim.", price: null, image: cake, available: false, order: 4 },
    { id: "demo-latte", name: "Latte", categories: ["kahveler"], description: "Espresso ve süt köpüğünün yumuşak buluşması.", price: 150, image: coffee, available: true, order: 5 }
  ],
  branchOverrides: {}
};
