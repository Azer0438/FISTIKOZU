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
      { id: "lotus-spoonful", name: "Lotus Spoonful", price: 220, description: "Lotus bisküvi, krema ve karamelize bisküvi sosu.", image: "/menu/images/products/pasta/lotus-spoonful-v2.webp", imageKind: "generated" },
      { id: "san-sebastian", name: "San Sebastian", price: 220, description: "Şefin özel tarifi.", image: "/menu/images/products/pasta/san-sebastian.webp", imageKind: "generated" },
      { id: "san-sebastian-sutlu-cikolata", name: "San Sebastian Sütlü Çikolata", price: 220, image: "/menu/images/products/pasta/san-sebastian-sutlu-cikolata.webp", imageKind: "generated" },
      { id: "orman-meyveli-cheesecake", name: "Orman Meyveli Cheesecake", price: 220, description: "Dilim olarak servis edilir.", image: "/menu/images/products/pasta/orman-meyveli-cheesecake.webp", imageKind: "generated" },
      { id: "ekstra-muz", name: "Ekstra Muz", price: 50, image: "/menu/images/products/pasta/ekstra-muz.webp", imageKind: "generated" },
      { id: "ekstra-cilek", name: "Ekstra Çilek", price: 50, image: "/menu/images/products/pasta/ekstra-cilek.webp", imageKind: "generated" },
      { id: "ekstra-cikolata", name: "Ekstra Çikolata", price: 50, image: "/assets/logo-original.jpg", imageKind: "logo" },
      { id: "dogum-gunu-pastasi", name: "Doğum Günü Pastası", image: "/menu/images/products/pasta/dogum-gunu-pastasi.webp", imageKind: "generated" },
      { id: "magnolya", name: "Magnolya", price: 220, description: "Pastacı kreması, bisküvi ve orman meyveleri.", image: "/menu/images/products/pasta/magnolya.webp", imageKind: "generated" },
      { id: "pavlova", name: "Pavlova", price: 220, description: "Beze rulo, çilek, orman meyveleri, krema ve Hindistan cevizi.", image: "/menu/images/products/pasta/pavlova.webp", imageKind: "generated" },
      { id: "profiterol", name: "Profiterol", price: 220, description: "Pastacı kreması dolgulu profiterol topları, çikolata sosu ve Antep fıstığı.", image: "/menu/images/products/pasta/profiterol.webp", imageKind: "generated" },
      { id: "budapeste", name: "Budapeşte", price: 220, description: "Fındık unu, çilek ve prenses kreması.", image: "/menu/images/products/pasta/budapeste.webp", imageKind: "generated" },
      { id: "frambuaz", name: "Frambuaz", price: 220, description: "Frambuaz, krema ve kakaolu katlarla hazırlanan pasta.", image: "/menu/images/products/pasta/frambuaz.webp", imageKind: "generated" },
      { id: "fransiz-ekler", name: "Fransız Ekler", price: 150, description: "Pastacı kreması dolgulu, çikolata kaplı ekler; Antep fıstığı ile.", image: "/menu/images/products/pasta/fransiz-ekler.webp", imageKind: "generated" },
      { id: "rulo-pasta-muzlu-cikolata", name: "Rulo Pasta Muzlu Çikolata", price: 220, description: "Muz ve çikolata." },
      { id: "cupta-cikolatali-spoonful", name: "Cupta Çikolatalı Spoonful", price: 150 },
      { id: "cupta-orman-meyveli-spoonful", name: "Cupta Orman Meyveli Spoonful", price: 150 },
      { id: "ruby-mono", name: "Ruby Mono", price: 220, description: "Ruby çikolata kaplama, krema, orman meyveleri ve Antep fıstığı.", image: "/menu/images/products/pasta/ruby-mono.webp", imageKind: "generated" }
    ]
  },
  {
    id: "coffee", name: "Sıcak İçecekler", icon: "coffee", items: [
      { id: "latte", name: "Latte", price: 150, description: "Espresso ve sıcak sütle hazırlanan yumuşak içimli kahve.", image: "/menu/images/products/coffee/latte.webp", imageKind: "generated" },
      { id: "filtre-kahve", name: "Filtre Kahve", price: 150, description: "Moccamaster ile demlenen sade filtre kahve.", image: "/menu/images/products/coffee/filtre-kahve.webp", imageKind: "generated" },
      { id: "sutlu-filtre", name: "Sütlü Filtre", price: 175, description: "Moccamaster ile demlenen filtre kahve ve süt.", image: "/menu/images/products/coffee/sutlu-filtre.webp", imageKind: "generated" },
      { id: "single-americano", name: "Single Americano", price: 150, description: "Tek shot espresso ve sıcak su.", image: "/menu/images/products/coffee/single-americano.webp", imageKind: "generated" },
      { id: "double-americano", name: "Double Americano", price: 175, description: "Çift shot espresso ve sıcak su.", image: "/menu/images/products/coffee/double-americano.webp", imageKind: "generated" },
      { id: "cappucino", name: "Cappuccino", price: 175, description: "Espresso, sıcak süt ve yoğun süt köpüğü.", image: "/menu/images/products/coffee/cappucino.webp", imageKind: "generated" },
      { id: "turk-kahvesi", name: "Türk Kahvesi", price: 100, description: "İnce öğütülmüş kahveyle geleneksel usulde hazırlanır.", image: "/menu/images/products/drinks/turk-kahvesi.webp", imageKind: "generated" },
      { id: "mocha", name: "Mocha", price: 175, description: "Espresso, süt ve çikolata.", image: "/menu/images/products/coffee/mocha.webp", imageKind: "generated" },
      { id: "white-chocolate-mocha", name: "White Chocolate Mocha", price: 175, description: "Espresso, süt ve beyaz çikolata.", image: "/menu/images/products/coffee/white-chocolate-mocha.webp", imageKind: "generated" },
      { id: "caramel-macchiato", name: "Caramel Macchiato", price: 200, description: "Espresso, süt ve karamel aroması.", image: "/menu/images/products/coffee/caramel-macchiato.webp", imageKind: "generated" },
      { id: "vanilya-latte", name: "Vanilya Latte", price: 175, description: "Espresso, süt ve vanilya aroması.", image: "/menu/images/products/coffee/vanilya-latte.webp", imageKind: "generated" },
      { id: "hazelnut-latte", name: "Hazelnut Latte", price: 175, description: "Espresso, süt ve fındık aroması.", image: "/menu/images/products/coffee/hazelnut-latte.webp", imageKind: "generated" },
      { id: "espresso", name: "Espresso", price: 175, description: "Yoğun gövdeli tek shot espresso.", image: "/menu/images/products/coffee/espresso.webp", imageKind: "generated" },
      { id: "ekstra-shot", name: "Ekstra Shot", price: 50, description: "Seçtiğiniz içeceğe eklenen tek shot espresso.", image: "/menu/images/products/coffee/ekstra-shot.webp", imageKind: "generated" },
      { id: "ekstra-aroma", name: "Ekstra Aroma", price: 50, image: "/assets/logo-original.jpg", imageKind: "logo" }
    ]
  },
  {
    id: "icecekler", name: "İçecekler", icon: "cup-soda", items: [
      { id: "su", name: "Su", price: 40, description: "Soğuk servis edilen şişe su.", image: "/menu/images/products/drinks/su.webp", imageKind: "generated" },
      { id: "cay", name: "Çay", price: 40, description: "Taze demlenmiş siyah çay.", image: "/menu/images/products/drinks/cay.webp", imageKind: "generated" },
      { id: "soda", name: "Soda", price: 60, description: "Doğal mineralli maden suyu.", image: "/menu/images/products/drinks/soda.webp", imageKind: "generated" },
      { id: "limonata", name: "Limonata", price: 150, description: "Limon ve taze nane aromalı ferahlatıcı içecek.", image: "/menu/images/products/drinks/limonata.webp", imageKind: "generated" },
      { id: "cola", name: "Cola", price: 100, description: "Soğuk servis edilen gazlı kola.", image: "/menu/images/products/drinks/cola.webp", imageKind: "generated" },
      { id: "fanta", name: "Fanta", price: 100, description: "Portakal aromalı gazlı içecek.", image: "/menu/images/products/drinks/fanta.webp", imageKind: "generated" },
      { id: "sprite", name: "Sprite", price: 80, description: "Limon ve lime aromalı gazlı içecek.", image: "/menu/images/products/drinks/soda.webp", imageKind: "generated" },
      { id: "churchill", name: "Churchill", price: 150, description: "Maden suyu, limon suyu ve tuz.", image: "/menu/images/products/drinks/churchill.webp", imageKind: "generated" },
      "turk-kahvesi",
      { id: "double-turk-kahvesi", name: "Double Türk Kahvesi", price: 150, description: "Çift ölçü kahveyle hazırlanan yoğun Türk kahvesi.", image: "/menu/images/products/drinks/double-turk-kahvesi.webp", imageKind: "generated" },
      { id: "salep", name: "Salep", price: 150, description: "Sütle hazırlanan, tarçınla servis edilen sıcak salep.", image: "/menu/images/products/drinks/salep.webp", imageKind: "generated" },
      { id: "fincan-cay", name: "Fincan Çay", price: 60, description: "Fincanda servis edilen taze demlenmiş siyah çay.", image: "/menu/images/products/drinks/fincan-cay.webp", imageKind: "generated" },
      { id: "sut", name: "Süt", price: 70, description: "Sade süt.", image: "/menu/images/products/drinks/sut.webp", imageKind: "generated" },
      { id: "portakal-suyu", name: "Portakal Suyu", price: 150, description: "Portakal aromalı ferahlatıcı meyve suyu.", image: "/menu/images/products/drinks/portakal-suyu.webp", imageKind: "generated" },
      { id: "red-bull", name: "Red Bull", price: 150, description: "Soğuk servis edilen enerji içeceği.", image: "/menu/images/products/drinks/red-bull.webp", imageKind: "generated" },
      { id: "sicak-cikolata", name: "Sıcak Çikolata", price: 150, description: "Süt ve çikolata ile hazırlanan sıcak içecek.", image: "/menu/images/products/drinks/sicak-cikolata.webp", imageKind: "generated" },
      { id: "mojito", name: "Mojito", price: 225, description: "Lime, taze nane ve soda.", image: "/menu/images/products/drinks/mojito.webp", imageKind: "generated" },
      { id: "cilekli-mojito", name: "Çilekli Mojito", price: 225, description: "Çilek, lime, taze nane ve soda.", image: "/menu/images/products/drinks/cilekli-mojito.webp", imageKind: "generated" },
      { id: "ayran", name: "Ayran", price: 60, description: "Yoğurt, su ve tuzla hazırlanan ferahlatıcı içecek.", image: "/menu/images/products/drinks/ayran.webp", imageKind: "generated" }
    ]
  },
  {
    id: "bitki-caylari", name: "Bitki Çayları", icon: "flower-2", items: [
      { id: "papatya-cayi", name: "Papatya Çayı", price: 120, description: "Papatya çiçekleriyle hazırlanan yumuşak içimli bitki çayı.", image: "/menu/images/products/herbal-tea/papatya-cayi.webp", imageKind: "generated" },
      { id: "yesil-cay", name: "Yeşil Çay", price: 120, description: "Yeşil çay yapraklarıyla hazırlanan hafif içimli çay; bal ile servis edilir.", image: "/menu/images/products/herbal-tea/yesil-cay.webp", imageKind: "generated" },
      { id: "kis-cayi", name: "Kış Çayı", price: 120, description: "Hibiskus, kuşburnu, portakal kabuğu, elma, karanfil, zencefil, limon, tarçın ve adaçayı.", image: "/menu/images/products/herbal-tea/kis-cayi.webp", imageKind: "generated" },
      { id: "nane-limon", name: "Nane Limon", price: 120, description: "Nane ve limonla hazırlanan ferahlatıcı bitki çayı.", image: "/menu/images/products/herbal-tea/nane-limon.webp", imageKind: "generated" },
      { id: "ihlamur", name: "Ihlamur", price: 120, description: "Ihlamur çiçekleriyle hazırlanan hafif içimli bitki çayı; bal ile servis edilir.", image: "/menu/images/products/herbal-tea/ihlamur.webp", imageKind: "generated" }
    ]
  },
  {
    id: "ice-coffee", name: "Soğuk Kahveler", icon: "glass-water", items: [
      { id: "ice-latte", name: "Ice Latte", price: 180, description: "Espresso, soğuk süt ve buz.", image: "/menu/images/products/cold-coffee/ice-latte.webp", imageKind: "generated" },
      { id: "ice-filtre-kahve", name: "Ice Filtre Kahve", price: 180, description: "Soğuk servis edilen filtre kahve ve buz.", image: "/menu/images/products/cold-coffee/ice-filtre-kahve.webp", imageKind: "generated" },
      { id: "ice-sutlu-filtre-kahve", name: "Ice Sütlü Filtre Kahve", price: 180, description: "Filtre kahve, soğuk süt ve buz.", image: "/menu/images/products/cold-coffee/ice-sutlu-filtre-kahve.webp", imageKind: "generated" },
      { id: "ice-single-americano", name: "Ice Single Americano", price: 180, description: "Tek shot espresso, soğuk su ve buz.", image: "/menu/images/products/cold-coffee/ice-single-americano.webp", imageKind: "generated" },
      { id: "ice-double-americano", name: "Ice Double Americano", price: 180, description: "Çift shot espresso, soğuk su ve buz.", image: "/menu/images/products/cold-coffee/ice-double-americano.webp", imageKind: "generated" },
      { id: "ice-mocha", name: "Ice Mocha", price: 180, description: "Espresso, soğuk süt, çikolata ve buz.", image: "/menu/images/products/cold-coffee/ice-mocha.webp", imageKind: "generated" },
      { id: "ice-white-chocolate-mocha", name: "Ice White Chocolate Mocha", price: 180, description: "Espresso, soğuk süt, beyaz çikolata ve buz.", image: "/menu/images/products/cold-coffee/ice-white-chocolate-mocha.webp", imageKind: "generated" },
      { id: "ice-vanilya-latte", name: "Ice Vanilya Latte", price: 180, description: "Espresso, soğuk süt, vanilya aroması ve buz.", image: "/menu/images/products/cold-coffee/ice-vanilya-latte.webp", imageKind: "generated" },
      { id: "ice-chai-tea-latte", name: "Ice Chai Tea Latte", price: 180, description: "Chai baharatları, soğuk süt ve buz.", image: "/menu/images/products/cold-coffee/ice-chai-tea-latte.webp", imageKind: "generated" }
    ]
  },
  {
    id: "kokteyl", name: "Kokteyl", icon: "martini", items: [
      { id: "green-apple-kokteyl", name: "Green Apple Kokteyl", price: 200, description: "Elma, limon ve nane.", image: "/menu/images/products/cocktails/green-apple-kokteyl.webp", imageKind: "generated" },
      { id: "kuzu-kulagi", name: "Kuzu Kulağı", price: 200, description: "Kuzu kulağı, limon ve taze nane.", image: "/menu/images/products/cocktails/kuzu-kulagi.webp", imageKind: "generated" },
      { id: "flamingo-milkshake", name: "Flamingo Milkshake Çilekli", price: 225, description: "Çilek ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/cocktails/flamingo-milkshake.webp", imageKind: "generated" },
      { id: "coko-coko-milkshake", name: "COKO Milkshake Çikolatalı", price: 225, description: "Çikolata ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/cocktails/coko-coko-milkshake.webp", imageKind: "generated" },
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
