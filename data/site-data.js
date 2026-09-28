export const siteData = {
  brand: "Fıstıközü Baklavaları",
  shortBrand: "Fıstıközü",
  domain: "www.fıstıközü.com.tr",
  canonicalBase: "https://www.fıstıközü.com.tr",
  logoPath: "/assets/logo-original.jpg",
  heroImage: "/assets/images/baklava-hero.webp",
  heroSrcset: "/assets/images/baklava-hero-720.webp 720w, /assets/images/baklava-hero-1200.webp 1200w, /assets/images/baklava-hero.webp 1672w",
  fallbackHeroImage: "/assets/images/baklava-hero.png",
  qrMenuPath: "/menu/",

  about: {
    title: "Geleneğin tadı, bugünün buluşması.",
    description: "Fıstıközü, geleneksel tatları modern ve özenli bir sunum anlayışıyla buluşturur. Baklavadan bir araya gelmenin keyfine uzanan bu hikâyeyi, şubelerimizde ve Fıstıközü Cafe / Pastane’de paylaşıyoruz."
  },

  branches: [
    {
      id: "organize", name: "Fıstıközü Baklavaları Organize", label: "Organize", type: "bakery",
      image: "", address: null, phone: "", mapsUrl: "", coordinates: null, workingHours: []
    },
    {
      id: "sehir-hastanesi", name: "Fıstıközü Baklavaları Şehir Hastanesi", label: "Şehir Hastanesi", type: "bakery",
      image: "", address: null, phone: "", mapsUrl: "", coordinates: null, workingHours: []
    },
    {
      id: "yeni-sanayi", name: "Fıstıközü Baklavaları Yeni Sanayi", label: "Yeni Sanayi", type: "bakery",
      image: "/assets/images/sube-yeni-sanayi.webp", imageWidth: 687, imageHeight: 1181,
      address: null, phone: "", mapsUrl: "", coordinates: null, workingHours: []
    },
    {
      id: "cafe-pastane", name: "Fıstıközü Cafe / Pastane", label: "Cafe / Pastane", type: "cafe",
      image: "", address: null, phone: "", mapsUrl: "", coordinates: null, workingHours: [], qrMenu: true
    }
  ],

  contact: { email: "", phone: "", address: null },
  socialLinks: [],

  // Yalnızca onaylanmış gerçek kategori ve ürünler eklenir. Şema README.md'de.
  menu: {
    title: "Menü", branchName: "Fıstıközü Cafe / Pastane", currency: "TRY",
    categories: [],
    products: []
  }
};
