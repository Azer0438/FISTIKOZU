// Kullanıcının onayladığı ürün adları, 1.png - 35.png referanslarından aktarılmıştır.
// Rakibin fiyatları, reçeteleri, kampanyaları ve fotoğrafları aktarılmaz.
// Ürün nesnesine price, description, image ve imageKind alanları sonradan eklenebilir.
// Metin kimlikleri, önceki kategoride tanımlanmış aynı ürünün tekrar kullanımıdır.
const sections = [
  {
    id: "pasta", name: "Pasta", icon: "cake-slice", items: [
      { id: "berry-bliss", name: "Berry Bliss" },
      { id: "tiramisu", name: "Tiramisu" },
      { id: "flan-raffaello", name: "Flan Raffaello" },
      { id: "tart", name: "Tart" },
      { id: "amerikan-brownie", name: "Amerikan Brownie" },
      { id: "citir-belcika-cikolatali-mono", name: "Çıtır Belçika Çikolatalı Mono" },
      { id: "fistikli-mono", name: "Fıstıklı Mono" },
      { id: "orman-meyveli-spoonful", name: "Orman Meyveli Spoonful" },
      { id: "sutlu-cikolata-spoonful", name: "Sütlü Çikolata Spoonful" },
      { id: "lotus-spoonful", name: "Lotus Spoonful" },
      { id: "san-sebastian", name: "San Sebastian" },
      { id: "san-sebastian-sutlu-cikolata", name: "San Sebastian Sütlü Çikolata" },
      { id: "orman-meyveli-cheesecake", name: "Orman Meyveli Cheesecake" },
      { id: "dondurmali-cookie", name: "Dondurmalı Cookie" },
      { id: "cikolatali-cookie-dondurmali", name: "Çikolatalı Cookie Dondurmalı" },
      { id: "ekstra-muz", name: "Ekstra Muz" },
      { id: "cikolatali-cookie", name: "Çikolatalı Cookie" },
      { id: "ekstra-cilek", name: "Ekstra Çilek" },
      { id: "ekstra-cikolata", name: "Ekstra Çikolata" },
      { id: "dogum-gunu-pastasi", name: "Doğum Günü Pastası" }
    ]
  },
  {
    id: "hamburger-menu", name: "Hamburger Menü", icon: "hamburger", items: [
      { id: "klasik-hamburger", name: "Klasik Hamburger" },
      { id: "relish-hamburger", name: "Relish Hamburger" },
      { id: "truf-hamburger", name: "Trüf Hamburger" },
      { id: "tavuk-truf-hamburger", name: "Tavuk Trüf Hamburger" },
      { id: "tavuk-klasik-hamburger", name: "Tavuk Klasik Hamburger" },
      { id: "tavuk-relish-hamburger", name: "Tavuk Relish Hamburger" },
      { id: "cocuk-et-menu", name: "Çocuk Et Menü" },
      { id: "cocuk-tavuk-menu", name: "Çocuk Tavuk Menü" },
      { id: "patates-kizartmasi", name: "Patates Kızartması" }
    ]
  },
  {
    id: "sweet-croissant", name: "Sweet Croissant", icon: "croissant", items: [
      { id: "nutella-kruvasan", name: "Nutella Kruvasan" },
      { id: "berry-milk", name: "Berry Milk" },
      { id: "badem-dolgulu-kruvasan", name: "Badem Dolgulu Kruvasan" },
      { id: "beyaz-cikolatali-kruvasan", name: "Beyaz Çikolatalı Kruvasan" },
      { id: "sutlu-cikolatali-kruvasan", name: "Sütlü Çikolatalı Kruvasan" },
      { id: "lotus-dolgulu-kruvasan", name: "Lotus Dolgulu Kruvasan" },
      { id: "cikolata-kremali-kruvasan", name: "Çikolata Kremalı Kruvasan" },
      { id: "rubyon", name: "RubyOn" },
      { id: "sweets", name: "Sweets" },
      { id: "trio", name: "Trio" },
      "ekstra-cikolata"
    ]
  },
  {
    id: "coffee", name: "Coffee", icon: "coffee", items: [
      { id: "latte", name: "Latte" },
      { id: "laktozsuz-latte", name: "Laktozsuz Latte" },
      { id: "filtre-kahve", name: "Filtre Kahve" },
      { id: "sutlu-filtre", name: "Sütlü Filtre" },
      { id: "single-americano", name: "Single Americano" },
      { id: "double-americano", name: "Double Americano" },
      { id: "flat-white", name: "Flat White" },
      { id: "cappucino", name: "Cappucino" },
      { id: "turk-kahvesi", name: "Türk Kahvesi" },
      { id: "mocha", name: "Mocha" },
      { id: "white-chocolate-mocha", name: "White Chocolate Mocha" },
      { id: "zebra-mocha", name: "Zebra Mocha" },
      { id: "berrywhite-latte", name: "BerryWhite Latte" },
      { id: "caramel-macchiato", name: "Caramel Macchiato" },
      { id: "irish-cream-macchiato", name: "Irish Cream Macchiato" },
      { id: "kis-lattesi", name: "Kış Lattesi" },
      { id: "vanilya-latte", name: "Vanilya Latte" },
      { id: "cookies-latte", name: "Cookies Latte" },
      { id: "hazelnut-latte", name: "Hazelnut Latte" },
      { id: "toffee-nut-latte", name: "Toffee Nut Latte" },
      { id: "chai-tea-latte", name: "Chai Tea Latte" },
      { id: "cortado", name: "Cortado" },
      { id: "espresso", name: "Espresso" },
      { id: "ekstra-shot", name: "Ekstra Shot" },
      { id: "ekstra-aroma", name: "Ekstra Aroma" },
      { id: "espresso-cekirdegi-1-kg", name: "1 kg Espresso çekirdeği" }
    ]
  },
  {
    id: "icecekler", name: "İçecekler", icon: "cup-soda", items: [
      { id: "su", name: "Su" },
      { id: "cay", name: "Çay" },
      { id: "soda", name: "Soda" },
      { id: "limonata", name: "Limonata" },
      { id: "cola", name: "Cola" },
      { id: "fanta", name: "Fanta" },
      { id: "sprite", name: "Sprite" },
      { id: "churchill", name: "Churchill" },
      "turk-kahvesi",
      { id: "double-turk-kahvesi", name: "Double Türk Kahvesi" },
      { id: "salep", name: "Salep" },
      { id: "fincan-cay", name: "Fincan Çay" },
      { id: "sut", name: "Süt" },
      { id: "portakal-suyu", name: "Portakal Suyu" },
      { id: "red-bull", name: "Red Bull" },
      { id: "sicak-cikolata", name: "Sıcak Çikolata" },
      { id: "mojito", name: "Mojito" },
      { id: "cilekli-mojito", name: "Çilekli Mojito" },
      { id: "ayran", name: "Ayran" }
    ]
  },
  {
    id: "matcha", name: "Matcha", icon: "leaf", items: [
      { id: "matcha-latte", name: "Matcha Latte" },
      { id: "caramel-matcha-latte", name: "Caramel Matcha Latte" },
      { id: "strawberry-matcha-latte", name: "Strawberry Matcha Latte" },
      { id: "raspberry-matcha-latte", name: "Raspberry Matcha Latte" },
      { id: "vanilya-matcha-latte", name: "Vanilya Matcha Latte" }
    ]
  },
  {
    id: "bitki-caylari", name: "Bitki Çayları", icon: "flower-2", items: [
      { id: "yesil-cay", name: "Yeşil Çay" },
      { id: "elma-tarcin", name: "Elma & Tarçın" },
      { id: "kirmizi-orman-meyveleri", name: "Kırmızı Orman Meyveleri" },
      { id: "kis-cayi", name: "Kış Çayı" },
      { id: "nane-limon", name: "Nane Limon" }
    ]
  },
  {
    id: "kahvalti", name: "Kahvaltı", icon: "utensils-crossed", items: [
      { id: "kruvasan", name: "Kruvasan" },
      { id: "ala-kahvalti", name: "Alâ Kahvaltı" },
      "nutella-kruvasan",
      { id: "sebzeli-omlet", name: "Sebzeli Omlet" },
      { id: "tulum-peynirli-omlet", name: "Tulum Peynirli Omlet" },
      { id: "kruvasan-dana-fume-sandvic", name: "Kruvasan Dana Füme Sandviç" },
      { id: "kruvasan-dana-jambon-sandvic", name: "Kruvasan Dana Jambon Sandviç" },
      "patates-kizartmasi",
      { id: "kruvasan-vejeteryan-sandvic", name: "Kruvasan Vejeteryan Sandviç" },
      { id: "tam-bugday-sandvic", name: "Tam Buğday Sandviç" }
    ]
  },
  {
    id: "ice-coffee", name: "Ice Coffee", icon: "glass-water", items: [
      { id: "ice-latte", name: "Ice Latte" },
      { id: "ice-latte-laktozsuz", name: "Ice Latte (Laktozsuz)" },
      { id: "ice-filtre-kahve", name: "Ice Filtre Kahve" },
      { id: "ice-sutlu-filtre-kahve", name: "Ice Sütlü Filtre Kahve" },
      { id: "ice-single-americano", name: "Ice Single Americano" },
      { id: "ice-double-americano", name: "Ice Double Americano" },
      { id: "ice-mocha", name: "Ice Mocha" },
      { id: "ice-white-chocolate-mocha", name: "Ice White Chocolate Mocha" },
      { id: "ice-zebra-mocha", name: "Zebra Mocha" },
      { id: "ice-berrywhite-latte", name: "Ice BerryWhite Latte" },
      { id: "ice-caramel-macchiato", name: "Ice Caramel Macchiato" },
      { id: "ice-cookies-latte", name: "Ice Cookies Latte" },
      { id: "ice-vanilya-latte", name: "Ice Vanilya Latte" },
      { id: "ice-irish-cream-macchiato", name: "Ice Irish Cream Macchiato" },
      { id: "ice-toffee-nut-latte", name: "Ice Toffee Nut Latte" },
      { id: "ice-chai-tea-latte", name: "Ice Chai Tea Latte" },
      { id: "ice-hazelnut-latte", name: "Ice Hazelnut Latte" }
    ]
  },
  {
    id: "kokteyl", name: "Kokteyl", icon: "martini", items: [
      { id: "green-apple-kokteyl", name: "Green Apple Kokteyl" },
      { id: "kuzu-kulagi", name: "Kuzu Kulağı" },
      { id: "passion", name: "Passion" },
      { id: "meyveli-soguk-cay", name: "Meyveli Soğuk Çay" },
      { id: "french-kiss", name: "French Kiss" },
      { id: "hawana-special", name: "Hawana Special" },
      { id: "kamikaze-redbull", name: "Kamikaze (RedBULL)" },
      { id: "daffy-duck-redbull", name: "Daffy Duck (RedBULL)" },
      { id: "apex-redbull", name: "Apex (RedBULL)" },
      { id: "flamingo-milkshake", name: "Flamingo Milkshake" },
      { id: "coko-coko-milkshake", name: "ÇOKO ÇOKO Milkshake" },
      { id: "berry-margarita", name: "Berry Margarita" },
      { id: "tropical-rush", name: "Tropical Rush" },
      "limonata",
      { id: "naneli-limonata", name: "Naneli Limonata" },
      { id: "cilekli-limonata", name: "Çilekli Limonata" },
      { id: "kuzukulakli-limonata", name: "Kuzukulaklı Limonata" },
      "mojito",
      "cilekli-mojito",
      { id: "yesil-elma-limonata", name: "Yeşil Elma Limonata" }
    ]
  }
];

// Paylaşılan ürünler tek kayıttır; her kategorideki özgün sıraları ayrıca korunur.
const byId = new Map();
export const categories = sections.map(({ items, ...category }, index) => {
  items.forEach((item, position) => {
    const shared = typeof item === "string";
    const product = shared ? byId.get(item) : {
      description: "", price: null, image: "", imageKind: "", available: true,
      order: byId.size + 1, ...item, categories: [], categoryOrder: {}
    };
    if (!product || (!shared && byId.has(product.id))) throw new Error(`Invalid menu product: ${shared ? item : item.id}`);
    product.categories.push(category.id);
    product.categoryOrder[category.id] = position + 1;
    byId.set(product.id, product);
  });
  return { image: "", active: true, order: index + 1, ...category };
});
export const products = [...byId.values()];
