# Fıstıközü QR Menü

Normal adres: `/menu/`. Menü artık demo verisi kullanmaz. Eski `?demo=1` bağlantıları da aynı kataloğu açar; şube, masa ve kategori bilgileri korunur.

86 farklı ürün, 6 kategori. Ürünler ve 76 fiyat müşterinin son revizyonuna göre düzenlenmiştir. Fiyatı verilmeyen 10 ürün boş bırakılır. Mevcut içerik açıklamaları kullanıcının sağladığı ekranlardan, yeni ürün açıklamaları ise müşteri notlarından alınmıştır. Aktarım dökümü: [IMPORT-NOTES.md](IMPORT-NOTES.md).

## Tek İçerik Dosyası

**`menu/data/catalog.js`** içindeki `sections` dizisi kategori ve ürünlerin kaynağıdır. Ana sitenin `data/site-data.js` dosyası değiştirilmez; bu sayede QR ürünleri ana sayfanın mevcut tasarımını etkilemez.

Her kategorinin `id`, `name`, `icon`, isteğe bağlı `image`, `imageKind`, `active`, `branchIds` alanları ve `items` ürün listesi vardır. Kategori ve ürünlerin dizi sırası görüntüleme sırasını belirler. Bir kategoriyi gizlemek için `active: false` kullanılır.

Ürün nesnesi örneği (değerler şemadır):

```js
{
  id: "urun-kimligi",
  name: "Firmanın verdiği ürün adı",
  description: "",
  price: null,
  image: "",
  imageKind: "",
  ingredients: [],
  available: true
}
```

- Fiyat doğrulandığında `price` alanına sayısal tutar eklenir. `null` fiyatı gizler; `0` geçerli bir fiyat olarak gösterilir.
- İsteğe bağlı `description` kartta iki satır, detayda tam gösterilir.
- `ingredients` yalnızca doğrulanmış içerikleri taşıyan metin veya metin dizisidir.
- `available: false` bulunabilirlik ayarına göre gizlenir veya "Geçici olarak mevcut değil" olarak görünür.
- Fotoğraf yokken boş görsel alanı veya tekrar eden büyük logo gösterilmez. Ürün kompakt metin satırı, kategori ikonlu kart olur.
- Ürün ID'leri benzersiz olmalıdır. Aynı ürün başka kategoride tekrar kullanılacaksa yeni nesne yerine mevcut kimliği yazılır: `"limonata"`. Ürün nesnesi, ilk kullanıldığı kategoride tanımlanmalıdır.
- Çoklu kategori ilişkileri ve `categoryOrder` otomatik üretilir. Fiyat veya fotoğraf bir yerde değiştirildiğinde ürünün tüm kategorileri güncellenir. Global aramada aynı ürün bir kez görünür.

## Fotoğraf Ekleme

1. `GORSEL-LISTESI.csv` dosyasında ürünlerin ve kategorilerin önerilen dosya adları bulunur.
2. Gerçek dosyaları `menu/images/products/` veya `menu/images/categories/` altına koyun. PNG/JPEG dosyaları yayın öncesi WebP olarak optimize edilebilir.
3. İlgili ürünün `image` alanını `/menu/images/products/urun-kimligi.webp` olarak yazın.
4. AI ile üretilmiş görsellerde `imageKind: "generated"`, gerçek ürün çekiminde `imageKind: "photo"`, logo kullanımında `imageKind: "logo"` kullanın. Bu alan kaynak bilgisidir; ziyaretçiye rozet gösterilmez.

Dosya adı tek başına fotoğrafı etkinleştirmez; `image` yolu açıkça girilmelidir. Böylece henüz gelmemiş dosyalara istek atılmaz. Eklenmiş bir fotoğraf sonradan yüklenemezse logo yedeği devreye girer. Ürün görselleri lazy load edilir; sabit oranları yerleşim kaymasını önler.

## Şube Ayarları

`menu/data/menu-data.js` içindeki `settings.unavailableMode`:

- `"hide"`: mevcut olmayan ürünü gizler (varsayılan).
- `"show"`: mevcut olmayan ürünü açıklayıcı durum bilgisiyle gösterir.

Varsayılan şube Cafe / Pastane'dir. Diğer şubeler aynı kataloğu kullanır. Şube özel değişiklik örneği:

```js
branchOverrides: {
  organize: {
    products: { "urun-kimligi": { price: null, available: true, hidden: false } },
    categories: { "kategori-kimligi": { active: false } }
  }
}
```

Ürün/kategori nesnesine `branchIds: ["organize"]` eklenirse yalnızca belirtilen şubede görünür. `hidden: true` ürünü kesin gizler. Belirtilmeyen fiyat ortak kayıttan gelir; `price: null` yalnızca o şubede fiyatı gizler.

## Bağlantılar

- `/menu/`: ana menü.
- `/menu/#kategori/coffee`: kategoriye doğrudan bağlantı.
- `/menu/?branch=organize&table=12`: şube/masa bağlamı.
- Diğer şubeler: `sehir-hastanesi`, `yeni-sanayi`, `cafe-pastane`; `cafe` takma adı da kabul edilir.

Kategori geçişleri query parametrelerini korur. Tarayıcı geri/ileri, yenileme, arama ve hızlı kategori geçişi desteklenir. Masa yalnızca okunup doğrulanır; sipariş, sepet, üyelik veya ödeme yoktur. Fiziksel QR adresi `/menu/` olarak kalır.

## Kontroller

`npm start`: `http://localhost:4173/menu/`.

`npm test`: içerik, kategori ilişkileri, şube davranışları, fiyatlar, route ve syntax testleri.

`npm run check` ve `npm run build`: mevcut kontrol ve statik yayın yapısı. Yeni runtime bağımlılığı yoktur.
