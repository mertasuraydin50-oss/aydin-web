export type SearchKind = 'product' | 'category' | 'service' | 'blog' | 'page'

export interface SiteSearchItem {
  id: string
  kind: SearchKind
  title: string
  description: string
  to: string
  haystack: string
}

export function foldSearch(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .replaceAll('â', 'a')
    .replaceAll('î', 'i')
    .replaceAll('û', 'u')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function searchTokens(query: string) {
  return foldSearch(query).split(' ').filter(token => token.length > 0)
}

export function searchSite(items: SiteSearchItem[], query: string, limit = 8): SiteSearchItem[] {
  const tokens = searchTokens(query)
  if (!tokens.length) return []

  return items
    .map((item) => {
      const title = foldSearch(item.title)
      const hay = foldSearch(item.haystack)
      if (!tokens.every(token => hay.includes(token))) return null

      let score = 10
      if (tokens.every(token => title.includes(token))) score += 40
      if (tokens[0] && title.startsWith(tokens[0])) score += 20
      if (item.kind === 'product') score += 8
      if (item.kind === 'service') score += 6
      if (item.kind === 'category') score += 4
      return { item, score }
    })
    .filter((entry): entry is { item: SiteSearchItem, score: number } => Boolean(entry))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(entry => entry.item)
}
