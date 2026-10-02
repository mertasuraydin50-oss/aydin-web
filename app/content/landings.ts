import prosesTanklari from './landings/products/proses-tanklari.json'
import depolamaTanklari from './landings/products/depolama-tanklari.json'
import karistiriciliTanklar from './landings/products/karistiricili-tanklar.json'
import basincliTanklar from './landings/products/basincli-tanklar.json'
import reaktorler from './landings/products/reaktorler.json'
import endustriyelKaristiricilar from './landings/products/endustriyel-karistiricilar.json'
import homojenizatorler from './landings/products/homojenizatorler.json'
import endustriyelFiltreler from './landings/products/endustriyel-filtreler.json'
import etuvUygulamalari from './landings/products/etuv-uygulamalari.json'
import separatorSistemleri from './landings/products/separator-sistemleri.json'
import prosesHatMakineleri from './landings/products/proses-hat-makineleri.json'
import dolumHatlari from './landings/products/dolum-hatlari.json'
import paketlemeSistemleri from './landings/products/paketleme-sistemleri.json'
import projeTasarim from './landings/services/proje-tasarim-muhendislik.json'
import uretimImalat from './landings/services/uretim-imalat.json'
import montajTesis from './landings/services/montaj-tesis-kurulumu.json'
import bakimServis from './landings/services/bakim-servis.json'
import otomasyon from './landings/services/otomasyon-proses-entegrasyonu.json'
import type { AppLocale } from '~/content/types'
import { pickLocale } from '~/content/types'

export type ProductLandingContent = {
  seoTitle: string
  seoDescription: string
  keywords: string[]
  heroDescription: string
  chips: string[]
  intro: string[]
  highlights: { icon: string, title: string, text: string }[]
  specs: string[][]
  usesTitle: string
  usesLead: string
  uses: { title: string, text: string }[]
  faqTitle: string
  faqLead: string
  faq: { q: string, a: string }[]
  specsTitle: string
  specsLead: string
}

export type ServiceLandingContent = {
  seoTitle: string
  seoDescription: string
  keywords: string[]
  h1: string
  asideLabel: string
  heroDescription: string
  chips: string[]
  intro: string[]
  highlights: { icon: string, title: string, text: string }[]
  processTitle: string
  processLead: string
  process: { title: string, text: string }[]
  includedTitle: string
  included: string[]
  faqTitle: string
  faqLead: string
  faq: { q: string, a: string }[]
}

type LandingRecord<T> = {
  id: string
  translations: Record<AppLocale, T>
}

const productLandings: LandingRecord<ProductLandingContent>[] = [
  prosesTanklari, depolamaTanklari, karistiriciliTanklar, basincliTanklar,
  reaktorler, endustriyelKaristiricilar, homojenizatorler,
  endustriyelFiltreler, etuvUygulamalari, separatorSistemleri,
  prosesHatMakineleri, dolumHatlari, paketlemeSistemleri
] as LandingRecord<ProductLandingContent>[]

const serviceLandings: LandingRecord<ServiceLandingContent>[] = [
  projeTasarim, uretimImalat, montajTesis, bakimServis, otomasyon
] as LandingRecord<ServiceLandingContent>[]

function asLocale(locale: string): AppLocale {
  return locale === 'en' ? 'en' : 'tr'
}

function findById<T extends { id: string }>(records: T[], slug: string) {
  return records.find(record => record.id === slug) ?? null
}

export function localizeProductLanding(slug: string, locale: string): ProductLandingContent | null {
  const record = findById(productLandings, slug)
  return record ? pickLocale(record.translations, asLocale(locale)) : null
}

export function localizeServiceLanding(slug: string, locale: string): ServiceLandingContent | null {
  const record = findById(serviceLandings, slug)
  return record ? pickLocale(record.translations, asLocale(locale)) : null
}

export function hasProductLanding(slug: string) {
  return Boolean(findById(productLandings, slug))
}

export function hasServiceLanding(slug: string) {
  return Boolean(findById(serviceLandings, slug))
}
