#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const slideMap = JSON.parse(fs.readFileSync(path.join(root, 'public/images/presentation/slide-map.json'), 'utf8'))

/** Slayt numarası → ürün id listesi (sunum sırasına göre manuel eşleme) */
const SLIDE_TO_PRODUCTS = {
  10: ['proses-hat-makineleri'],
  12: ['separator-sistemleri'],
  13: ['separator-sistemleri'],
  15: ['proses-tanklari'],
  16: ['proses-tanklari'],
  23: ['etuv-uygulamalari'],
  27: ['endustriyel-karistiricilar'],
  28: ['endustriyel-karistiricilar'],
  29: ['endustriyel-karistiricilar'],
  30: ['homojenizatorler'],
  31: ['depolama-tanklari'],
  32: ['depolama-tanklari'],
  33: ['endustriyel-karistiricilar'],
  34: ['endustriyel-karistiricilar'],
  35: ['endustriyel-karistiricilar'],
  36: ['reaktorler'],
  37: ['endustriyel-karistiricilar'],
  38: ['reaktorler'],
  39: ['reaktorler'],
  40: ['reaktorler'],
  41: ['reaktorler'],
  42: ['reaktorler'],
  43: ['reaktorler'],
  44: ['endustriyel-karistiricilar'],
  45: ['depolama-tanklari'],
  46: ['depolama-tanklari'],
  47: ['depolama-tanklari'],
  48: ['depolama-tanklari'],
  49: ['karistiricili-tanklar'],
  50: ['karistiricili-tanklar'],
  51: ['karistiricili-tanklar'],
  52: ['proses-tanklari'],
  53: ['depolama-tanklari'],
  54: ['basincli-tanklar'],
  55: ['proses-hat-makineleri'],
  60: ['proses-hat-makineleri'],
  61: ['proses-hat-makineleri'],
  62: ['depolama-tanklari'],
  68: ['proses-hat-makineleri'],
  71: ['endustriyel-filtreler'],
  72: ['endustriyel-filtreler'],
  73: ['endustriyel-filtreler'],
  74: ['endustriyel-filtreler'],
  75: ['etuv-uygulamalari'],
  76: ['basincli-tanklar'],
  77: ['basincli-tanklar'],
  78: ['proses-hat-makineleri'],
  80: ['endustriyel-karistiricilar'],
  81: ['endustriyel-karistiricilar'],
  82: ['endustriyel-karistiricilar'],
  83: ['proses-hat-makineleri'],
  84: ['proses-hat-makineleri'],
  85: ['paketleme-sistemleri'],
  86: ['dolum-hatlari'],
  87: ['proses-hat-makineleri'],
  88: ['homojenizatorler'],
  89: ['homojenizatorler'],
  90: ['endustriyel-karistiricilar'],
  91: ['etuv-uygulamalari'],
  92: ['proses-hat-makineleri'],
  93: ['etuv-uygulamalari'],
  96: ['reaktorler']
}

const SLIDE_TO_GALLERY = {
  3: ['montaj'], 4: ['montaj'], 5: ['montaj'], 6: ['montaj'], 7: ['montaj'], 8: ['montaj'], 9: ['montaj'],
  10: ['montaj'], 11: ['montaj'], 12: ['montaj'], 13: ['montaj'],
  16: ['montaj'], 17: ['montaj'], 18: ['montaj'], 19: ['montaj'], 20: ['montaj'], 21: ['montaj'],
  22: ['montaj'], 23: ['montaj'], 24: ['montaj'], 25: ['montaj'],
  40: ['montaj'], 41: ['montaj'], 42: ['montaj'], 43: ['montaj'],
  54: ['montaj'], 55: ['uretim'], 56: ['montaj'], 57: ['montaj'], 58: ['montaj'], 59: ['montaj'],
  60: ['montaj'], 61: ['montaj'], 62: ['montaj'], 63: ['montaj'], 69: ['uretim'], 70: ['uretim'],
  78: ['uretim'], 82: ['uretim'], 83: ['uretim'], 87: ['montaj'], 92: ['uretim'], 97: ['montaj'],
  15: ['tank'], 31: ['tank'], 32: ['tank'], 45: ['tank'], 46: ['tank'], 47: ['tank'], 48: ['tank'],
  49: ['tank'], 50: ['tank'], 51: ['tank'], 52: ['tank'], 53: ['tank'], 75: ['tank'], 91: ['tank'],
  27: ['reaktor'], 28: ['reaktor'], 29: ['reaktor'], 30: ['reaktor'], 33: ['reaktor'], 34: ['reaktor'],
  35: ['reaktor'], 36: ['reaktor'], 37: ['reaktor'], 38: ['reaktor'], 39: ['reaktor'], 44: ['reaktor'],
  88: ['reaktor'], 89: ['reaktor'], 90: ['reaktor'], 96: ['uretim'],
  95: ['uretim'], 98: ['uretim'], 99: ['uretim'], 100: ['uretim'], 101: ['uretim'], 102: ['uretim'],
  103: ['uretim'], 104: ['uretim'], 105: ['uretim'], 106: ['uretim'], 107: ['uretim'], 108: ['uretim'],
  109: ['uretim'], 110: ['uretim'], 121: ['uretim']
}

