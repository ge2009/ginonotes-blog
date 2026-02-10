'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error)
  }, [error])

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 py-20 animate-fadeIn max-w-2xl mx-auto">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-ping" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            哎呀，出错了
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            应用程序遇到了意外错误。请重试，或稍后再访问。
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              错误详情
            </h3>
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                错误 ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={reset} size="lg" className="gap-2">
            <RefreshCw className="h-5 w-5" />
            重试
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
