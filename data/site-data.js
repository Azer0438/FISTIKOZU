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
      id: "organize", slug: "organize", name: "Fıstıközü Baklavaları Organize", label: "Organize", type: "bakery",
      description: "Fıstıközü Baklavaları Organize şubesi olarak Kayseri’de geleneksel lezzetleri özenle hazırlayıp misafirlerimizle buluşturuyoruz.",
      image: "/assets/images/sube-organize-hero.webp", imageAlt: "Fıstıközü Baklavaları Organize şubesi dış görünümü",
      imageWidth: 1360, imageHeight: 612,
      images: [
        { src: "/assets/images/sube-organize-hero.webp", alt: "Fıstıközü Baklavaları Organize şubesi gece görünümü" },
        { src: "/assets/images/sube-organize-gallery-01.webp", alt: "Fıstıközü Baklavaları Organize şubesi girişi ve baklava sunumu" }
      ],
      address: {
        streetAddress: "Anbar Mahallesi 14. Cadde No: 12", postalCode: "38070",
        addressLocality: "Melikgazi", addressRegion: "Kayseri", addressCountry: "TR"
      },
      phone: "0507 957 25 15", mapsUrl: "https://share.google/d5Ox3Y7jgM3f1S6ij",
      mapEmbed: "https://www.google.com/maps?q=Anbar+Mahallesi+14.+Cadde+No%3A+12%2C+38070+Melikgazi%2FKayseri&output=embed",
      coordinates: null, workingHours: [], workingHoursText: "06:00 - 21:00", menuUrl: ""
    },
    {
      id: "sehir-hastanesi", slug: "sehir-hastanesi", name: "Fıstıközü Baklavaları Şehir Hastanesi", label: "Şehir Hastanesi", type: "bakery",
      description: "", image: "", imageAlt: "", images: [], address: null, phone: "",
      mapsUrl: "", mapEmbed: "", coordinates: null, workingHours: [], menuUrl: ""
    },
    {
      id: "yeni-sanayi", slug: "yeni-sanayi", name: "Fıstıközü Baklavaları Yeni Sanayi", label: "Yeni Sanayi", type: "bakery",
      description: "", image: "/assets/images/sube-yeni-sanayi.webp", imageAlt: "Fıstıközü Baklavaları Yeni Sanayi şubesi", images: [],
      imageWidth: 687, imageHeight: 1181, address: null, phone: "", mapsUrl: "", mapEmbed: "",
      coordinates: null, workingHours: [], menuUrl: ""
    },
    {
      id: "cafe-pastane", slug: "cafe-pastane", name: "Fıstıközü Cafe / Pastane", label: "Cafe / Pastane", type: "cafe",
      description: "", image: "", imageAlt: "", images: [], address: null, phone: "",
      mapsUrl: "", mapEmbed: "", coordinates: null, workingHours: [], menuUrl: "/menu/", qrMenu: true
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
