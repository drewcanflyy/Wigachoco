import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxModalProps {
  images: readonly string[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = activeIndex !== null

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return
    const prev = (activeIndex - 1 + images.length) % images.length
    onNavigate(prev)
  }, [activeIndex, images.length, onNavigate])

  const handleNext = useCallback(() => {
    if (activeIndex === null) return
    const next = (activeIndex + 1) % images.length
    onNavigate(next)
  }, [activeIndex, images.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose, handlePrev, handleNext])

  if (!isOpen || activeIndex === null) return null

  return (
    <AnimatePresence>
      <div className="lightbox-backdrop" onClick={onClose}>
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Fermer la vue plein écran"
        >
          <X size={22} />
        </button>

        <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="lightbox-nav-btn lightbox-prev"
            onClick={handlePrev}
            aria-label="Image précédente"
          >
            <ChevronLeft size={28} />
          </button>

          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`Showroom WigaChoco ${activeIndex + 1}`}
            className="lightbox-img"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          />

          <button
            type="button"
            className="lightbox-nav-btn lightbox-next"
            onClick={handleNext}
            aria-label="Image suivante"
          >
            <ChevronRight size={28} />
          </button>

          <div
            style={{
              marginTop: 18,
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Création WigaChoco {activeIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

