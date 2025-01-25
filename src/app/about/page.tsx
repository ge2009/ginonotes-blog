import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { FaLaptop,FaFilm,FaHospital, FaBook, FaRobot, FaDatabase, FaGithub, FaTwitter, FaWeixin } from 'react-icons/fa'
import { SiNextdotjs, SiMongodb } from 'react-icons/si'
import { HiMail } from 'react-icons/hi'
import { BsRobot, BsGear } from 'react-icons/bs'
import { Container } from '@/components/common/Container'

const meta = {
    title: '87年的脚本',
    description: '生活就是一个健康的人，一个美满的家庭，一份自己喜欢的工作，一样钟爱的消遣。',
    url: `${WEBSITE_HOST_URL}/about`,
}

export const metadata: Metadata = {
    metadataBase: new URL(WEBSITE_HOST_URL),
    title: meta.title,
    description: meta.description,
    openGraph: {
        title: meta.title,
        description: meta.description,
        url: meta.url,
        type: 'website',
    },
    twitter: {
        title: meta.title,
        description: meta.description,
        card: 'summary_large_image',
    },
    alternates: {
        canonical: meta.url,
    },
}

const skills = [
    { icon: FaDatabase, name: 'Oracle', color: 'text-red-500' },
    { icon: FaHospital, name: 'PACS', color: 'text-green-500' },
    { icon: SiNextdotjs, name: 'Next.js', color: 'text-gray-800 dark:text-gray-200' },
    { icon: BsRobot, name: 'RAG', color: 'text-purple-500' },
    { icon: BsGear, name: 'Workflow', color: 'text-blue-500' },
    { icon: FaRobot, name: 'Agent', color: 'text-emerald-500' },
]

const interests = [
    {
        icon: FaFilm,
        title: '电影',
        description: '热爱电影，享受视觉盛宴'
    },
    {
        icon: FaLaptop,
        title: '数码',
        description: '享受数码产品带来的乐趣'
    },
    {
        icon: FaBook,
        title: '阅读',
        description: '保持学习的习惯，探索不同领域的知识'
    },
    {
        icon: FaRobot,
        title: 'AI 产品',
        description: '关注并评测最新的 AI 产品和技术'
    },
]

const contacts = [
    {
        icon: FaWeixin,
        name: '微信',
        value: 'jason0407',
        color: 'text-green-500',
    },
    {
        icon: FaGithub,
        name: 'GitHub',
        value: 'ge2009',
        link: 'https://github.com/ge2009',
        color: 'text-gray-800 dark:text-gray-200',
    },
    {
        icon: FaTwitter,
        name: 'Twitter',
        value: '@jason0407',
        link: 'https://twitter.com/jason0407',
        color: 'text-blue-400',
    },
    {
        icon: HiMail,
        name: '邮件',
        value: 'jason@v2ex.com.cn',
        link: 'mailto:jason@v2ex.com.cn',
        color: 'text-red-500',
    },
]

export default function About() {
    return (
        <Container size="md">
            <div className="py-12 sm:py-16 lg:py-20">
                {/* 头部介绍 */}
                <div>
                    <h1 className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                        87年的脚本
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                    生活就是一个健康的人，一个美满的家庭，一份自己喜欢的工作，一样钟爱的消遣。
                        <a href="https://www.v2ex.com.cn" target="_blank" rel="noopener noreferrer" className="px-1 text-blue-500 hover:text-blue-600">
                            www.v2ex.com.cn
                        </a>
                    </p>
                </div>

                {/* 技术栈 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">技术栈</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        我专注于构建高性能、高并发、高稳定性的系统。同时具备全栈开发能力，能够独立完成项目开发。
                    </p>
                    <div className="mt-8 flex flex-wrap gap-6">
                        {skills.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-2">
                                <skill.icon className={`h-6 w-6 ${skill.color}`} />
                                <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 兴趣爱好 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">兴趣爱好</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {interests.map((interest) => (
                            <div
                                key={interest.title}
                                className="group rounded-2xl bg-white/50 p-6 shadow-md transition-all hover:shadow-xl dark:bg-gray-800/50"
                            >
                                <interest.icon className="h-8 w-8 text-blue-500" />
                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {interest.title}
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {interest.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 博客目的 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">关于博客</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        这里是我的数字花园，记录日常学习和思考的内容。你可以找到关于编程技术、人工智能、分享数码产品、oracle 数据库技术分享的文章，
                        也可以看到我的阅读笔记和生活随想。希望这些内容能够帮助到你，也欢迎与我交流讨论。
                    </p>
                </div>

                {/* 联系方式 */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">联系方式</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        {contacts.map((contact) => (
                            <div key={contact.name} className="flex items-center gap-4">
                                <contact.icon className={`h-6 w-6 ${contact.color}`} />
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{contact.name}</span>
                                    {contact.link ? (
                                        <a
                                            href={contact.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                                        >
                                            {contact.value}
                                        </a>
                                    ) : (
                                        <span className="text-gray-900 dark:text-gray-100">{contact.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Container>
    )
}