const SLIDE_TO_SERVICES = {
  3: ['montaj-tesis-kurulumu'], 4: ['montaj-tesis-kurulumu'], 5: ['montaj-tesis-kurulumu'],
  6: ['montaj-tesis-kurulumu'], 7: ['montaj-tesis-kurulumu'], 8: ['montaj-tesis-kurulumu'],
  9: ['montaj-tesis-kurulumu'], 10: ['montaj-tesis-kurulumu'], 11: ['montaj-tesis-kurulumu'],
  16: ['montaj-tesis-kurulumu'], 17: ['otomasyon-proses-entegrasyonu'], 18: ['montaj-tesis-kurulumu'],
  19: ['montaj-tesis-kurulumu'], 20: ['montaj-tesis-kurulumu'], 21: ['montaj-tesis-kurulumu'],
  22: ['montaj-tesis-kurulumu'], 24: ['montaj-tesis-kurulumu'], 25: ['montaj-tesis-kurulumu'],
  40: ['montaj-tesis-kurulumu'], 41: ['bakim-servis'], 42: ['bakim-servis'], 43: ['bakim-servis'],
  54: ['montaj-tesis-kurulumu'], 55: ['uretim-imalat'], 56: ['montaj-tesis-kurulumu'],
  57: ['montaj-tesis-kurulumu'], 58: ['montaj-tesis-kurulumu'], 59: ['montaj-tesis-kurulumu'],
  62: ['montaj-tesis-kurulumu'], 63: ['montaj-tesis-kurulumu'], 69: ['uretim-imalat'],
  70: ['uretim-imalat'], 78: ['uretim-imalat'], 82: ['uretim-imalat'], 83: ['otomasyon-proses-entegrasyonu'],
  87: ['montaj-tesis-kurulumu'], 94: ['otomasyon-proses-entegrasyonu'], 97: ['otomasyon-proses-entegrasyonu'],
  95: ['proje-tasarim-muhendislik'], 96: ['proje-tasarim-muhendislik'],
  98: ['proje-tasarim-muhendislik'], 99: ['proje-tasarim-muhendislik'], 100: ['proje-tasarim-muhendislik'],
  101: ['proje-tasarim-muhendislik'], 102: ['proje-tasarim-muhendislik'], 103: ['proje-tasarim-muhendislik'],
  104: ['proje-tasarim-muhendislik'], 105: ['proje-tasarim-muhendislik'], 106: ['proje-tasarim-muhendislik'],
  107: ['proje-tasarim-muhendislik'], 108: ['proje-tasarim-muhendislik'], 109: ['proje-tasarim-muhendislik'],
  110: ['proje-tasarim-muhendislik'], 121: ['proje-tasarim-muhendislik']
}

const PRODUCT_HERO = {
  'proses-tanklari': '/images/presentation/curated/aydinox-062.jpg',
  'depolama-tanklari': '/images/presentation/curated/aydinox-056.png',
  'karistiricili-tanklar': '/images/presentation/curated/aydinox-058.png',
  'basincli-tanklar': '/images/presentation/curated/aydinox-064.png',
  'reaktorler': '/images/presentation/curated/aydinox-045.png',
  'endustriyel-karistiricilar': '/images/presentation/curated/aydinox-038.png',
  'homojenizatorler': '/images/presentation/curated/aydinox-111.png',
  'endustriyel-filtreler': '/images/presentation/curated/aydinox-084.png',
  'separator-sistemleri': '/images/presentation/curated/aydinox-018.jpg',
  'etuv-uygulamalari': '/images/presentation/curated/aydinox-118.png',
  'proses-hat-makineleri': '/images/presentation/curated/aydinox-110.png',
  'dolum-hatlari': '/images/presentation/curated/aydinox-108.png',
  'paketleme-sistemleri': '/images/presentation/curated/aydinox-107.png'
}

const SERVICE_HERO = {
  'montaj-tesis-kurulumu': '/images/presentation/curated/aydinox-057.png',
  'proje-tasarim-muhendislik': '/images/presentation/curated/aydinox-121.png',
  'uretim-imalat': '/images/presentation/curated/aydinox-082.png',
  'otomasyon-proses-entegrasyonu': '/images/presentation/curated/aydinox-026.png',
  'bakim-servis': '/images/presentation/curated/aydinox-051.png'
}

const PRODUCT_IDS = Object.keys(PRODUCT_HERO)
const SERVICE_IDS = Object.keys(SERVICE_HERO)
const GALLERY_IDS = ['tank', 'reaktor', 'montaj', 'uretim']

