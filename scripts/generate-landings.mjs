import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'app/content')

const catalog = JSON.parse(readFileSync(join(contentDir, 'catalog.json'), 'utf8'))
const services = JSON.parse(readFileSync(join(contentDir, 'services.json'), 'utf8'))

const productDir = join(contentDir, 'landings/products')
const serviceDir = join(contentDir, 'landings/services')
mkdirSync(productDir, { recursive: true })
mkdirSync(serviceDir, { recursive: true })

function productLanding(product, category) {
  const tr = product.translations.tr
  const en = product.translations.en
  const catTr = category.translations.tr
  const catEn = category.translations.en

  return {
    id: product.id,
    translations: {
      tr: {
        seoTitle: `${tr.label} | Aydınox`,
        seoDescription: tr.description,
        keywords: [tr.label, catTr.label, 'paslanmaz çelik', 'Aydınox'],
        heroDescription: tr.description,
        chips: tr.features?.slice(0, 4) ?? ['TSE uyumu', 'Paslanmaz çelik', 'Projeye özel', 'Hijyenik tasarım'],
        intro: [tr.body ?? tr.description, `${catTr.label} kategorisinde ${tr.label.toLowerCase()} çözümlerimiz gıda, ilaç, kimya ve kozmetik sektörlerine uygun olarak tasarlanır.`],
        highlights: (tr.features ?? []).slice(0, 4).map((f, i) => ({
          icon: ['lucide:shield-check', 'lucide:settings', 'lucide:factory', 'lucide:badge-check'][i] ?? 'lucide:check',
          title: f,
          text: `${tr.label} projelerinde ${f.toLowerCase()} standartlarımızın temelidir.`
        })),
        specs: [
          ['Malzeme', 'Paslanmaz çelik (304/316L)'],
          ['Standart', 'TSE / sektörel hijyen gereksinimleri'],
          ['Kapasite', 'Projeye özel'],
          ['Kategori', catTr.label],
          ['Uygulama', 'Gıda, ilaç, kimya, kozmetik']
        ],
        usesTitle: 'Kullanım Alanları',
        usesLead: `${tr.label} hangi proseslerde tercih edilir?`,
        uses: [
          { title: 'Gıda Sanayi', text: 'Hijyenik proses hatlarında depolama ve üretim uygulamaları.' },
          { title: 'İlaç Sanayi', text: 'GMP uyumlu steril proses ve depolama sistemleri.' },
          { title: 'Kimya Sanayi', text: 'Kimyasal reaksiyon ve depolama prosesleri.' }
        ],
        faqTitle: 'Sık Sorulan Sorular',
        faqLead: `${tr.label} hakkında merak edilenler.`,
        faq: [
          { q: `${tr.label} için hangi malzeme kullanılır?`, a: 'Proses koşullarına göre 304 veya 316L paslanmaz çelik tercih edilir. Gıda ve ilaç uygulamalarında genellikle 316L önerilir.' },
          { q: 'Teslim süresi ne kadardır?', a: 'Kapasite ve proje karmaşıklığına göre değişir. Teklif aşamasında net teslim takvimi paylaşılır.' },
          { q: 'Montaj hizmeti veriyor musunuz?', a: 'Evet. Üretim, saha montajı, tesisat kurulumu ve devreye alma hizmetlerini uçtan uca sunuyoruz.' }
        ],
        specsTitle: 'Teknik Özellikler',
        specsLead: `${tr.label} temel teknik parametreleri.`
      },
      en: {
        seoTitle: `${en.label} | Aydınox`,
        seoDescription: en.description,
        keywords: [en.label, catEn.label, 'stainless steel', 'Aydınox'],
        heroDescription: en.description,
        chips: en.features?.slice(0, 4) ?? ['TSE compliance', 'Stainless steel', 'Custom design', 'Hygienic design'],
        intro: [en.body ?? en.description, `Our ${en.label.toLowerCase()} solutions in the ${catEn.label} category are designed for food, pharmaceutical, chemical and cosmetic industries.`],
        highlights: (en.features ?? []).slice(0, 4).map((f, i) => ({
          icon: ['lucide:shield-check', 'lucide:settings', 'lucide:factory', 'lucide:badge-check'][i] ?? 'lucide:check',
          title: f,
          text: `${f} is a cornerstone of our standards in ${en.label} projects.`
        })),
        specs: [
          ['Material', 'Stainless steel (304/316L)'],
          ['Standard', 'TSE / industry hygiene requirements'],
          ['Capacity', 'Project-specific'],
          ['Category', catEn.label],
          ['Application', 'Food, pharma, chemical, cosmetic']
        ],
        usesTitle: 'Application Areas',
        usesLead: `Where is ${en.label} preferred?`,
        uses: [
          { title: 'Food Industry', text: 'Storage and production applications in hygienic process lines.' },
          { title: 'Pharmaceutical Industry', text: 'GMP-compliant sterile process and storage systems.' },
          { title: 'Chemical Industry', text: 'Chemical reaction and storage processes.' }
        ],
        faqTitle: 'Frequently Asked Questions',
        faqLead: `Common questions about ${en.label}.`,
        faq: [
          { q: `What material is used for ${en.label}?`, a: '304 or 316L stainless steel is selected based on process conditions. 316L is generally recommended for food and pharmaceutical applications.' },
          { q: 'What is the delivery time?', a: 'It varies depending on capacity and project complexity. A clear delivery schedule is shared during the quote phase.' },
          { q: 'Do you provide assembly services?', a: 'Yes. We offer end-to-end production, on-site assembly, piping installation and commissioning services.' }
        ],
        specsTitle: 'Technical Specifications',
        specsLead: `${en.label} key technical parameters.`
      }
    }
  }
}

