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
      { id: "rulo-pasta-muzlu-cikolata", name: "Rulo Pasta Muzlu Çikolata", price: 220, description: "Kakaolu rulo kek, muz, krema ve çikolata sosu.", image: "/menu/images/products/pasta/rulo-pasta-muzlu-cikolata.webp", imageKind: "generated" },
      { id: "cupta-cikolatali-spoonful", name: "Cupta Çikolatalı Spoonful", price: 150, description: "Kakaolu kek, çikolatalı krema ve çikolata parçaları.", image: "/menu/images/products/pasta/cupta-cikolatali-spoonful.webp", imageKind: "generated" },
      { id: "cupta-orman-meyveli-spoonful", name: "Cupta Orman Meyveli Spoonful", price: 150, description: "Kakaolu kek, krema ve orman meyveleri.", image: "/menu/images/products/pasta/cupta-orman-meyveli-spoonful.webp", imageKind: "generated" },
      { id: "ruby-mono", name: "Ruby Mono", price: 220, description: "Ruby çikolata kaplama, krema, orman meyveleri ve Antep fıstığı.", image: "/menu/images/products/pasta/ruby-mono.webp", imageKind: "generated" }
    ]
  },
  {
    id: "coffee", name: "Sıcak İçecekler", icon: "coffee", items: [
      { id: "latte", name: "Latte", price: 175, description: "Espresso ve sıcak sütle hazırlanan yumuşak içimli kahve.", image: "/menu/images/products/coffee/latte.webp", imageKind: "generated" },
      { id: "filtre-kahve", name: "Filtre Kahve", price: 150, description: "Moccamaster ile demlenen sade filtre kahve.", image: "/menu/images/products/coffee/filtre-kahve.webp", imageKind: "generated" },
      { id: "sutlu-filtre", name: "Sütlü Filtre", price: 175, description: "Moccamaster ile demlenen filtre kahve ve süt.", image: "/menu/images/products/coffee/sutlu-filtre.webp", imageKind: "generated" },
      { id: "double-americano", name: "Americano", price: 175, description: "Çift shot espresso ve sıcak su.", image: "/menu/images/products/coffee/double-americano.webp", imageKind: "generated" },
      { id: "cappucino", name: "Cappuccino", price: 220, description: "Espresso, sıcak süt ve yoğun süt köpüğü.", image: "/menu/images/products/coffee/cappucino.webp", imageKind: "generated" },
      { id: "turk-kahvesi", name: "Türk Kahvesi", price: 120, description: "İnce öğütülmüş kahveyle geleneksel usulde hazırlanır.", image: "/menu/images/products/drinks/turk-kahvesi.webp", imageKind: "generated" },
      { id: "mocha", name: "Mocha", price: 190, description: "Espresso, süt ve çikolata.", image: "/menu/images/products/coffee/mocha.webp", imageKind: "generated" },
      { id: "white-chocolate-mocha", name: "White Chocolate Mocha", price: 190, description: "Espresso, süt ve beyaz çikolata.", image: "/menu/images/products/coffee/white-chocolate-mocha.webp", imageKind: "generated" },
      { id: "hazelnut-latte", name: "Hazelnut Latte", price: 190, description: "Espresso, süt ve fındık aroması.", image: "/menu/images/products/coffee/hazelnut-latte.webp", imageKind: "generated" },
      { id: "espresso", name: "Espresso", price: 175, description: "Yoğun gövdeli tek shot espresso.", image: "/menu/images/products/coffee/espresso.webp", imageKind: "generated" },
      { id: "ekstra-shot", name: "Ekstra Shot", price: 50, description: "Seçtiğiniz içeceğe eklenen tek shot espresso.", image: "/menu/images/products/coffee/ekstra-shot.webp", imageKind: "generated" },
      { id: "ekstra-aroma", name: "Ekstra Aroma", price: 50, image: "/assets/logo-original.jpg", imageKind: "logo" },
      { id: "menengic", name: "Menengiç", price: 140, description: "Menengiç kahvesiyle hazırlanan yumuşak içimli sıcak içecek.", image: "/menu/images/products/coffee/menengic.webp", imageKind: "generated" },
      { id: "damla-sakizli-turk-kahvesi", name: "Damla Sakızlı Türk Kahvesi", price: 140, description: "Geleneksel Türk kahvesi ve damla sakızı aroması.", image: "/menu/images/products/coffee/damla-sakizli-turk-kahvesi.webp", imageKind: "generated" },
      { id: "sutlu-turk-kahvesi", name: "Sütlü Türk Kahvesi", price: 140, description: "Türk kahvesi ve sütle hazırlanan yumuşak içimli kahve.", image: "/menu/images/products/coffee/sutlu-turk-kahvesi.webp", imageKind: "generated" },
      { id: "cafe-milano", name: "Cafe Milano", price: 190, description: "Kahve, süt ve çikolata dokunuşuyla hazırlanan kremalı sıcak içecek.", image: "/menu/images/products/coffee/cafe-milano.webp", imageKind: "generated" },
      { id: "bal-badem-salep", name: "Bal Badem Salep", price: 165, description: "Sütlü salep, bal, badem ve tarçın.", image: "/menu/images/products/coffee/bal-badem-salep.webp", imageKind: "generated" },
      { id: "damla-sakizli-salep", name: "Damla Sakızlı Salep", price: 165, description: "Damla sakızı aromalı sütlü salep; tarçınla servis edilir.", image: "/menu/images/products/coffee/damla-sakizli-salep.webp", imageKind: "generated" },
      { id: "findikli-salep", name: "Fındıklı Salep", price: 165, description: "Fındık aromalı sıcak salep.", image: "/menu/images/products/coffee/findikli-salep.webp", imageKind: "generated" },
      { id: "antep-fistikli-salep", name: "Antep Fıstıklı Salep", price: 165, description: "Antep fıstığı aromalı sıcak salep.", image: "/menu/images/products/coffee/antep-fistikli-salep.webp", imageKind: "generated" },
      { id: "cilekli-sicak-cikolata", name: "Çilekli Sıcak Çikolata", price: 165, description: "Çilek aromalı sıcak çikolata.", image: "/menu/images/products/coffee/cilekli-sicak-cikolata.webp", imageKind: "generated" },
      { id: "frambuazli-sicak-cikolata", name: "Frambuazlı Sıcak Çikolata", price: 165, description: "Frambuaz aromalı sıcak çikolata.", image: "/menu/images/products/coffee/frambuazli-sicak-cikolata.webp", imageKind: "generated" },
      { id: "muzlu-sicak-cikolata", name: "Muzlu Sıcak Çikolata", price: 165, description: "Muz aromalı sıcak çikolata.", image: "/menu/images/products/coffee/muzlu-sicak-cikolata.webp", imageKind: "generated" },
      { id: "chai-tea-latte", name: "Chai Tea Latte", price: 165, description: "Chai baharatları ve sıcak sütle hazırlanan aromatik latte.", image: "/menu/images/products/coffee/chai-tea-latte.webp", imageKind: "generated" }
    ]
  },
  {
    id: "icecekler", name: "İçecekler", icon: "cup-soda", items: [
      { id: "su", name: "Su", price: 40, description: "Soğuk servis edilen şişe su.", image: "/menu/images/products/drinks/su.webp", imageKind: "generated" },
      { id: "cay", name: "Çay", price: 45, description: "Taze demlenmiş siyah çay.", image: "/menu/images/products/drinks/cay.webp", imageKind: "generated" },
      { id: "soda", name: "Soda", price: 60, description: "Doğal mineralli maden suyu.", image: "/menu/images/products/drinks/soda.webp", imageKind: "generated" },
      { id: "limonata", name: "Limonata", price: 150, description: "Limon ve taze nane aromalı ferahlatıcı içecek.", image: "/menu/images/products/drinks/limonata.webp", imageKind: "generated" },
      { id: "cola", name: "Cola", price: 100, description: "Soğuk servis edilen gazlı kola.", image: "/menu/images/products/drinks/cola.webp", imageKind: "generated" },
      { id: "fanta", name: "Fanta", price: 100, description: "Portakal aromalı gazlı içecek.", image: "/menu/images/products/drinks/fanta.webp", imageKind: "generated" },
      { id: "sprite", name: "Sprite", price: 80, description: "Limon ve lime aromalı gazlı içecek.", image: "/menu/images/products/drinks/soda.webp", imageKind: "generated" },
      { id: "churchill", name: "Churchill", price: 150, description: "Maden suyu, limon suyu ve tuz.", image: "/menu/images/products/drinks/churchill.webp", imageKind: "generated" },
      "turk-kahvesi",
      { id: "double-turk-kahvesi", name: "Double Türk Kahvesi", price: 150, description: "Çift ölçü kahveyle hazırlanan yoğun Türk kahvesi.", image: "/menu/images/products/drinks/double-turk-kahvesi.webp", imageKind: "generated" },
      { id: "salep", name: "Salep", price: 150, description: "Sütle hazırlanan, tarçınla servis edilen sıcak salep.", image: "/menu/images/products/drinks/salep.webp", imageKind: "generated" },
      { id: "fincan-cay", name: "Fincan Çay", price: 65, description: "Fincanda servis edilen taze demlenmiş siyah çay.", image: "/menu/images/products/drinks/fincan-cay.webp", imageKind: "generated" },
      { id: "sut", name: "Sıcak Süt", price: 90, description: "Sıcak servis edilen süt.", image: "/menu/images/products/drinks/sut.webp", imageKind: "generated" },
      { id: "portakal-suyu", name: "Portakal Suyu", price: 190, description: "Portakal aromalı ferahlatıcı meyve suyu.", image: "/menu/images/products/drinks/portakal-suyu.webp", imageKind: "generated" },
      { id: "red-bull", name: "Red Bull", price: 150, description: "Soğuk servis edilen enerji içeceği.", image: "/menu/images/products/drinks/red-bull.webp", imageKind: "generated" },
      { id: "sicak-cikolata", name: "Sıcak Çikolata", price: 150, description: "Süt ve çikolata ile hazırlanan sıcak içecek.", image: "/menu/images/products/drinks/sicak-cikolata.webp", imageKind: "generated" },
      { id: "ayran", name: "Ayran", price: 60, description: "Yoğurt, su ve tuzla hazırlanan ferahlatıcı içecek.", image: "/menu/images/products/drinks/ayran.webp", imageKind: "generated" }
    ]
  },
  {
    id: "bitki-caylari", name: "Bitki Çayları", icon: "flower-2", items: [
      { id: "papatya-cayi", name: "Papatya Çayı", price: 175, description: "Papatya çiçekleriyle hazırlanan yumuşak içimli bitki çayı.", image: "/menu/images/products/herbal-tea/papatya-cayi.webp", imageKind: "generated" },
      { id: "yesil-cay", name: "Yeşil Çay", price: 175, description: "Yeşil çay yapraklarıyla hazırlanan hafif içimli çay; bal ile servis edilir.", image: "/menu/images/products/herbal-tea/yesil-cay.webp", imageKind: "generated" },
      { id: "kis-cayi", name: "Kış Çayı", price: 175, description: "Hibiskus, kuşburnu, portakal kabuğu, elma, karanfil, zencefil, limon, tarçın ve adaçayı.", image: "/menu/images/products/herbal-tea/kis-cayi.webp", imageKind: "generated" },
      { id: "nane-limon", name: "Nane Limon", price: 175, description: "Nane ve limonla hazırlanan ferahlatıcı bitki çayı.", image: "/menu/images/products/herbal-tea/nane-limon.webp", imageKind: "generated" },
      { id: "ihlamur", name: "Ihlamur", price: 175, description: "Ihlamur çiçekleriyle hazırlanan hafif içimli bitki çayı; bal ile servis edilir.", image: "/menu/images/products/herbal-tea/ihlamur.webp", imageKind: "generated" },
      { id: "hibiscus-cayi", name: "Hibiscus Çayı", price: 175, description: "Hibiscus çiçekleriyle hazırlanan canlı renkli bitki çayı.", image: "/menu/images/products/herbal-tea/hibiscus-cayi.webp", imageKind: "generated" }
    ]
  },
  {
    id: "ice-coffee", name: "Soğuk Kahveler", icon: "glass-water", items: [
      { id: "ice-latte", name: "Ice Latte", price: 210, description: "Espresso, soğuk süt ve buz.", image: "/menu/images/products/cold-coffee/ice-latte.webp", imageKind: "generated" },
      { id: "ice-filtre-kahve", name: "Ice Filtre Kahve", price: 180, description: "Soğuk servis edilen filtre kahve ve buz.", image: "/menu/images/products/cold-coffee/ice-filtre-kahve.webp", imageKind: "generated" },
      { id: "ice-sutlu-filtre-kahve", name: "Ice Sütlü Filtre Kahve", price: 210, description: "Filtre kahve, soğuk süt ve buz.", image: "/menu/images/products/cold-coffee/ice-sutlu-filtre-kahve.webp", imageKind: "generated" },
      { id: "ice-double-americano", name: "Ice Americano", price: 200, description: "Çift shot espresso, soğuk su ve buz.", image: "/menu/images/products/cold-coffee/ice-double-americano.webp", imageKind: "generated" },
      { id: "ice-mocha", name: "Ice Mocha", price: 210, description: "Espresso, soğuk süt, çikolata ve buz.", image: "/menu/images/products/cold-coffee/ice-mocha.webp", imageKind: "generated" },
      { id: "ice-white-chocolate-mocha", name: "Ice White Chocolate Mocha", price: 210, description: "Espresso, soğuk süt, beyaz çikolata ve buz.", image: "/menu/images/products/cold-coffee/ice-white-chocolate-mocha.webp", imageKind: "generated" },
      { id: "ice-vanilya-latte", name: "Ice Vanilya Latte", price: 210, description: "Espresso, soğuk süt, vanilya aroması ve buz.", image: "/menu/images/products/cold-coffee/ice-vanilya-latte.webp", imageKind: "generated" },
      { id: "ice-milano", name: "Ice Milano", price: 210, description: "Espresso, soğuk süt, çikolata dokunuşu ve buz.", image: "/menu/images/products/cold-coffee/ice-milano.webp", imageKind: "generated" },
      { id: "ice-karamel-latte", name: "Ice Karamel Latte", price: 210, description: "Espresso, soğuk süt, karamel ve buz.", image: "/menu/images/products/cold-coffee/ice-karamel-latte.webp", imageKind: "generated" },
      { id: "ice-turk-kahvesi", name: "Ice Türk Kahvesi", price: 210, description: "Türk kahvesi, soğuk süt ve buz.", image: "/menu/images/products/cold-coffee/ice-turk-kahvesi.webp", imageKind: "generated" }
    ]
  },
  {
    id: "milkshake", name: "Milkshake", icon: "cup-soda", items: [
      { id: "milkshake-vanilya", name: "Vanilya", price: 225, description: "Vanilya ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-vanilya.webp", imageKind: "generated" },
      { id: "milkshake-karamel", name: "Karamel", price: 225, description: "Karamel ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-karamel.webp", imageKind: "generated" },
      { id: "milkshake-orman-meyve", name: "Orman Meyve", price: 225, description: "Orman meyveleri ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-orman-meyve.webp", imageKind: "generated" },
      { id: "flamingo-milkshake", name: "Flamingo Milkshake Çilekli", price: 225, description: "Çilek ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/milkshake/flamingo-milkshake.webp", imageKind: "generated" },
      { id: "coko-coko-milkshake", name: "COKO Milkshake Çikolatalı", price: 225, description: "Çikolata ve sütle hazırlanan kremalı milkshake.", image: "/menu/images/products/milkshake/coko-coko-milkshake.webp", imageKind: "generated" },
      { id: "milkshake-yesil-elma", name: "Yeşil Elma Milkshake", price: 225, description: "Yeşil elma aromalı kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-yesil-elma.webp", imageKind: "generated" },
      { id: "milkshake-frambuaz", name: "Frambuaz Milkshake", price: 225, description: "Frambuaz aromalı kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-frambuaz.webp", imageKind: "generated" },
      { id: "milkshake-mango", name: "Mango Milkshake", price: 225, description: "Mango aromalı kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-mango.webp", imageKind: "generated" },
      { id: "milkshake-muz", name: "Muz Milkshake", price: 225, description: "Muz aromalı kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-muz.webp", imageKind: "generated" },
      { id: "milkshake-bogurtlen", name: "Böğürtlen Milkshake", price: 225, description: "Böğürtlen aromalı kremalı milkshake.", image: "/menu/images/products/milkshake/milkshake-bogurtlen.webp", imageKind: "generated" }
    ]
  },
  {
    id: "frozen", name: "Frozen", icon: "glass-water", items: [
      { id: "frozen-cilek", name: "Çilek", price: 210, description: "Çilek ve kırılmış buzla hazırlanan ferahlatıcı frozen.", image: "/menu/images/products/frozen/frozen-cilek.webp", imageKind: "generated" },
      { id: "frozen-karpuz", name: "Karpuz", price: 210, description: "Karpuz ve kırılmış buzla hazırlanan ferahlatıcı frozen.", image: "/menu/images/products/frozen/frozen-karpuz.webp", imageKind: "generated" },
      { id: "frozen-kavun", name: "Kavun", price: 210, description: "Kavun ve kırılmış buzla hazırlanan ferahlatıcı frozen.", image: "/menu/images/products/frozen/frozen-kavun.webp", imageKind: "generated" },
      { id: "frozen-orman-meyve", name: "Orman Meyve", price: 210, description: "Orman meyveleri ve kırılmış buzla hazırlanan frozen.", image: "/menu/images/products/frozen/frozen-orman-meyve.webp", imageKind: "generated" },
      { id: "frozen-frambuaz", name: "Frambuaz", price: 210, description: "Frambuaz ve kırılmış buzla hazırlanan ferahlatıcı frozen.", image: "/menu/images/products/frozen/frozen-frambuaz.webp", imageKind: "generated" }
    ]
  },
  {
    id: "frappe", name: "Frappe", icon: "coffee", items: [
      { id: "frappe-cikolata", name: "Çikolata", price: 225, description: "Çikolata, süt ve buzla hazırlanan kremalı frappe.", image: "/menu/images/products/frappe/frappe-cikolata.webp", imageKind: "generated" },
      { id: "frappe-orman-meyve", name: "Orman Meyve", price: 225, description: "Orman meyveleri ve buzla hazırlanan yoğun kıvamlı frappe.", image: "/menu/images/products/frappe/frappe-orman-meyve.webp", imageKind: "generated" },
      { id: "frappe-karamel", name: "Karamel", price: 225, description: "Karamel, süt ve buzla hazırlanan kremalı frappe.", image: "/menu/images/products/frappe/frappe-karamel.webp", imageKind: "generated" },
      { id: "frappe-vanilya", name: "Vanilya", price: 225, description: "Vanilya, süt ve buzla hazırlanan kremalı frappe.", image: "/menu/images/products/frappe/frappe-vanilya.webp", imageKind: "generated" }
    ]
  },
  {
    id: "limonata", name: "Limonata", icon: "leaf", items: [
      { id: "limonata-kavunlu", name: "Kavunlu", price: 160, description: "Kavun, limon ve buzla hazırlanan ferahlatıcı limonata.", image: "/menu/images/products/limonata/limonata-kavunlu.webp", imageKind: "generated" },
      { id: "limonata-cilekli", name: "Çilekli", price: 160, description: "Çilek, limon ve buzla hazırlanan ferahlatıcı limonata.", image: "/menu/images/products/limonata/limonata-cilekli.webp", imageKind: "generated" },
      { id: "limonata-naneli", name: "Naneli", price: 160, description: "Taze nane, limon ve buzla hazırlanan ferahlatıcı limonata.", image: "/menu/images/products/limonata/limonata-naneli.webp", imageKind: "generated" },
      { id: "limonata-yesil-elmali", name: "Yeşil Elmalı Limonata", price: 160, description: "Yeşil elma aromalı ferahlatıcı limonata.", image: "/menu/images/products/limonata/limonata-yesil-elmali.webp", imageKind: "generated" }
    ]
  },
  {
    id: "kokteyl", name: "Kokteyl", icon: "martini", items: [
      "limonata",
      { id: "sakura", name: "Sakura", price: 175, description: "Sakura aroması, limon ve buzla hazırlanan ferahlatıcı kokteyl.", image: "/menu/images/products/cocktails/sakura.webp", imageKind: "generated" },
      { id: "turunc-bahcesi", name: "Turunç Bahçesi", price: 175, description: "Turunçgiller, taze nane ve buzla hazırlanan kokteyl.", image: "/menu/images/products/cocktails/turunc-bahcesi.webp", imageKind: "generated" },
      { id: "kirmizi-bahar", name: "Kırmızı Bahar", price: 175, description: "Kırmızı meyveler, limon ve taze naneyle hazırlanan kokteyl.", image: "/menu/images/products/cocktails/kirmizi-bahar.webp", imageKind: "generated" },
      { id: "blody-jack", name: "Blody Jack", price: 240, description: "Kırmızı meyveler, portakal ve taze naneyle hazırlanan kokteyl.", image: "/menu/images/products/cocktails/blody-jack.webp", imageKind: "generated" },
      { id: "cindirella", name: "Cindirella", price: 240, description: "Turunçgiller, ananas ve taze naneyle hazırlanan kokteyl.", image: "/menu/images/products/cocktails/cindirella.webp", imageKind: "generated" }
    ]
  }
];

// Paylaşılan ürünler tek kayıttır; her kategorideki özgün sıraları ayrıca korunur.
const menuCategoryOrder = [
  "pasta", "coffee", "ice-coffee", "bitki-caylari", "icecekler",
  "milkshake", "frozen", "frappe", "limonata", "kokteyl"
];
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
  const publishedPosition = menuCategoryOrder.indexOf(category.id);
  return { image: "", active: true, order: publishedPosition < 0 ? menuCategoryOrder.length + index + 1 : publishedPosition + 1, ...category };
}).sort((a, b) => a.order - b.order);
export const products = [...byId.values()];
