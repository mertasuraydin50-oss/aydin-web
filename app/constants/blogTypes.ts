export type BlogBlock =
  | { type: 'h2', text: string }
  | { type: 'h3', text: string }
  | { type: 'p', text: string }
  | { type: 'ul', items: string[] }
  | { type: 'table', headers: string[], rows: string[][] }
  | { type: 'img', src: string, alt: string }

export interface BlogFaq {
  q: string
  a: string
}

export interface BlogRelatedLink {
  label: string
  to: string
}

export interface BlogGalleryImage {
  src: string
  title: string
}

export interface BlogPost {
  title: string
  seoTitle?: string
  slug: string
  excerpt: string
  date: string
  category: string
  cover?: string
  gallery?: BlogGalleryImage[]
  keywords?: string[]
  tags?: string[]
  relatedLinks?: BlogRelatedLink[]
  faq?: BlogFaq[]
  body: BlogBlock[]
}

export function parseBlogBody(markdown: string): BlogBlock[] {
  const chunks = markdown.trim().split(/\n\s*\n/)
  const blocks: BlogBlock[] = []

  for (const raw of chunks) {
    const chunk = raw.trim()
    if (!chunk) continue

    const imageMatch = chunk.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch?.[1] != null && imageMatch[2] != null) {
      blocks.push({ type: 'img', src: imageMatch[2].trim(), alt: imageMatch[1].trim() })
      continue
    }

    if (chunk.startsWith('### ')) {
      blocks.push({ type: 'h3', text: chunk.replace(/^###\s+/, '').trim() })
      continue
    }

    if (chunk.startsWith('## ')) {
      blocks.push({ type: 'h2', text: chunk.replace(/^##\s+/, '').trim() })
      continue
    }

    const lines = chunk.split('\n')
    const table = parseMarkdownTable(lines)
    if (table) {
      blocks.push(table)
      continue
    }

    const isList = lines.every(line => /^\s*[-*]\s+/.test(line))
    if (isList) {
      blocks.push({
        type: 'ul',
        items: lines.map(line => line.replace(/^\s*[-*]\s+/, '').trim())
      })
      continue
    }

    blocks.push({
      type: 'p',
      text: lines.join(' ').replace(/\s+/g, ' ').trim()
    })
  }

  return blocks
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim())
}

function isTableSeparator(cells: string[]): boolean {
  return cells.length > 0 && cells.every(cell => /^:?-{1,}:?$/.test(cell))
}

function parseMarkdownTable(lines: string[]): Extract<BlogBlock, { type: 'table' }> | null {
  if (lines.length < 2 || !lines.every(line => /^\s*\|.+\|\s*$/.test(line))) return null

  const rows = lines.map(parseTableRow)
  const [first, second, ...rest] = rows
  if (!first?.length || !second || !isTableSeparator(second)) return null

  return {
    type: 'table',
    headers: first,
    rows: rest.filter(row => row.some(cell => cell.length > 0))
  }
}

export function normalizeBody(body: string[] | BlogBlock[]): BlogBlock[] {
  if (!body.length) return []
  if (typeof body[0] === 'string') {
    return (body as string[]).map(text => ({ type: 'p' as const, text }))
  }
  return body as BlogBlock[]
}

export function blogPlainText(post: BlogPost): string {
  const parts: string[] = [post.title, post.excerpt]
  for (const block of normalizeBody(post.body)) {
    if (block.type === 'ul') parts.push(...block.items)
    else if (block.type === 'table') parts.push(...block.headers, ...block.rows.flat())
    else if (block.type === 'img') parts.push(block.alt)
    else parts.push(block.text)
  }
  if (post.faq) {
    for (const item of post.faq) {
      parts.push(item.q, item.a)
    }
  }
  return parts.join(' ')
}

export function blogWordCount(post: BlogPost): number {
  return blogPlainText(post).split(/\s+/).filter(Boolean).length
}

export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(blogWordCount(post) / 200))
}
