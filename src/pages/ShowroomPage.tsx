import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, MessageCircle, MapPin } from 'lucide-react'
import { officialShowroom } from '../officialShowroom'
import { LightboxModal } from '../components/LightboxModal'

interface ShowroomPageProps {
  whatsappUrl: string
}

export const ShowroomPage: React.FC<ShowroomPageProps> = ({ whatsappUrl }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  return (
    <div style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Page Header */}
      <section className="shell" style={{ marginBottom: 50 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>Galerie Exclusive • Showroom WigaChoco</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)', maxWidth: 820, marginBottom: 18 }}>
          L’Univers WigaChoco en Images.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.12rem', maxWidth: 660, lineHeight: 1.8 }}>
          Explorez notre boutique, nos tables de réception garnies et les mises en scène de nos créations artisanales.
          Cliquez sur chaque photographie pour l’admirer en haute définition.
        </p>
      </section>

      {/* Boutique Visit Info Banner */}
      <section className="shell" style={{ marginBottom: 50 }}>
        <div
          className="doppel-shell"
          style={{ background: 'rgba(var(--gold-rgb), 0.08)', borderColor: 'rgba(var(--gold-rgb), 0.3)' }}
        >
          <div
            className="doppel-core"
            style={{
              padding: '24px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              background: 'transparent',
              boxShadow: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--plum)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: 2 }}>Visiter Notre Boutique & Déguster</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  Prenez rendez-vous pour une dégustation privée de nos chocolats de fête.
                </p>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury btn-luxury-primary"
            >
              <span>Réserver une visite</span>
              <div className="btn-icon-pill">
                <MessageCircle size={16} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Masonry Image Gallery */}
      <section className="shell">
        <div className="showroom-masonry">
          {officialShowroom.map((imgSrc, idx) => (
            <motion.div
              key={imgSrc}
              className="showroom-item"
              onClick={() => setActiveImageIndex(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.06 }}
            >
              <img
                src={imgSrc}
                alt={`Showroom WigaChoco mise en scène ${idx + 1}`}
                loading={idx < 6 ? 'eager' : 'lazy'}
              />
              <div className="showroom-hover-lens">
                <div style={{ textAlign: 'center' }}>
                  <Eye size={28} style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Agrandir
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={officialShowroom}
        activeIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onNavigate={(newIdx) => setActiveImageIndex(newIdx)}
      />
    </div>
  )
}
