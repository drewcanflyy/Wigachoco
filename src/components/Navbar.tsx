import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Menu, X, ArrowUpRight, Sparkles, Gift } from 'lucide-react'
import { useBox } from '../context/BoxContext'

export interface NavItem {
  label: string
  path: string
}

interface NavbarProps {
  currentPath: string
  pages: NavItem[]
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void
  whatsappUrl: string
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, pages, onNavigate, whatsappUrl }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalCount, setIsDrawerOpen } = useBox()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="nav-island-wrapper">
      <nav className={`nav-island ${scrolled ? 'scrolled' : ''}`} aria-label="Navigation Principale">

        {/* ── Brand Wordmark ── */}
        <a
          href="/"
          className="brand-mark"
          onClick={(e) => { onNavigate(e, '/'); setMobileOpen(false) }}
        >
          <Sparkles className="brand-logo-icon" />
          <span>WIGA<span className="accent">Choco</span></span>
        </a>

        {/* ── Desktop Nav Links (hidden on mobile via CSS) ── */}
        <div className="nav-links-desktop">
          {pages.map((page) => {
            const isActive = currentPath === page.path
            return (
              <a
                key={page.path}
                href={page.path}
                onClick={(e) => onNavigate(e, page.path)}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {page.label}
              </a>
            )
          })}
        </div>

        {/* ── CTA Group (right side) ── */}
        <div className="nav-cta-wrapper">

          {/* Panier — icon-only on medium, with label on large screens */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={() => setIsDrawerOpen(true)}
            title="Mon Panier"
            aria-label="Ouvrir mon panier"
          >
            <Gift size={18} />
            {totalCount > 0 && (
              <span className="nav-badge">{totalCount}</span>
            )}
          </button>

          {/* WhatsApp — icon pill only, text visible only on wide screens */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-luxury btn-luxury-primary nav-wa-btn"
            title="Commander sur WhatsApp"
          >
            <span className="nav-wa-label">Commander</span>
            <div className="btn-icon-pill">
              <MessageCircle size={16} />
            </div>
          </a>

          {/* Hamburger — only on mobile/tablet */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* ── Full-screen Mobile Overlay ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mobile-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mobile-nav-links">
                {pages.map((page, idx) => {
                  const isActive = currentPath === page.path
                  return (
                    <motion.a
                      key={page.path}
                      href={page.path}
                      className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                      onClick={(e) => { onNavigate(e, page.path); setMobileOpen(false) }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.045 + 0.08, duration: 0.3 }}
                    >
                      <span>{page.label}</span>
                      <ArrowUpRight size={20} opacity={0.5} />
                    </motion.a>
                  )
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxury btn-luxury-gold"
                  style={{ justifyContent: 'center' }}
                >
                  <span>Commander sur WhatsApp</span>
                  <div className="btn-icon-pill"><MessageCircle size={18} /></div>
                </a>
                <button
                  type="button"
                  onClick={() => { setIsDrawerOpen(true); setMobileOpen(false) }}
                  className="btn-luxury btn-luxury-outline"
                  style={{ justifyContent: 'center', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  <span>Mon Panier {totalCount > 0 ? `(${totalCount})` : ''}</span>
                  <div className="btn-icon-pill"><Gift size={16} /></div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
