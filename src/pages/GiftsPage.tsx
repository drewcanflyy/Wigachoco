import React, { useState } from 'react'
import { Sparkles, MessageCircle, Check, ArrowRight } from 'lucide-react'

interface GiftsPageProps {
  whatsappUrl: string
}

export const GiftsPage: React.FC<GiftsPageProps> = ({ whatsappUrl }) => {
  const [occasion, setOccasion] = useState<string | null>('Naissance Fille (Tons Poudrés & Or)')
  const [flavorPreference, setFlavorPreference] = useState<string | null>('Assortiment Prestige Chocolatier (Lait & Noir)')
  const [supportType, setSupportType] = useState<string | null>('Coupe Dorée Martelée sur Pied')

  const toggleOccasion = (item: string) => {
    setOccasion((prev) => (prev === item ? null : item))
  }

  const toggleFlavor = (item: string) => {
    setFlavorPreference((prev) => (prev === item ? null : item))
  }

  const toggleSupport = (item: string) => {
    setSupportType((prev) => (prev === item ? null : item))
  }

  const occasions = [
    'Naissance Fille (Tons Poudrés & Or)',
    'Naissance Garçon (Bleu Royal & Or)',
    'Mixte / Célébration (Ivoire & Or)',
    'Mariage & Fiançailles',
    'Cadeaux d’Entreprise & VIP',
  ]

  const flavorOptions = [
    'Assortiment Prestige Chocolatier (Lait & Noir)',
    'Éclats Gourmands Amandes, Pistaches & Sésame',
    'Douceurs & Truffes Sans Sucre (Gamme Santé)',
    'Sélection Complète de Maître Chocolatier',
  ]

  const supportOptions = [
    'Coupe Dorée Martelée sur Pied',
    'Coffret Cadeau Velours & Rubans de Soie',
    'Vase Gold Scintillant Strié',
    'Grand Plateau Miroir Cérémonie',
  ]

  const generateWhatsAppMessage = () => {
    const text = `Bonjour WigaChoco, je souhaite commander une composition sur-mesure :
• Événement : ${occasion || 'Non précisé'}
• Assortiment : ${flavorPreference || 'Non précisé'}
• Support de présentation : ${supportType || 'Non précisé'}
Pouvez-vous me proposer un devis personnalisé et les délais de livraison ? Merci !`
    return `${whatsappUrl}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="page-content" style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Header */}
      <section className="shell" style={{ marginBottom: 60 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>L’Art d’Offrir • Naissances & Événements</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)', maxWidth: 840, marginBottom: 20 }}>
          Célébrez les Naissances avec une Douceur Inoubliable.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: 660, lineHeight: 1.8 }}>
          Chaque arrivée au monde est une fête précieuse. Nos maîtres chocolatiers façonnent des corbeilles,
          coupes royales et écrins de naissance personnalisés avec le plus grand soin.
        </p>
      </section>

      {/* Interactive Bespoke Gift Box Simulator */}
      <section className="shell" style={{ marginBottom: 100 }}>
        <div className="doppel-shell">
          <div className="doppel-core" style={{ padding: 'clamp(32px, 5vw, 60px)' }}>
            <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 40px' }}>
              <div className="eyebrow-badge" style={{ marginBottom: 12 }}>
                <Sparkles size={14} />
                <span>Simulateur Sur-Mesure</span>
              </div>
              <h2 style={{ fontSize: '2.4rem', marginBottom: 12 }}>Composez Votre Présentation</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
                Sélectionnez vos critères pour transmettre votre demande directement à nos artisans sur WhatsApp.
              </p>
            </div>

            <div className="gift-options-grid">
              {/* Step 1: Occasion */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    color: 'var(--plum)',
                    marginBottom: 14,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  1. Célébration & Thème
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {occasions.map((item) => {
                    const isSelected = occasion === item
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleOccasion(item)}
                        className="gift-option-button"
                        style={{
                          border: isSelected ? '2px solid var(--plum)' : '1px solid rgba(var(--cocoa-rgb), 0.12)',
                          background: isSelected ? 'rgba(var(--plum-rgb), 0.06)' : '#ffffff',
                          color: isSelected ? 'var(--plum)' : 'var(--cocoa)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>{item}</span>
                        {isSelected && <Check size={16} color="var(--plum)" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Chocolate Assortment */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    color: 'var(--plum)',
                    marginBottom: 14,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  2. Assortiment Chocolatier
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {flavorOptions.map((item) => {
                    const isSelected = flavorPreference === item
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleFlavor(item)}
                        className="gift-option-button"
                        style={{
                          border: isSelected ? '2px solid var(--gold)' : '1px solid rgba(var(--cocoa-rgb), 0.12)',
                          background: isSelected ? 'rgba(var(--gold-rgb), 0.08)' : '#ffffff',
                          color: isSelected ? 'var(--plum)' : 'var(--cocoa)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>{item}</span>
                        {isSelected && <Check size={16} color="var(--gold)" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Support */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    color: 'var(--plum)',
                    marginBottom: 14,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  3. Écrin ou Présentoir
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {supportOptions.map((item) => {
                    const isSelected = supportType === item
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSupport(item)}
                        className="gift-option-button"
                        style={{
                          border: isSelected ? '2px solid var(--plum)' : '1px solid rgba(var(--cocoa-rgb), 0.12)',
                          background: isSelected ? 'rgba(var(--plum-rgb), 0.06)' : '#ffffff',
                          color: isSelected ? 'var(--plum)' : 'var(--cocoa)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>{item}</span>
                        {isSelected && <Check size={16} color="var(--plum)" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Generated Summary Box */}
            <div
              className="gift-summary"
              style={{
                marginTop: 48,
                padding: '24px 30px',
                borderRadius: 20,
                background: 'rgba(var(--cocoa-rgb), 0.03)',
                border: '1px solid rgba(var(--gold-rgb), 0.3)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Votre Composition Personnalisée</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  {[occasion, flavorPreference, supportType].filter(Boolean).join(' • ') || 'Aucun critère sélectionné (cliquez sur les options ci-dessus)'}
                </p>
              </div>

              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury btn-luxury-primary"
              >
                <span>Envoyer ma sélection sur WhatsApp</span>
                <div className="btn-icon-pill">
                  <MessageCircle size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="shell">
        <div
          className="responsive-two-column"
        >
          <div className="doppel-shell">
            <div className="doppel-core" style={{ overflow: 'hidden', height: 460 }}>
              <img
                src="/images/corporate-placeholder.png"
                alt="Présentation cadeaux naissances WigaChoco"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div>
            <div className="eyebrow-badge">
              <span className="gold-dot" />
              <span>Service Traiteur & Buffet</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: 18 }}>
              Une Présentation Digne des Plus Grands Jours.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 20 }}>
              Pour vos salons de naissance à la clinique ou à domicile, nos conseillers installent sur demande
              des plateaux assortis, des bonbonnières en cristal et des contenants gravés pour émerveiller vos invités.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 30 }}>
              Possibilité d’intégrer le prénom du nouveau-né sur les bagues de chocolat et les rubans satinés.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury btn-luxury-gold gift-event-button"
            >
              <span>Discuter avec notre responsable événementiel</span>
              <div className="btn-icon-pill">
                <ArrowRight size={16} />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
