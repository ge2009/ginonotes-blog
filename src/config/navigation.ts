import { NavigationConfig } from '@/types/navigation'
import {
  FaHome,
  FaUser,
  FaCode,
  FaLaptopCode,
  FaLaptop,
  FaBook,
  FaLightbulb,
  FaGithub,
  FaTwitter,
  FaHospital,
  FaDatabase,
  FaTools,
} from 'react-icons/fa'
import { allPosts } from 'contentlayer/generated'
import { createCategoryRoute } from '@/lib/routes'

// 获取每个分类的文章数量
const getCategoryCount = (category: string) => {
  return allPosts.filter((post) => post.category === category).length
}

export const navigation: NavigationConfig = {
  main: [
    { href: '/', label: '首页', icon: FaHome },
    { href: '/about', label: '关于我', icon: FaUser },
  ],
  posts: [
    {
      href: createCategoryRoute('dev'),
      label: '编程开发',
      icon: FaLaptopCode,
      count: getCategoryCount('dev'),
    },
    {
      href: createCategoryRoute('oracle'),
      label: 'Oracle',
      icon: FaDatabase,
      count: getCategoryCount('oracle'),
    },
    {
      href: createCategoryRoute('tools'),
      label: '工具',
      icon: FaTools,
      count: getCategoryCount('tools'),
    },
    {
      href: createCategoryRoute('reading'),
      label: '阅读记录',
      icon: FaBook,
      count: getCategoryCount('reading'),
    },
    {
      href: createCategoryRoute('thoughts'),
      label: '思考随笔',
      icon: FaLightbulb,
      count: getCategoryCount('thoughts'),
    },
    {
      href: createCategoryRoute('mac'),
      label: 'mac',
      icon: FaLaptop,
      count: getCategoryCount('mac'),
    },
  ],
  projects: [
    { href: 'https://github.com/ge2009/lucky-draw', label: 'lucky-draw', icon: FaCode },
    { href: 'https://github.com/ge2009/dcmget', label: 'dcmget', icon: FaHospital },
  ],
  online: [
    { href: 'https://github.com/ge2009', label: 'GitHub', icon: FaGithub },
    {
      href: 'https://twitter.com/jason0407',
      label: 'Twitter',
      icon: FaTwitter,
    },
  ],
}
