import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, MessageCircle, Gift, ArrowRight } from 'lucide-react'
import { useBox } from '../context/BoxContext'

interface BespokeBoxDrawerProps {
  whatsappUrl: string
  onBrowseProducts: () => void
}

export const BespokeBoxDrawer: React.FC<BespokeBoxDrawerProps> = ({ whatsappUrl, onBrowseProducts }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearBox,
    totalCount,
    totalPrice,
    isDrawerOpen,
    setIsDrawerOpen,
    ribbonColor,
    setRibbonColor,
  } = useBox()

  const ribbonOptions = [
    'Or Artisanal Scintillant',
    'Velours Prune WigaChoco',
    'Soie Blanche Céleste',
    'Bleu Royal Cérémonie',
  ]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setIsDrawerOpen])

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const generateBoxWhatsAppMessage = () => {
    const listText = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (x${item.quantity}) — ${(
            item.product.price * item.quantity
          ).toLocaleString('fr-MA')} MAD`
      )
      .join('\n')

    const fullMessage = `Bonjour Maison WigaChoco,
Je souhaite commander mon coffret composé sur-mesure :

${listText}

• Ruban de présentation choisi : ${ribbonColor}
• Nombre total d'articles : ${totalCount}
• Total estimé : ${totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD

Pourriez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !`

    return `${whatsappUrl}?text=${encodeURIComponent(fullMessage)}`
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="lightbox-backdrop"
          style={{ justifyContent: 'flex-end', padding: 0 }}
          onClick={() => setIsDrawerOpen(false)}
        >
          <motion.div
            className="doppel-shell"
            style={{
              width: 'min(480px, 100vw)',
              height: '100vh',
              borderRadius: 0,
              padding: 0,
              background: 'var(--cream)',
              borderLeft: '1px solid rgba(var(--gold-rgb), 0.3)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="doppel-core"
              style={{
                borderRadius: 0,
                height: '100%',
                background: 'var(--cream)',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Drawer Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                  borderBottom: '1px solid rgba(var(--cocoa-rgb), 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'rgba(var(--plum-rgb), 0.1)',
                      color: 'var(--plum)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Gift size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Mon Panier</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {totalCount} création{totalCount > 1 ? 's' : ''} sélectionnée{totalCount > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(var(--cocoa-rgb), 0.15)',
                    background: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cocoa)',
                  }}
                  aria-label="Fermer le tiroir"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  paddingBlock: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                {items.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Gift size={44} color="var(--gold)" style={{ marginBottom: 14, opacity: 0.7 }} />
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--cocoa)', marginBottom: 8 }}>
                      Votre panier est encore vide
                    </h4>
                    <p style={{ fontSize: '0.9rem', marginBottom: 24, maxWidth: 280 }}>
                      Explorez notre catalogue de 85 créations et composez votre coffret personnalisé.
                    </p>
                    <button
                      type="button"
                      className="btn-luxury btn-luxury-primary"
                      onClick={() => {
                        setIsDrawerOpen(false)
                        onBrowseProducts()
                      }}
                    >
                      <span>Découvrir les créations</span>
                      <div className="btn-icon-pill">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.slug}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 12,
                        borderRadius: 16,
                        background: '#ffffff',
                        border: '1px solid rgba(var(--cocoa-rgb), 0.08)',
                      }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 12,
                          objectFit: 'cover',
                          background: '#f2eae1',
                        }}
                      />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4
                          style={{
                            fontSize: '0.88rem',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            lineHeight: 1.35,
                            margin: '0 0 4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={item.product.name}
                        >
                          {item.product.name}
                        </h4>
                        <div style={{ color: 'var(--plum)', fontWeight: 700, fontSize: '0.9rem' }}>
                          {(item.product.price * item.quantity).toLocaleString('fr-MA')} MAD
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'rgba(var(--cocoa-rgb), 0.04)',
                          borderRadius: 999,
                          padding: '3px 6px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.slug, -1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: 'none',
                            background: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title="Diminuer"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.84rem', fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.slug, 1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: 'none',
                            background: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title="Augmenter"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.slug)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: 6,
                        }}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Ribbon selection */}
              {items.length > 0 && (
                <div
                  style={{
                    paddingTop: 18,
                    borderTop: '1px solid rgba(var(--cocoa-rgb), 0.1)',
                  }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--plum)',
                        marginBottom: 8,
                      }}
                    >
                      Ruban Satiné de Présentation
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {ribbonOptions.map((ribbon) => (
                        <button
                          key={ribbon}
                          type="button"
                          onClick={() => setRibbonColor(ribbon)}
                          style={{
                            fontSize: '0.74rem',
                            padding: '4px 10px',
                            borderRadius: 999,
                            cursor: 'pointer',
                            fontWeight: 600,
                            border:
                              ribbonColor === ribbon
                                ? '1.5px solid var(--plum)'
                                : '1px solid rgba(var(--cocoa-rgb), 0.14)',
                            background: ribbonColor === ribbon ? 'rgba(var(--plum-rgb), 0.08)' : '#ffffff',
                            color: ribbonColor === ribbon ? 'var(--plum)' : 'var(--cocoa)',
                          }}
                        >
                          {ribbon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total estimé</span>
                      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--plum)', fontFamily: 'var(--font-serif)' }}>
                        {totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={clearBox}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Vider le panier
                    </button>
                  </div>

                  {/* Send to WhatsApp */}
                  <a
                    href={generateBoxWhatsAppMessage()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-luxury btn-luxury-primary"
                    style={{ width: '100%', justifyContent: 'center', height: 48 }}
                  >
                    <span>Commander mon coffret sur WhatsApp</span>
                    <div className="btn-icon-pill">
                      <MessageCircle size={16} />
                    </div>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