function serviceLanding(service) {
  const tr = service.translations.tr
  const en = service.translations.en

  return {
    id: service.id,
    translations: {
      tr: {
        seoTitle: `${tr.label} | Aydınox`,
        seoDescription: tr.description,
        keywords: [tr.label, 'Aydınox', 'proses ekipmanı'],
        h1: tr.label,
        asideLabel: 'Hizmet Detayı',
        heroDescription: tr.description,
        chips: tr.features?.slice(0, 4) ?? [],
        intro: [tr.body, 'Aydınox olarak proses ekipmanı ve tesis kurulum projelerinde uçtan uca hizmet sunuyoruz.'],
        highlights: (tr.features ?? []).map((f, i) => ({
          icon: ['lucide:drafting-compass', 'lucide:factory', 'lucide:hard-hat', 'lucide:wrench', 'lucide:cpu'][i] ?? 'lucide:check',
          title: f,
          text: `${f} kapsamında deneyimli ekibimizle hizmet veriyoruz.`
        })),
        processTitle: 'Süreç Nasıl İlerler?',
        processLead: 'Projelerimizde izlediğimiz standart adımlar.',
        process: [
          { title: 'Keşif ve Analiz', text: 'Proses ihtiyaçları, kapasite ve saha koşulları değerlendirilir.' },
          { title: 'Tasarım ve Planlama', text: 'Teknik çizim, kapasite hesabı ve proje planı hazırlanır.' },
          { title: 'Üretim / Uygulama', text: 'Atölye üretimi veya saha uygulaması gerçekleştirilir.' },
          { title: 'Devreye Alma', text: 'Test, kalite kontrol ve teslim süreci tamamlanır.' }
        ],
        includedTitle: 'Hizmet Kapsamı',
        included: tr.features ?? [],
        faqTitle: 'Sık Sorulan Sorular',
        faqLead: `${tr.label} hakkında merak edilenler.`,
        faq: [
          { q: `${tr.label} için nasıl teklif alabilirim?`, a: 'İletişim formu veya telefon ile bize ulaşabilirsiniz. Proje detaylarını paylaştıktan sonra teknik ekibimiz teklif hazırlar.' },
          { q: 'Hangi sektörlere hizmet veriyorsunuz?', a: 'Gıda, ilaç, kimya ve kozmetik sektörlerine proses ekipmanı ve tesis kurulum hizmetleri sunuyoruz.' }
        ]
      },
      en: {
        seoTitle: `${en.label} | Aydınox`,
        seoDescription: en.description,
        keywords: [en.label, 'Aydınox', 'process equipment'],
        h1: en.label,
        asideLabel: 'Service Detail',
        heroDescription: en.description,
        chips: en.features?.slice(0, 4) ?? [],
        intro: [en.body, 'At Aydınox, we provide end-to-end services in process equipment and plant installation projects.'],
        highlights: (en.features ?? []).map((f, i) => ({
          icon: ['lucide:drafting-compass', 'lucide:factory', 'lucide:hard-hat', 'lucide:wrench', 'lucide:cpu'][i] ?? 'lucide:check',
          title: f,
          text: `We serve with our experienced team in ${f}.`
        })),
        processTitle: 'How Does the Process Work?',
        processLead: 'Standard steps we follow in our projects.',
        process: [
          { title: 'Survey and Analysis', text: 'Process requirements, capacity and site conditions are evaluated.' },
          { title: 'Design and Planning', text: 'Technical drawings, capacity calculation and project plan are prepared.' },
          { title: 'Production / Application', text: 'Workshop production or on-site application is carried out.' },
          { title: 'Commissioning', text: 'Testing, quality control and delivery process is completed.' }
        ],
        includedTitle: 'Service Scope',
        included: en.features ?? [],
        faqTitle: 'Frequently Asked Questions',
        faqLead: `Common questions about ${en.label}.`,
        faq: [
          { q: `How can I get a quote for ${en.label}?`, a: 'You can reach us via the contact form or phone. Our technical team prepares a quote after you share project details.' },
          { q: 'Which industries do you serve?', a: 'We provide process equipment and plant installation services to food, pharmaceutical, chemical and cosmetic industries.' }
        ]
      }
    }
  }
}

for (const category of catalog) {
  for (const product of category.products) {
    writeFileSync(
      join(productDir, `${product.id}.json`),
      JSON.stringify(productLanding(product, category), null, 2) + '\n'
    )
  }
}

for (const service of services) {
  writeFileSync(
    join(serviceDir, `${service.id}.json`),
    JSON.stringify(serviceLanding(service), null, 2) + '\n'
  )
}

console.log(`Generated ${catalog.flatMap(c => c.products).length} product and ${services.length} service landings.`)
