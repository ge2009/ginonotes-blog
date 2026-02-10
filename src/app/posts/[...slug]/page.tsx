import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import { MDXContent } from '@/components/mdx/MDXContent'
import { Container } from '@/components/common/Container'
import { PostHeader } from '@/components/post/PostHeader'
import { PostFooter } from '@/components/post/PostFooter'
import { calculateReadingTime } from '@/lib/utils'
import { ReadingProgress } from '@/components/post/ReadingProgress'
import { TableOfContents } from '@/components/post/TableOfContents'
import { PostContent } from '@/components/post/PostContent'

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/')
  return allPosts.find((post) => post.url === `/posts/${slug}`)
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

function extractHeadings(content: string) {
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')
  const headingRegex = /^#{2,4}\s+(.+)$/gm
  const headings: { level: number; text: string }[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const text = stripMarkdownLinks(match[1])
    const level = match[0].split('#').length - 1
    headings.push({ level, text })
  }

  return headings
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata | undefined> {
  const post = await getPostFromParams(params)

  if (!post) {
    return
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${WEBSITE_HOST_URL}${post.url}`,
      images: [
        {
          url: `${WEBSITE_HOST_URL}${post.cover || '/images/og.png'}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${WEBSITE_HOST_URL}${post.cover || '/images/og.png'}`],
    },
  }
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const sameCategoryPosts = allPosts
    .filter((p) => p.category === post.category && p.url !== post.url)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const recommendedPosts = sameCategoryPosts.slice(0, 4)
  const headings = extractHeadings(post.body.raw)

  return (
    <div className="relative w-full min-h-screen">
      <ReadingProgress />
      <Container size="2xl">
        <div className="py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,_1fr)_280px] xl:gap-12">
            <main className="min-w-0 max-w-3xl">
              <article>
                <PostHeader
                  title={post.title}
                  date={post.date}
                  readingTime={calculateReadingTime(post.body.raw)}
                  category={post.category}
                />
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <PostContent>
                    <MDXContent code={post.body.code} />
                  </PostContent>
                </div>
              </article>
              <div className="mt-12">
                <PostFooter
                  tags={post.tags}
                  recommendedPosts={recommendedPosts}
                  category={post.category}
                  categoryPostsCount={sameCategoryPosts.length + 1}
                />
              </div>
            </main>

            <aside className="hidden xl:block">
              <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto py-4">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  )
}
