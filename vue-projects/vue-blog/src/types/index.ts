export interface Tag {
  id: string
  name: string
  color: string
}

export interface Article {
  id: string
  title: string
  summary: string
  content: string
  tags: string[] // tag ids
  coverImage?: string
  createdAt: string
  updatedAt: string
  published: boolean
  viewCount: number
}

export interface SiteConfig {
  title: string
  subtitle: string
  authorName: string
  authorBio: string
  authorAvatar: string
  githubUrl: string
  email: string
  aboutContent: string
}
