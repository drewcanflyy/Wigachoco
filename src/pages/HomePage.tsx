import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Heart,
  ShieldCheck,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { officialProducts } from '../officialProducts'
import type { OfficialProduct } from '../types'

gsap.registerPlugin(ScrollTrigger)

interface HomePageProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void
  onQuickView: (product: OfficialProduct) => void
  whatsappUrl: string
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuickView, whatsappUrl }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 45,
        opacity: 0,
        duration: 1,
        delay: 0.1,
      })
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.7'
        )
        .from(
          actionsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.6'
        )
        .from(
          visualRef.current,
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
          },
          '-=0.8'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Featured products for the Bento Showcase
  const bentoProduct1 = officialProducts.find((p) => p.slug === 'mug-wiga-gourmand') || officialProducts[0]
  const bentoProduct2 = officialProducts.find((p) => p.slug === 'douceur-terre-de-cacao') || officialProducts[1]
  const bentoProduct3 =
    officialProducts.find((p) => p.slug === 'douceur-gingembre-truffes-au-gingembre-frais-enrobees-de-chocolat-noir-sans-sucre-50-g') ||
    officialProducts[2]
  const bentoProduct4 =
    officialProducts.find((p) => p.slug === 'coupe-doree-sur-pied-martelee') || officialProducts[7]

  return (
    <div ref={heroRef}>
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="hero-wrapper">
        <div className="hero-ambient-orb orb-gold" />
        <div className="hero-ambient-orb orb-plum" />

        <div className="shell hero-grid">
          {/* Left Column: Kinetic Editorial Typography */}
          <div>
            <div className="eyebrow-badge">
              <span className="gold-dot" />
              <span>Haute Chocolaterie Artisanale • Maroc</span>
            </div>

            <h1 ref={titleRef} className="hero-title">
              L’Art Suprême du <span className="italic-accent">Chocolat</span> Artisanal.
            </h1>

            <p ref={descRef} className="hero-description">
              Savourez l’émotion et partagez le plaisir. Cinq années de recherche et une passion familiale
              réunies pour composer des créations chocolatées d’un raffinement incomparable.
            </p>

            <div ref={actionsRef} className="hero-actions-group">
              <a
                href="/produits"
                onClick={(e) => onNavigate(e, '/produits')}
                className="btn-luxury btn-luxury-primary"
              >
                <span>Découvrir la Collection (85)</span>
                <div className="btn-icon-pill">
                  <ArrowRight size={16} />
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury btn-luxury-outline"
              >
                <span>Commander sur WhatsApp</span>
                <div className="btn-icon-pill">
                  <MessageCircle size={16} />
                </div>
              </a>
            </div>

            {/* Quick Live Stats Bar */}
            <div className="hero-stats-bar">
              <div className="stat-item">
                <h4>85+</h4>
                <span>Créations Rares</span>
              </div>
              <div className="stat-item">
                <h4>100%</h4>
                <span>Pur Beurre de Cacao</span>
              </div>
              <div className="stat-item">
                <h4>5 Ans</h4>
                <span>De Recherche & Passion</span>
              </div>
            </div>
          </div>

          {/* Right Column: Double-Bezel Visual with Video Visualizer */}
          <div ref={visualRef} className="hero-visual-card">
            <div className="doppel-shell">
              <div className="doppel-core">
                <div className="hero-main-image-wrap">
                  <video
                    src="/images/wigachoco-hero-video.mp4?v=3"
                    poster="/images/wigachoco-hero-placeholder.png"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    <source src="/images/wigachoco-hero-video.mp4?v=3" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
                  </video>
                </div>
              </div>
            </div>

            {/* Floating Luxury Badge */}
            <motion.div
              className="hero-floating-badge"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="floating-badge-icon">
                <Sparkles size={20} />
              </div>
              <div className="floating-badge-text">
                <h5>Maison WigaChoco</h5>
                <p>Nouveau-nés, fêtes & réceptions d'exception.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- CURATED BENTO SHOWCASE ----------------- */}
      <section className="section-py shell">
        <div className="section-header-split">
          <div>
            <div className="eyebrow-badge">
              <span className="gold-dot" />
              <span>Signatures de la Maison</span>
            </div>
            <h2>Créations & Nouveautés Remarquables.</h2>
          </div>
          <div>
            <p>
              Du cacao grand cru aux présentoirs d’orfèvrerie pour vos réceptions, explorez l’univers WigaChoco.
            </p>
            <div style={{ marginTop: 14 }}>
              <a
                href="/produits"
                onClick={(e) => onNavigate(e, '/produits')}
                style={{
                  color: 'var(--plum)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>Voir le catalogue complet</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Gapless Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: Large Spotlight (8 cols) */}
          <div className="bento-card bento-col-8 bento-hero-card">
            <img src={bentoProduct1.image} alt={bentoProduct1.name} className="bento-bg-img" />
            <div className="bento-overlay" />
            <div className="bento-content">
              <div className="eyebrow-badge cream">
                <span>Sélection Prestige</span>
              </div>
              <h3>{bentoProduct1.name}</h3>
              <p>
                Un hommage au plaisir gourmand. Idéal pour offrir ou sublimer un moment de dégustation intimiste.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--champagne)',
                  }}
                >
                  {bentoProduct1.price} MAD
                </span>
                <button
                  type="button"
                  onClick={() => onQuickView(bentoProduct1)}
                  className="btn-luxury btn-luxury-gold"
                  style={{ padding: '6px 8px 6px 18px', fontSize: '0.82rem' }}
                >
                  <span>Aperçu Rapide</span>
                  <div className="btn-icon-pill" style={{ width: 28, height: 28 }}>
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Douceur Terre de Cacao (4 cols) */}
          <div className="bento-card bento-col-4" style={{ padding: 24, justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  aspectRatio: '1 / 0.85',
                  borderRadius: 16,
                  overflow: 'hidden',
                  marginBottom: 18,
                  background: '#f2eae1',
                }}
              >
                <img
                  src={bentoProduct2.image}
                  alt={bentoProduct2.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="eyebrow-badge" style={{ marginBottom: 8 }}>
                <span>Grand Cru</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>{bentoProduct2.name}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Intensité cacaotée raffinée aux notes torréfiées subtiles.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingTop: 14,
                borderTop: '1px solid rgba(var(--cocoa-rgb), 0.08)',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--plum)', fontSize: '1.15rem' }}>
                {bentoProduct2.price} MAD
              </span>
              <button
                type="button"
                onClick={() => onQuickView(bentoProduct2)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold)',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
              >
                Découvrir →
              </button>
            </div>
          </div>

          {/* Card 3: Douceur Gingembre Sans Sucre (4 cols) */}
          <div className="bento-card bento-col-4" style={{ padding: 24, justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  aspectRatio: '1 / 0.85',
                  borderRadius: 16,
                  overflow: 'hidden',
                  marginBottom: 18,
                  background: '#f2eae1',
                }}
              >
                <img
                  src={bentoProduct3.image}
                  alt={bentoProduct3.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="eyebrow-badge" style={{ marginBottom: 8, color: '#2a5a3a', borderColor: '#2a5a3a40' }}>
                <span>Sans Sucre • Diététique</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Truffes Gingembre Frais</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Recette exclusive élaborée avec notre fondatrice nutritionniste.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingTop: 14,
                borderTop: '1px solid rgba(var(--cocoa-rgb), 0.08)',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--plum)', fontSize: '1.15rem' }}>
                {bentoProduct3.price} MAD
              </span>
              <button
                type="button"
                onClick={() => onQuickView(bentoProduct3)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold)',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
              >
                Découvrir →
              </button>
            </div>
          </div>

          {/* Card 4: Coupe Dorée Martelée (8 cols) */}
          <div className="bento-card bento-col-8 bento-hero-card">
            <img src={bentoProduct4.image} alt={bentoProduct4.name} className="bento-bg-img" />
            <div className="bento-overlay" />
            <div className="bento-content">
              <div className="eyebrow-badge cream">
                <span>Cérémonies & Réceptions</span>
              </div>
              <h3>{bentoProduct4.name}</h3>
              <p>
                Présentoirs d’orfèvrerie et coupes royales pour sublimer vos buffets de naissance et tables d’honneur.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--champagne)',
                  }}
                >
                  {bentoProduct4.price} MAD
                </span>
                <button
                  type="button"
                  onClick={() => onQuickView(bentoProduct4)}
                  className="btn-luxury btn-luxury-gold"
                  style={{ padding: '6px 8px 6px 18px', fontSize: '0.82rem' }}
                >
                  <span>Voir le Présentoir</span>
                  <div className="btn-icon-pill" style={{ width: 28, height: 28 }}>
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SENSORY ARTISANAL PILLARS ----------------- */}
      <section className="section-py shell" style={{ borderTop: '1px solid rgba(var(--cocoa-rgb), 0.08)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto 60px', textAlign: 'center' }}>
          <div className="eyebrow-badge">
            <span className="gold-dot" />
            <span>L’Artisanat au Coeur</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', marginBottom: 18 }}>
            Pourquoi Choisir WigaChoco.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Une alliance unique entre l’art noble du maître chocolatier et la rigueur scientifique de la nutrition.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Pillar 1 */}
          <div className="doppel-shell">
            <div className="doppel-core" style={{ padding: 32 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(var(--plum-rgb), 0.1)',
                  color: 'var(--plum)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Savoir-Faire Familial</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Fondée par Mouna, son époux et leur fille nutritionniste. Chaque recette est le fruit de 5 ans
                de perfectionnement gustatif et technique.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="doppel-shell">
            <div className="doppel-core" style={{ padding: 32 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(var(--gold-rgb), 0.15)',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Ingrédients Purs & Nobles</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                100% pur beurre de cacao sans graisses végétales hydrogénées. Ingrédients nobles: amandes grillées,
                gingembre frais, noisettes du Piémont.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="doppel-shell">
            <div className="doppel-core" style={{ padding: 32 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(var(--plum-rgb), 0.1)',
                  color: 'var(--plum)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Heart size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Cadeaux & Naissances</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Des compositions sur-mesure pour célébrer les naissances, mariages et cadeaux d’affaires
                avec des rubans soyeux et présentoirs d'orfèvre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CALL TO ACTION BANNER ----------------- */}
      <section className="shell" style={{ marginBottom: 100 }}>
        <div
          className="doppel-shell dark"
          style={{
            background: 'var(--cocoa)',
            padding: 12,
            boxShadow: '0 25px 60px -15px rgba(var(--cocoa-rgb), 0.4)',
          }}
        >
          <div
            className="doppel-core dark"
            style={{
              padding: ' clamp(40px, 6vw, 80px)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="eyebrow-badge cream" style={{ marginBottom: 16 }}>
              <span className="gold-dot" />
              <span>Service Conciergerie Privée</span>
            </div>

            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                maxWidth: 680,
                marginBottom: 20,
              }}
            >
              Envie d’une attention sur-mesure pour votre événement ?
            </h2>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: 540,
                marginBottom: 36,
                fontSize: '1.05rem',
              }}
            >
              Nos artisans chocolatiers composent vos corbeilles, coffrets et assortiments personnalisés avec
              livraison soignée partout au Maroc.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury btn-luxury-gold"
              >
                <span>Composer sur WhatsApp</span>
                <div className="btn-icon-pill">
                  <MessageCircle size={16} />
                </div>
              </a>

              <a
                href="/cadeaux-nouveau-nee"
                onClick={(e) => onNavigate(e, '/cadeaux-nouveau-nee')}
                className="btn-luxury btn-luxury-glass"
              >
                <span>Simulateur Cadeaux Naissance</span>
                <div className="btn-icon-pill">
                  <Layers size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

