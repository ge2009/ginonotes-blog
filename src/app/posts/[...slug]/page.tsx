import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import { MDXContent } from '@/components/mdx/MDXContent'
import { Container } from '@/components/common/Container'
import { PostHeader } from '@/components/post/PostHeader'
import { PostFooter } from '@/components/post/PostFooter'
import { calculateReadingTime } from '@/lib/utils'

interface PostProps {
    params: {
        slug: string[]
    }
}

async function getPostFromParams(params: PostProps['params']) {
    const slug = params?.slug?.join('/')
    const post = allPosts.find((post) => post.url === `/posts/${slug}`)

    if (!post) {
        null
    }

    return post
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

    // 获取相关文章
    const categoryPosts = allPosts
        .filter((p) => p.category === post.category && p.url !== post.url)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)

    return (
        <Container>
            <article className="mx-auto max-w-3xl py-8">
                <PostHeader
                    title={post.title}
                    date={post.date}
                    readingTime={calculateReadingTime(post.body.raw)}
                    category={post.category}
                />
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <MDXContent code={post.body.code} />
                </div>
                <PostFooter
                    tags={post.tags}
                    recommendedPosts={categoryPosts}
                    category={post.category}
                    categoryPostsCount={allPosts.filter((p) => p.category === post.category).length}
                />
            </article>
        </Container>
    )
}
