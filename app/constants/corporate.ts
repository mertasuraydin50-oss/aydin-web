import {
  corporateRecords,
  findCorporate,
  toCorporateView
} from '~/content/load'

export interface CorporatePage {
  slug: string
  title: string
  badge: string
  description: string
  sections: { heading: string, body: string }[]
  layout?: string
}

export const corporatePages: CorporatePage[] = corporateRecords.map(record =>
  toCorporateView(record, 'tr')
)

export function getCorporatePage(slug: string) {
  const record = findCorporate(slug)
  return record ? toCorporateView(record, 'tr') : undefined
}
