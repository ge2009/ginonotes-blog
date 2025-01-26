import type { ComponentProps } from 'react'
import { Highlight } from './Highlight'

type MDXComponents = {
  [key: string]: React.ComponentType<any>
}

// 处理特殊标记的正则表达式
const highlightRegex = /::([^:]+)::/g

// 递归处理文本节点
function processText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = highlightRegex.exec(text)) !== null) {
    // 添加匹配之前的普通文本
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // 添加高亮文本
    parts.push(<Highlight key={match.index}>{match[1]}</Highlight>)
    lastIndex = match.index + match[0].length
  }

  // 添加剩余的文本
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

// 处理段落内容
function processParagraphChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') {
    return processText(children)
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (typeof child === 'string') {
        return processText(child)
      }
      return child
    })
  }

  return children
}

export const mdxComponents: MDXComponents = {
  // 处理段落
  p: ({ children }: ComponentProps<'p'>) => {
    const processedChildren = processParagraphChildren(children)
    return <p>{processedChildren}</p>
  },
  // 处理列表项
  li: ({ children }: ComponentProps<'li'>) => {
    const processedChildren = processParagraphChildren(children)
    return <li>{processedChildren}</li>
  },
} 
