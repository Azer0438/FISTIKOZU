export const siteData = {
  brand: "Fıstıközü Baklavaları",
  shortBrand: "Fıstıközü",
  domain: "www.fıstıközü.com.tr",
  logoPath: "/assets/logo-original.jpg",
  heroImage: "/assets/images/baklava-hero.png",
  fallbackHeroImage: "/assets/images/baklava-hero.png",
  qrMenuPath: "/menu/",

  about: {
    title: "Fıstıközü’nde tatlı, taze ve samimi bir karşılaşma.",
    description:
      "Fıstıközü Baklavaları; baklava, fırın, pasta ve tatlı lezzetlerini şubelerinde aynı özenle sunmayı hedefleyen yerel bir marka. Yeni Cafe / Pastane şubesiyle bu lezzetleri kahve ve sıcak bir oturma deneyimiyle bir araya getirmeye hazırlanıyor.",
    stats: [
      { value: "4", label: "şube başlığı" },
      { value: "QR", label: "sabit menü adresi" },
      { value: "TR", label: "mobil Türkçe yapı" }
    ]
  },

  productGroups: [
    {
      name: "Baklava",
      description: "Çeşitler, porsiyonlar ve kilo satış bilgileri eklenecek.",
      status: "Hazırlanıyor"
    },
    {
      name: "Tatlı & Pastane",
      description: "Cafe / Pastane şubesine ait ürün grupları burada listelenecek.",
      status: "Yakında"
    },
    {
      name: "Cafe İçecekleri",
      description: "Sıcak ve soğuk içecekler ürün bilgileri tamamlandığında görünecek.",
      status: "Yakında"
    }
  ],

  branches: [
    {
      name: "Fıstıközü Baklavaları Organize",
      status: "Şube",
      image: "",
      address: "",
      phone: "",
      hours: "",
      mapsUrl: ""
    },
    {
      name: "Fıstıközü Baklavaları Şehir Hastanesi",
      status: "Şube",
      image: "",
      address: "",
      phone: "",
      hours: "",
      mapsUrl: ""
    },
    {
      name: "Fıstıközü Baklavaları Yeni Sanayi",
      status: "Şube",
      image: "/assets/images/sube-yeni-sanayi.png",
      address: "",
      phone: "",
      hours: "",
      mapsUrl: ""
    },
    {
      name: "Fıstıközü Cafe / Pastane",
      status: "Yeni şube",
      image: "",
      address: "",
      phone: "",
      hours: "",
      mapsUrl: "",
      qrMenu: true
    }
  ],

  franchise: {
    title: "Franchise",
    description: "",
    email: "",
    phone: ""
  },

  contact: {
    email: "",
    phone: "",
    address: ""
  },

  menu: {
    title: "Cafe / Pastane QR Menü",
    branchName: "Fıstıközü Cafe / Pastane",
    lastUpdated: "",
    categories: [
      {
        id: "baklava",
        name: "Baklava",
        description: "Fıstıklı baklava çeşitleri ve porsiyon seçenekleri bu bölümde yer alacak.",
        pendingText: "Baklava ürünleri ve fiyatları eklenecek.",
        items: [
          {
            id: "fistikli-baklava",
            name: "Fıstıklı Baklava",
            description: "Porsiyon ve kilo seçenekleri netleştiğinde güncellenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "soguk-baklava",
            name: "Soğuk Baklava",
            description: "Servis bilgisi ve fiyatı eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "midye-baklava",
            name: "Midye Baklava",
            description: "Ürün detayı ve fiyatı eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          }
        ]
      },
      {
        id: "pastane",
        name: "Pastane",
        description: "Pasta, tatlı ve fırın ürünleri bu başlık altında listelenecek.",
        pendingText: "Pastane ürünleri hazırlanıyor.",
        items: [
          {
            id: "profiterol",
            name: "Profiterol",
            description: "Servis şekli ve fiyatı eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "magnolia",
            name: "Magnolia",
            description: "Çeşit ve fiyat bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "yas-pasta",
            name: "Yaş Pasta",
            description: "Dilim ve bütün pasta seçenekleri netleştiğinde güncellenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          }
        ]
      },
      {
        id: "kahve",
        name: "Kahveler",
        description: "Sıcak kahve seçenekleri menü netleştiğinde burada görünecek.",
        pendingText: "Kahve seçenekleri eklenecek.",
        items: [
          {
            id: "turk-kahvesi",
            name: "Türk Kahvesi",
            description: "Servis ve fiyat bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "latte",
            name: "Latte",
            description: "Boy ve fiyat bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "americano",
            name: "Americano",
            description: "Sıcak / soğuk servis bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          }
        ]
      },
      {
        id: "icecek",
        name: "İçecekler",
        description: "Soğuk içecekler ve diğer içecek grupları bu bölümde toplanacak.",
        pendingText: "İçecek listesi eklenecek.",
        items: [
          {
            id: "cay",
            name: "Çay",
            description: "Servis ve fiyat bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "limonata",
            name: "Limonata",
            description: "Çeşit ve fiyat bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          },
          {
            id: "soguk-kahve",
            name: "Soğuk Kahve",
            description: "Çeşit ve fiyat bilgisi eklenecek.",
            price: "",
            unit: "",
            badges: ["Fiyat eklenecek"],
            available: true
          }
        ]
      }
    ]
  }
};

/*
Menü ürünü ekleme örneği:

{
  id: "fistikli-baklava",
  name: "Fıstıklı Baklava",
  description: "Ürün açıklaması",
  price: "000 TL",
  unit: "porsiyon",
  badges: ["Yeni"],
  available: true
}

Adres, telefon, çalışma saati ve harita linki kesinleşmeden boş bırakılabilir.
*/
