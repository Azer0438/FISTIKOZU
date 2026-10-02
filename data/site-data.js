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
    description: "Fıstıközü, geleneksel tatları modern ve özenli bir sunum anlayışıyla buluşturur. Baklavadan bir araya gelmenin keyfine uzanan bu hikâyeyi, şubelerimizde ve Fıstıközü Erkilet Cafe / Pastane’de paylaşıyoruz."
  },

  branches: [
    {
      id: "organize", slug: "organize", name: "Fıstıközü Baklavaları Organize", label: "Organize", type: "bakery",
      description: "Fıstıközü Baklavaları Organize şubesi olarak Kayseri’de geleneksel lezzetleri özenle hazırlayıp misafirlerimizle buluşturuyoruz.",
      image: "/assets/images/sube-organize-gallery-03.jpg", imageAlt: "Fıstıközü Baklavaları Organize şubesi gece dış görünümü",
      imageWidth: 1254, imageHeight: 1254,
      images: [
        { src: "/assets/images/sube-organize-gallery-01.jpg", alt: "Fıstıközü Baklavaları Organize şubesi fırın ürünleri vitrini", width: 1254, height: 1254 },
        { src: "/assets/images/sube-organize-gallery-02.jpg", alt: "Fıstıközü Baklavaları Organize şubesi gündüz dış görünümü ve baklava sunumu", width: 1254, height: 1254 },
        { src: "/assets/images/sube-organize-gallery-03.jpg", alt: "Fıstıközü Baklavaları Organize şubesi gece dış görünümü", width: 1254, height: 1254 }
      ],
      address: {
        streetAddress: "Anbar Mahallesi 14. Cadde No: 12", postalCode: "38070",
        addressLocality: "Melikgazi", addressRegion: "Kayseri", addressCountry: "TR"
      },
      phone: "0507 957 25 15", mapsUrl: "https://maps.app.goo.gl/1Zt68nCuZwHn2f87A",
      mapEmbed: "https://www.google.com/maps?q=Anbar+Mahallesi+14.+Cadde+No%3A+12%2C+38070+Melikgazi%2FKayseri&output=embed",
      coordinates: null, workingHours: [], workingHoursText: "06:00 - 21:00", menuUrl: ""
    },
    {
      id: "sehir-hastanesi", slug: "sehir-hastanesi", name: "Fıstıközü Baklavaları Şehir Hastanesi", label: "Şehir Hastanesi", type: "bakery",
      description: "Fıstıközü Baklavaları Şehir Hastanesi Şubesi ile Kalitenin En TATLI Halini Sizlere Sunmaya Devam Ediyoruz.",
      image: "/assets/images/sube-sehir-hastanesi-hero.jpeg", imageAlt: "Fıstıközü Baklavaları Şehir Hastanesi şubesi dış görünümü",
      imageWidth: 1200, imageHeight: 1600,
      images: [
        { src: "/assets/images/sube-sehir-hastanesi-hero.jpeg", alt: "Fıstıközü Baklavaları Şehir Hastanesi şubesi dış görünümü", width: 1200, height: 1600 },
        { src: "/assets/images/sube-sehir-hastanesi-gallery-01.jpeg", alt: "Fıstıközü Baklavaları Şehir Hastanesi şubesi girişi", width: 1200, height: 1600 },
        { src: "/assets/images/sube-sehir-hastanesi-gece.jpg", alt: "Fıstıközü Baklavaları Şehir Hastanesi şubesinin gece görünümü", width: 941, height: 1672 }
      ],
      address: {
        streetAddress: "Şeker Mahallesi, Muhsin Yazıcıoğlu Bulvarı No: 76/76A",
        addressLocality: "Kocasinan", addressRegion: "Kayseri", addressCountry: "TR"
      },
      phone: "+90 545 218 38 08", phones: ["+90 545 218 38 08", "+90 543 846 96 09"],
      mapsUrl: "https://maps.app.goo.gl/FyUnLZM4ZekMNX1S7",
      mapEmbed: "https://www.google.com/maps?q=%C5%9Eeker+Mahallesi%2C+Muhsin+Yaz%C4%B1c%C4%B1o%C4%9Flu+Bulvar%C4%B1+No%3A+76%2F76A%2C+Kocasinan%2FKayseri&output=embed",
      coordinates: null, workingHours: [], workingHoursText: "05:30 - 00:00", menuUrl: ""
    },
    {
      id: "yeni-sanayi", slug: "yeni-sanayi", name: "Fıstıközü Baklavaları Yeni Sanayi", label: "Yeni Sanayi", type: "bakery",
      description: "Fıstıközü Baklavaları Yeni Sanayi Şubesi ile Kalitenin En TATLI Halini Sizlere Sunmaya Devam Ediyoruz.",
      image: "/assets/images/sube-yeni-sanayi-gece.jpg", imageAlt: "Fıstıközü Baklavaları Yeni Sanayi şubesi gece dış görünümü",
      imageWidth: 1254, imageHeight: 1254,
      images: [
        { src: "/assets/images/sube-yeni-sanayi-gece.jpg", alt: "Fıstıközü Baklavaları Yeni Sanayi şubesinin yağmurlu gece görünümü", width: 1254, height: 1254 }
      ],
      address: {
        streetAddress: "Şeker Mahallesi, 6180. Sokak, Yeni Sanayi Sitesi No: 1", postalCode: "38060",
        addressLocality: "Kocasinan", addressRegion: "Kayseri", addressCountry: "TR"
      },
      phone: "+90 507 957 25 15", phones: ["+90 507 957 25 15", "+90 553 305 38 11"],
      mapsUrl: "https://maps.app.goo.gl/JFM1i15UoFvT7i5z9",
      mapEmbed: "https://www.google.com/maps?q=%C5%9Eeker+Mahallesi%2C+6180.+Sokak%2C+Yeni+Sanayi+Sitesi+No%3A+1%2C+38060+Kocasinan%2FKayseri&output=embed",
      coordinates: null, workingHours: [], workingHoursText: "07:00 - 21:00", menuUrl: ""
    },
    {
      id: "cafe-pastane", slug: "cafe-pastane", name: "Fıstıközü Erkilet Cafe / Pastane", label: "Erkilet Cafe / Pastane", type: "cafe",
      description: "Fıstıközü Erkilet Cafe / Pastane, tatlı ve pastane lezzetlerini keyifli bir kafe deneyimiyle buluşturuyor. Kahve çeşitleri, sıcak ve soğuk içecekler, tatlılar ve özenle hazırlanan lezzetler eşliğinde günün her anında güzel bir mola için sizi bekliyoruz.",
      image: "", imageAlt: "", images: [],
      address: {
        streetAddress: "Erkilet Bulvarı, Osmangazi Mahallesi, İlkut Apartmanı Altı No: 556/A", postalCode: "38050",
        addressLocality: "Kocasinan", addressRegion: "Kayseri", addressCountry: "TR"
      },
      phone: "+90 507 957 25 15", phones: ["+90 507 957 25 15", "+90 553 305 38 11"],
      mapsUrl: "", mapEmbed: "", coordinates: null, workingHours: [], workingHoursText: "07:00 - 23:00",
      menuUrl: "/menu/", qrMenu: true
    }
  ],

  contact: { email: "", phone: "", address: null },
  socialLinks: [],

  // Yalnızca onaylanmış gerçek kategori ve ürünler eklenir. Şema README.md'de.
  menu: {
    title: "Menü", branchName: "Fıstıközü Erkilet Cafe / Pastane", currency: "TRY",
    categories: [],
    products: []
  }
};
