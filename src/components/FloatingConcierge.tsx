import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

interface FloatingConciergeProps {
  whatsappUrl: string
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ whatsappUrl }) => {
  return (
    <motion.aside
      className="floating-concierge"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="concierge-pill"
        title="Conciergerie WhatsApp en direct"
      >
        <span className="concierge-pulse-dot" />
        <span>Conciergerie WigaChoco</span>
        <MessageCircle size={18} />
      </a>
    </motion.aside>
  )
}

