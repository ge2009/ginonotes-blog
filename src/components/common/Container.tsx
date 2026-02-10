import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'default'
}

const sizeMap = {
  sm: 'max-w-2xl', // 672px
  md: 'max-w-3xl', // 768px
  lg: 'max-w-4xl', // 896px
  xl: 'max-w-5xl', // 1024px
  '2xl': 'max-w-6xl', // 1152px
  '3xl': 'max-w-7xl', // 1280px
  default: 'max-w-5xl' // 1024px
}

export function Container({
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