function srcFor(file) {
  return `/images/presentation/curated/${file}`
}

function cleanTitle(title) {
  return title
    .replace(/AYDI\s*NOX|AYDIN\s*OX/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 72)
}

const entries = []

for (const slide of slideMap) {
  const title = slide.title.replace(/\s+/g, ' ').trim()
  if (!slide.images.length || slide.slide === 111) continue

  for (const file of slide.images) {
    entries.push({
      file,
      src: srcFor(file),
      slide: slide.slide,
      title: cleanTitle(title),
      products: SLIDE_TO_PRODUCTS[slide.slide] ?? [],
      gallery: SLIDE_TO_GALLERY[slide.slide] ?? [],
      services: SLIDE_TO_SERVICES[slide.slide] ?? []
    })
  }
}

const productImages = Object.fromEntries(PRODUCT_IDS.map(id => [id, []]))
for (const entry of entries) {
  for (const id of entry.products) {
    if (!productImages[id].includes(entry.src)) {
      productImages[id].push(entry.src)
    }
  }
}
for (const [id, hero] of Object.entries(PRODUCT_HERO)) {
  const list = productImages[id] ?? []
  productImages[id] = [hero, ...list.filter(s => s !== hero)]
}

const galleryImages = Object.fromEntries(GALLERY_IDS.map(id => [id, []]))
for (const entry of entries) {
  if (entry.slide <= 2) continue
  for (const id of entry.gallery) {
    const bucket = galleryImages[id]
    if (!bucket.some(item => item.src === entry.src)) {
      bucket.push({ src: entry.src, title: entry.title, slide: entry.slide })
    }
  }
}

const serviceImages = Object.fromEntries(SERVICE_IDS.map(id => [id, []]))
for (const entry of entries) {
  if (entry.slide <= 2) continue
  for (const id of entry.services) {
    if (!serviceImages[id].includes(entry.src)) {
      serviceImages[id].push(entry.src)
    }
  }
}
for (const [id, hero] of Object.entries(SERVICE_HERO)) {
  const list = serviceImages[id] ?? []
  serviceImages[id] = [hero, ...list.filter(s => s !== hero)]
}

const bySlide = (n) => entries.find(e => e.slide === n)?.src

const catalog = {
  generatedAt: new Date().toISOString(),
  entries,
  productImages,
  productHero: PRODUCT_HERO,
  galleryImages,
  serviceImages,
  serviceHero: SERVICE_HERO,
  pageHero: {
    home: bySlide(1),
    about: bySlide(69),
    products: PRODUCT_HERO.reaktorler,
    services: SERVICE_HERO['montaj-tesis-kurulumu'],
    gallery: bySlide(18),
    blog: bySlide(17),
    faq: bySlide(36),
    quote: bySlide(54),
    contact: bySlide(18),
    teklif: bySlide(54),
    search: bySlide(17)
  },
  home: {
    hero: bySlide(1),
    corporate: bySlide(69),
    references: [
      PRODUCT_HERO['depolama-tanklari'],
      PRODUCT_HERO.reaktorler,
      SERVICE_HERO['montaj-tesis-kurulumu']
    ]
  },
  categoryHero: {
    'paslanmaz-celik-tanklar': PRODUCT_HERO['depolama-tanklari'],
    'reaktorler-karistiricilar': PRODUCT_HERO.reaktorler,
    'filtreler-etuv-sistemleri': PRODUCT_HERO['endustriyel-filtreler'],
    'ozel-tasarim-makineler': PRODUCT_HERO['dolum-hatlari']
  },
  corporateImages: {
    hakkimizda: bySlide(69),
    'misyon-vizyon': bySlide(18),
    'kalite-politikasi': bySlide(82),
    belgeler: bySlide(94),
    'insan-kaynaklari': bySlide(70),
    kvkk: bySlide(82)
  },
  documentImages: [
    bySlide(94),
    bySlide(82),
    bySlide(100)
  ].filter(Boolean),
  blogCovers: {
    'paslanmaz-celik-tank-secimi': PRODUCT_HERO['depolama-tanklari'],
    'hijyenik-proses-hatlari': bySlide(63),
    'reaktor-sistemlerinde-guvenlik': bySlide(39),
    'tse-standartlari-paslanmaz-celik': bySlide(82),
    'tesis-kurulumu-proje-yonetimi': bySlide(21),
    'kimya-sektorunde-proses-otomasyonu': bySlide(17)
  }
}

fs.writeFileSync(path.join(root, 'app/content/imageCatalog.json'), JSON.stringify(catalog, null, 2))
console.log('catalog entries:', entries.length)
for (const id of PRODUCT_IDS) {
  console.log(`  ${id}: ${productImages[id]?.length ?? 0} görsel`)
}
