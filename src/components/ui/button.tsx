import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95"

    const variants = {
      default: "bg-gradient-primary text-dark-950 hover:opacity-90 shadow-primary",
      destructive: "bg-error text-white hover:bg-red-700 shadow-sm",
      outline: "border-2 border-primary-500/50 bg-transparent text-primary-500 hover:bg-primary-500/10 hover:border-primary-500",
      secondary: "bg-secondary-500/20 text-secondary-400 hover:bg-secondary-500/30 shadow-sm",
      ghost: "text-dark-300 hover:bg-dark-800 hover:text-primary-500",
      link: "underline-offset-4 hover:underline text-primary-500 hover:text-primary-400"
    }

    const sizes = {
      default: "h-10 py-2 px-4 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10"
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button className={classes} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button }
