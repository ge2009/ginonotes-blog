import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-700/80', className)} />
  )
}

export function PostCardSkeleton() {
  return (
    <div className="group relative flex h-full flex-col space-y-4">
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />

      <div className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export function FeaturedPostSkeleton() {
  return (
    <div className="relative grid gap-8 lg:grid-cols-2">
      <Skeleton className="aspect-[16/9] w-full rounded-xl lg:aspect-[4/3]" />

      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  )
}

export function PostListSkeleton() {
  return (
    <section className="w-full">
      <div className="flex flex-col space-y-8">
        <Skeleton className="h-8 w-32" />

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
          {[...Array(4)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
