'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface BlurImageProps {
  /** 图片源地址 */
  src: string
  /** 图片替代文本 */
  alt: string
  /** 图片宽度 */
  width?: number
  /** 图片高度 */
  height?: number
  /** 是否填充容器 */
  fill?: boolean
  /** 响应式尺寸设置 */
  sizes?: string
  /** 是否优先加载 */
  priority?: boolean
  /** 自定义类名 */
  className?: string
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
}: BlurImageProps) {
  // 图片加载状态
  const [isLoading, setLoading] = useState(true)

  // 渲染占位符
  if (!src) {
    return (
      <div 
        className={cn(
          'bg-gray-200 dark:bg-gray-800 rounded-lg',
          className
        )}
        style={{ 
          width: width || '100%', 
          height: height || '100%' 
        }}
        aria-label={alt || '图片占位符'}
      />
    )
  }

  // 渲染图片
  return (
    <Image
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={cn(
        'duration-700 ease-in-out',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0',
        className
      )}
      onLoad={() => setLoading(false)}
    />
  )
} 