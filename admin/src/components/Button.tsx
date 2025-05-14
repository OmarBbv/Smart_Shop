import type React from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium focus:outline-none transition-colors"

  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  }

  // Sharper corners like render.com
  const cornerClasses = "rounded"

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${cornerClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default Button
