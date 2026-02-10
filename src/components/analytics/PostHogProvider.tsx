'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from '@posthog/react'

function PostHogPageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return

    posthog.capture('$pageview', {
      $current_url: window.location.href,
    })
  }, [pathname])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const hasKey = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY)

  useEffect(() => {
    if (!hasKey) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true,
      defaults: '2026-01-30',
    })
  }, [hasKey])

  if (!hasKey) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      {children}
      <PostHogPageView />
    </PHProvider>
  )
}
