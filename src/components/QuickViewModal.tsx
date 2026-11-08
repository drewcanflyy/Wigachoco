import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, ExternalLink, ShieldCheck, Award } from 'lucide-react'
import type { OfficialProduct } from '../types'

interface QuickViewModalProps {
  product: OfficialProduct | null
  onClose: () => void
  whatsappUrl: string
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, whatsappUrl }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!product) return null

  const orderUrl = `${whatsappUrl}?text=${encodeURIComponent(
    `Bonjour WigaChoco, je souhaite commander la création : "${product.name}" au tarif de ${product.price} MAD.`
  )}`

  return (
    <AnimatePresence>
      <div className="lightbox-backdrop" onClick={onClose}>
        <motion.div
          className="quickview-modal-box"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            className="lightbox-close-btn"
            style={{ top: 16, right: 16 }}
            onClick={onClose}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          <div className="quickview-image-pane">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="quickview-body">
            <div className="eyebrow-badge" style={{ marginBottom: 14 }}>
              <span className="gold-dot" />
              <span>Création Artisanale WigaChoco</span>
            </div>

            <h3>{product.name}</h3>

            <div className="qv-price">
              {product.price.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
            </div>

            <p>
              Confectionné avec des fèves de cacao rigoureusement sélectionnées selon les standards de la haute chocolaterie marocaine.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'var(--cocoa)' }}>
                <Award size={18} color="var(--gold)" />
                <span>Recette originale mise au point par notre diététicienne-fondatrice</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'var(--cocoa)' }}>
                <ShieldCheck size={18} color="var(--gold)" />
                <span>Préparation artisanale fraîche & emballage haute protection</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href={orderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury btn-luxury-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Commander sur WhatsApp</span>
                <div className="btn-icon-pill">
                  <MessageCircle size={16} />
                </div>
              </a>

              <a
                href={`https://wigachoco.ma/produit/${product.slug}`}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury btn-luxury-outline"
                title="Voir sur le site officiel"
              >
                <span>Fiche</span>
                <div className="btn-icon-pill">
                  <ExternalLink size={14} />
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

