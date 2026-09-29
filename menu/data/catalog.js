// Ürünler, müşterinin son menü revizyonuna göre düzenlenmiştir.
// Açıklamalar yalnızca kullanıcının sağladığı menü ekranlarında görülen bilgilerden alınır.
// Metin kimlikleri, önceki kategoride tanımlanmış aynı ürünün tekrar kullanımıdır.
const sections = [
  {
    id: "pasta", name: "Pasta", icon: "cake-slice", items: [
      { id: "tiramisu", name: "Tiramisu", price: 200, description: "Mascarpone peyniri, kedi dili, espresso ve Fransız pastacı kreması.", image: "/menu/images/products/pasta/tiramisu.webp", imageKind: "generated" },
      { id: "flan-raffaello", name: "Flan Raffaello", price: 220, description: "Beyaz çikolatalı prenses kreması, Hindistan cevizi ve çikolata sos.", image: "/menu/images/products/pasta/flan-raffaello.webp", imageKind: "generated" },
      { id: "tart", name: "Tart", price: 220, description: "Badem ile yoğrulmuş tart, pastacı kreması ve kırmızı meyveler.", image: "/menu/images/products/pasta/tart.webp", imageKind: "generated" },
      { id: "amerikan-brownie", name: "Amerikan Brownie", price: 200, description: "Sütlü Belçika çikolatası ve vanilyalı dondurma ile servis edilir.", image: "/menu/images/products/pasta/amerikan-brownie.webp", imageKind: "generated" },
      { id: "citir-belcika-cikolatali-mono", name: "Çıtır Belçika Çikolatalı Mono", price: 220, description: "Moelleux kek, pastacı kreması, çikolata sos, fındıklı çikolata kaplama ve mevsim meyveleri.", image: "/menu/images/products/pasta/citir-belcika-cikolatali-mono.webp", imageKind: "generated" },
      { id: "fistikli-mono", name: "Fıstıklı Mono", price: 220, description: "İç dolgusunda sütlü Belçika çikolatası, dış kısmında fıstıklı kaplama.", image: "/menu/images/products/pasta/fistikli-mono.webp", imageKind: "generated" },
      { id: "orman-meyveli-spoonful", name: "Orman Meyveli Spoonful", price: 220, description: "Böğürtlen, frambuaz, yaban mersini ve orman meyveleri.", image: "/menu/images/products/pasta/orman-meyveli-spoonful.webp", imageKind: "generated" },
      { id: "sutlu-cikolata-spoonful", name: "Sütlü Çikolata Spoonful", price: 220, image: "/menu/images/products/pasta/sutlu-cikolata-spoonful.webp", imageKind: "generated" },
      { id: "lotus-spoonful", name: "Lotus Spoonful", price: 220, image: "/menu/images/products/pasta/lotus-spoonful.webp", imageKind: "generated" },
      { id: "san-sebastian", name: "San Sebastian", price: 220, description: "Şefin özel tarifi.", image: "/menu/images/products/pasta/san-sebastian.webp", imageKind: "generated" },
      { id: "san-sebastian-sutlu-cikolata", name: "San Sebastian Sütlü Çikolata", price: 220, image: "/menu/images/products/pasta/san-sebastian-sutlu-cikolata.webp", imageKind: "generated" },
      { id: "orman-meyveli-cheesecake", name: "Orman Meyveli Cheesecake", price: 220, description: "Dilim olarak servis edilir.", image: "/menu/images/products/pasta/orman-meyveli-cheesecake.webp", imageKind: "generated" },
      { id: "ekstra-muz", name: "Ekstra Muz", price: 50, image: "/menu/images/products/pasta/ekstra-muz.webp", imageKind: "generated" },
      { id: "ekstra-cilek", name: "Ekstra Çilek", price: 50, image: "/menu/images/products/pasta/ekstra-cilek.webp", imageKind: "generated" },
      { id: "ekstra-cikolata", name: "Ekstra Çikolata", price: 50, image: "/assets/logo-original.jpg", imageKind: "logo" },
      { id: "dogum-gunu-pastasi", name: "Doğum Günü Pastası", image: "/menu/images/products/pasta/dogum-gunu-pastasi.webp", imageKind: "generated" },
      { id: "magnolya", name: "Magnolya", price: 220 },
      { id: "pavlova", name: "Pavlova", price: 220, description: "Çilek, orman meyveleri ve Hindistan cevizi." },
      { id: "profiterol", name: "Profiterol", price: 220 },
      { id: "budapeste", name: "Budapeşte", price: 220, description: "Fındık unu, çilek ve prenses kreması." },
      { id: "frambuaz", name: "Frambuaz", price: 220 },
      { id: "fransiz-ekler", name: "Fransız Ekler", price: 150 },
      { id: "rulo-pasta-muzlu-cikolata", name: "Rulo Pasta Muzlu Çikolata", price: 220, description: "Muz ve çikolata." },
      { id: "cupta-cikolatali-spoonful", name: "Cupta Çikolatalı Spoonful", price: 150 },
      { id: "cupta-orman-meyveli-spoonful", name: "Cupta Orman Meyveli Spoonful", price: 150 },
      { id: "ruby-mono", name: "Ruby Mono", price: 220 }
    ]
  },
  {
    id: "coffee", name: "Sıcak İçecekler", icon: "coffee", items: [
      { id: "latte", name: "Latte", price: 150 },
      { id: "filtre-kahve", name: "Filtre Kahve", price: 150, description: "Moccamaster." },
      { id: "sutlu-filtre", name: "Sütlü Filtre", price: 175, description: "Moccamaster." },
      { id: "single-americano", name: "Single Americano", price: 150 },
      { id: "double-americano", name: "Double Americano", price: 175 },
      { id: "cappucino", name: "Cappucino", price: 175 },
      { id: "turk-kahvesi", name: "Türk Kahvesi", price: 100 },
      { id: "mocha", name: "Mocha", price: 175 },
      { id: "white-chocolate-mocha", name: "White Chocolate Mocha", price: 175 },
      { id: "caramel-macchiato", name: "Caramel Macchiato", price: 200 },
      { id: "vanilya-latte", name: "Vanilya Latte", price: 175 },
      { id: "hazelnut-latte", name: "Hazelnut Latte", price: 175 },
      { id: "espresso", name: "Espresso", price: 175 },
      { id: "ekstra-shot", name: "Ekstra Shot", price: 50 },
      { id: "ekstra-aroma", name: "Ekstra Aroma", price: 50 }
    ]
  },
  {
    id: "icecekler", name: "İçecekler", icon: "cup-soda", items: [
      { id: "su", name: "Su", price: 40 },
      { id: "cay", name: "Çay", price: 40 },
      { id: "soda", name: "Soda", price: 60 },
      { id: "limonata", name: "Limonata", price: 150 },
      { id: "cola", name: "Cola", price: 100 },
      { id: "fanta", name: "Fanta", price: 100 },
      { id: "sprite", name: "Sprite", price: 80 },
      { id: "churchill", name: "Churchill", price: 150 },
      "turk-kahvesi",
      { id: "double-turk-kahvesi", name: "Double Türk Kahvesi", price: 150 },
      { id: "salep", name: "Salep", price: 150, description: "Tarçın ile servis edilir." },
      { id: "fincan-cay", name: "Fincan Çay", price: 60 },
      { id: "sut", name: "Süt", price: 70 },
      { id: "portakal-suyu", name: "Portakal Suyu", price: 150 },
      { id: "red-bull", name: "Red Bull", price: 150 },
      { id: "sicak-cikolata", name: "Sıcak Çikolata", price: 150 },
      { id: "mojito", name: "Mojito", price: 225 },
      { id: "cilekli-mojito", name: "Çilekli Mojito", price: 225 },
      { id: "ayran", name: "Ayran", price: 60 }
    ]
  },
  {
    id: "bitki-caylari", name: "Bitki Çayları", icon: "flower-2", items: [
      { id: "papatya-cayi", name: "Papatya Çayı", price: 120 },
      { id: "yesil-cay", name: "Yeşil Çay", price: 120, description: "Bal ile servis edilir." },
      { id: "kis-cayi", name: "Kış Çayı", price: 120, description: "Hibiskus, kuşburnu, portakal kabuğu, elma, karanfil, zencefil, limon, tarçın ve adaçayı." },
      { id: "nane-limon", name: "Nane Limon", price: 120 },
      { id: "ihlamur", name: "Ihlamur", price: 120 }
    ]
  },
  {
    id: "ice-coffee", name: "Soğuk Kahveler", icon: "glass-water", items: [
      { id: "ice-latte", name: "Ice Latte", price: 180 },
      { id: "ice-filtre-kahve", name: "Ice Filtre Kahve", price: 180 },
      { id: "ice-sutlu-filtre-kahve", name: "Ice Sütlü Filtre Kahve", price: 180 },
      { id: "ice-single-americano", name: "Ice Single Americano", price: 180 },
      { id: "ice-double-americano", name: "Ice Double Americano", price: 180 },
      { id: "ice-mocha", name: "Ice Mocha", price: 180 },
      { id: "ice-white-chocolate-mocha", name: "Ice White Chocolate Mocha", price: 180 },
      { id: "ice-vanilya-latte", name: "Ice Vanilya Latte", price: 180 },
      { id: "ice-chai-tea-latte", name: "Ice Chai Tea Latte", price: 180 }
    ]
  },
  {
    id: "kokteyl", name: "Kokteyl", icon: "martini", items: [
      { id: "green-apple-kokteyl", name: "Green Apple Kokteyl", price: 200, description: "Elma, limon ve nane." },
      { id: "kuzu-kulagi", name: "Kuzu Kulağı", price: 200 },
      { id: "passion", name: "Passion", description: "Mango, şeftali, limon ve portakal." },
      { id: "meyveli-soguk-cay", name: "Meyveli Soğuk Çay", description: "Elma, çilek, portakal suyu ve gül reyhanı." },
      { id: "french-kiss", name: "French Kiss", description: "Yeşil elma, limon, turunçgiller ve nane." },
      { id: "hawana-special", name: "Hawana Special", description: "Kavun, turunçgiller, limon ve ananas." },
      { id: "kamikaze-redbull", name: "Kamikaze (RedBULL)", description: "Kivi, limon, ananas, nane ve Red Bull." },
      { id: "daffy-duck-redbull", name: "Daffy Duck (RedBULL)", description: "Kavun, frambuaz, limon, portakal, nane ve Red Bull." },
      { id: "apex-redbull", name: "Apex (RedBULL)", description: "Mango, ananas, kavun, limon ve Red Bull." },
      { id: "flamingo-milkshake", name: "Flamingo Milkshake Çilekli", price: 225 },
      { id: "coko-coko-milkshake", name: "COKO COKO Milkshake Çikolatalı", price: 225 },
      { id: "berry-margarita", name: "Berry Margarita", description: "Karadut, frambuaz ve nar." },
      { id: "tropical-rush", name: "Tropical Rush", description: "Mango, ananas, limon, vanilya, nane ve soda." },
      "limonata",
      "mojito",
      "cilekli-mojito"
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
