import type { LocationQueryRaw, RouteLocationRaw } from 'vue-router'

const STATIC_ROUTES: Record<string, string> = {
  iletisim: 'iletisim',
  galeri: 'galeri',
  hakkimizda: 'hakkimizda'
}

function parseQuery(search?: string): LocationQueryRaw | undefined {
  if (!search) return undefined
  return Object.fromEntries(new URLSearchParams(search))
}

const SECTION_ALIASES: Record<string, string> = {
  urunler: 'urunler',
  products: 'urunler',
  hizmetler: 'hizmetler',
  services: 'hizmetler',
  kurumsal: 'kurumsal',
  corporate: 'kurumsal',
  blog: 'blog'
}

const STATIC_ALIASES: Record<string, string> = {
  ...STATIC_ROUTES,
  contact: 'iletisim',
  gallery: 'galeri'
}

function pathToNamed(pathname: string): RouteLocationRaw {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return { name: 'index' }

  const segments = path.replace(/^\//, '').split('/')
  const first = segments[0] ?? ''
  const section = SECTION_ALIASES[first] ?? first

  if (section === 'urunler') {
    if (segments.length === 1) return { name: 'urunler' }
    if (segments.length === 2) {
      return { name: 'urunler-kategori', params: { kategori: segments[1]! } }
    }
    if (segments.length === 3) {
      return {
        name: 'urunler-kategori-slug',
        params: { kategori: segments[1]!, slug: segments[2]! }
      }
    }
  }

  if (section === 'hizmetler') {
    if (segments.length === 1) return { name: 'hizmetler' }
    return { name: 'hizmetler-slug', params: { slug: segments[1]! } }
  }

  if (section === 'kurumsal' && segments[1]) {
    return { name: 'kurumsal-slug', params: { slug: segments[1] } }
  }

  if (section === 'blog') {
    if (segments.length === 1) return { name: 'blog' }
    return { name: 'blog-slug', params: { slug: segments[1]! } }
  }

  const staticKey = segments[0]
  if (segments.length === 1 && staticKey && STATIC_ALIASES[staticKey]) {
    return { name: STATIC_ALIASES[staticKey] }
  }

  return path
}

export function toNamedRoute(to: RouteLocationRaw): RouteLocationRaw {
  if (typeof to !== 'string') return to

  const [withoutHash = to, hash] = to.split('#')
  const [pathname = withoutHash, search] = withoutHash.split('?')
  const named = pathToNamed(pathname)
  const query = parseQuery(search)

  if (typeof named === 'string') {
    return to
  }

  return {
    ...named,
    ...(query ? { query } : {}),
    ...(hash ? { hash: `#${hash}` } : {})
  }
}
