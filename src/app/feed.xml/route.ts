import { WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: '87年的脚本',
    description: '生活就是一个健康的人，一个美满的家庭，一份自己喜欢的工作，一样钟爱的消遣。',
    site_url: WEBSITE_HOST_URL,
    feed_url: `${WEBSITE_HOST_URL}/feed.xml`,
    language: 'zh-CN',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, JasonAir`,
  })

  allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${WEBSITE_HOST_URL}${post.url}`,
        date: new Date(post.date),
        categories: [post.category],
        author: 'JasonAir',
      })
    })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
