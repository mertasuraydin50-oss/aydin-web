import {
  blogRecords,
  findBlog,
  toBlogView
} from '~/content/load'
import type { BlogPost } from '~/constants/blogTypes'

export type { BlogPost } from '~/constants/blogTypes'

export const blogPosts: BlogPost[] = blogRecords.map(record =>
  toBlogView(record, 'tr')
)

export function blogPath(slug?: string) {
  return slug ? `/blog/${slug}` : '/blog'
}

export function getBlogPost(slug: string) {
  const record = findBlog(slug)
  return record ? toBlogView(record, 'tr') : undefined
}
