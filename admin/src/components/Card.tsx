import type React from "react"
import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded shadow-md overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card
