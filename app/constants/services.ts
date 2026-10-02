import {
  findService,
  serviceRecords,
  toServiceView
} from '~/content/load'

export interface ServiceItem {
  label: string
  slug: string
  description: string
  icon: string
  body: string
  features: string[]
}

export const services: ServiceItem[] = serviceRecords.map(record =>
  toServiceView(record, 'tr')
)

export function servicePath(slug: string) {
  return `/hizmetler/${slug}`
}

export function getService(slug: string) {
  const record = findService(slug)
  return record ? toServiceView(record, 'tr') : undefined
}
