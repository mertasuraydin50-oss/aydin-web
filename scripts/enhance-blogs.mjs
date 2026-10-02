import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const blogDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'app/content/blog')

const enhancements = {
  'paslanmaz-celik-tank-secimi': {
    tr: {
      seoTitle: 'Paslanmaz Çelik Tank Seçimi | Aydınox',
      keywords: ['paslanmaz çelik tank', 'tank seçimi', '316L', 'proses tankı'],
      tags: ['Tank', 'PaslanmazÇelik', 'Rehber'],
      faq: [
        { q: '316L mi 304 mü tercih edilmeli?', a: 'Gıda ve ilaç uygulamalarında 316L, genel proses uygulamalarında 304 tercih edilir.' },
        { q: 'Tank kapasitesi nasıl hesaplanır?', a: 'Üretim hattı kapasitesi, depolama süresi ve proses akış hızı birlikte değerlendirilir.' }
      ],
      body: `## Tank Seçiminde Temel Kriterler

Tank seçiminde proses sıcaklığı, basınç, hijyen gereksinimleri ve kapasite birlikte değerlendirilmelidir. Doğru malzeme seçimi hem üretim güvenliğini hem de bakım maliyetlerini doğrudan etkiler.

## Malzeme Seçimi

| Uygulama | Malzeme | Açıklama |
| --- | --- | --- |
| Gıda / İlaç | 316L | Korozyon direnci yüksek, hijyenik |
| Genel Proses | 304 | Ekonomik, genel amaçlı |
| Kimya | Proje bazlı | Proses koşullarına göre |

## Kapasite ve Tasarım

- Üretim hattı kapasitesi ile uyumlu hacim planlanmalı
- CIP uyumu ve minimum ölü hacim dikkate alınmalı
- Basınç gereksinimleri tasarım aşamasında belirlenmeli

Aydınox olarak tüm tank projelerimizde TSE standartlarına uygun üretim ve kalite kontrol süreçleri uygulanır.`
    },
    en: {
      seoTitle: 'Stainless Steel Tank Selection | Aydınox',
      keywords: ['stainless steel tank', 'tank selection', '316L', 'process tank'],
      tags: ['Tank', 'StainlessSteel', 'Guide'],
      faq: [
        { q: 'Should 316L or 304 be preferred?', a: '316L is preferred for food and pharmaceutical applications, 304 for general process applications.' },
        { q: 'How is tank capacity calculated?', a: 'Production line capacity, storage duration and process flow rate are evaluated together.' }
      ],
      body: `## Key Criteria in Tank Selection

Process temperature, pressure, hygiene requirements and capacity should be evaluated together in tank selection. Correct material selection directly affects both production safety and maintenance costs.

## Material Selection

| Application | Material | Description |
| --- | --- | --- |
| Food / Pharma | 316L | High corrosion resistance, hygienic |
| General Process | 304 | Economical, general purpose |
| Chemical | Project-based | According to process conditions |

## Capacity and Design

- Volume should be planned compatible with production line capacity
- CIP compatibility and minimum dead volume should be considered
- Pressure requirements should be determined at design stage

At Aydınox, TSE standard production and quality control processes are applied in all our tank projects.`
    }
  }
}

for (const file of readdirSync(blogDir).filter(f => f.endsWith('.json'))) {
  const path = join(blogDir, file)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  const id = data.id
  const enhancement = enhancements[id]

  if (enhancement) {
    data.translations.tr = { ...data.translations.tr, ...enhancement.tr }
    data.translations.en = { ...data.translations.en, ...enhancement.en }
  } else {
    for (const loc of ['tr', 'en']) {
      const copy = data.translations[loc]
      if (typeof copy.body === 'object' && Array.isArray(copy.body)) {
        copy.body = copy.body.join('\n\n')
      }
      if (!copy.seoTitle) copy.seoTitle = `${copy.title} | Aydınox`
      if (!copy.keywords) copy.keywords = [copy.category, 'Aydınox']
      if (!copy.tags) copy.tags = [copy.category]
      if (!copy.faq) {
        copy.faq = [{
          q: loc === 'tr' ? 'Teklif almak için ne yapmalıyım?' : 'What should I do to get a quote?',
          a: loc === 'tr' ? 'İletişim formu veya telefon ile bize ulaşabilirsiniz.' : 'You can reach us via contact form or phone.'
        }]
      }
    }
  }

  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
}

console.log('Blog posts enhanced.')
