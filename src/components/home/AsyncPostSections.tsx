import { allPosts } from 'contentlayer/generated'
import { getFeaturedPost, getRecentPosts } from '@/lib/posts'
import { FeaturedSection } from './FeaturedSection'
import { PostList } from './PostList'

const delay = (ms: number) =>
  process.env.NODE_ENV === 'development'
    ? new Promise((resolve) => setTimeout(resolve, ms))
    : Promise.resolve()

export async function FeaturedPostSection() {
  const featuredPost = getFeaturedPost(allPosts)
  await delay(100)

  if (!featuredPost) return null
  return <FeaturedSection post={featuredPost} />
}

export async function RecentPostsSection() {
  const recentPosts = getRecentPosts(allPosts)
  await delay(200)

  return <PostList posts={recentPosts} />
}
