"use client"

import { useEffect, useState } from 'react'
import { slugify } from '@/lib/utils'

interface TableOfContentsProps {
  headings: { level: number; text: string }[]
}

interface TocItem {
  id: string
  level: number
  text: string
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [items, setItems] = useState<TocItem[]>([])

  useEffect(() => {
    const article = document.querySelector('.article-content')
    if (!article) {
      return
    }

    const headingElements = Array.from(
      article.querySelectorAll('h2, h3, h4')
    ) as HTMLElement[]

    const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase()
    const pool = headingElements.map((element) => ({
      element,
      text: normalize(element.textContent || ''),
      used: false,
    }))

    const occurrences = new Map<string, number>()
    const resolvedItems = headings.map((heading, index) => {
      const normalized = normalize(heading.text)
      const match = pool.find((candidate) => !candidate.used && candidate.text === normalized)
      const element = match?.element ?? headingElements[index]

      if (match) {
        match.used = true
      }

      const baseId = slugify(heading.text) || `heading-${index}`
      const count = occurrences.get(baseId) ?? 0
      occurrences.set(baseId, count + 1)
      const fallbackId = count ? `${baseId}-${count}` : baseId

      if (!element) {
        return { ...heading, id: fallbackId }
      }

      if (!element.id) {
        element.id = fallbackId
      }

      return { ...heading, id: element.id }
    })

    setItems(resolvedItems)
  }, [headings])

  useEffect(() => {
    if (!items.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  if (!items.length) return null

  return (
    <nav className="w-full">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">目录</h2>
        <ul className="space-y-3 text-base">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 1.25}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`inline-block transition-colors hover:text-primary ${
                  activeId === item.id ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.id)
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                    window.history.pushState({}, '', `#${item.id}`)
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
