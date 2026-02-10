import { Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

/**
 * 获取按日期排序的文章列表
 */
export function getSortedPosts(posts: Post[]) {
  return posts.sort((a, b) => {
    const dateComparison = compareDesc(new Date(a.date), new Date(b.date))
    if (dateComparison === 0) {
      return a.title.localeCompare(b.title, 'zh-CN')
    }
    return dateComparison
  })
}

/**
 * 获取文章分类统计
 */
export function getCategoryStats(posts: Post[]) {
  return posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 获取最新的特色文章
 */
export function getFeaturedPost(posts: Post[]) {
  const featuredPosts = getSortedPosts(posts.filter((post) => post.featured))
  if (featuredPosts.length > 0) {
    return featuredPosts[0]
  }

  return getSortedPosts(posts)[0]
}

/**
 * 获取最近的 N 篇文章（不包含特色文章）
 */
export function getRecentPosts(posts: Post[], count: number = 10) {
  const featuredPost = getFeaturedPost(posts)
  const recentPosts = getSortedPosts(posts.filter((post) => post._id !== featuredPost._id))
  return recentPosts.slice(0, count)
}
