import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles, Mail, CheckCircle2, ArrowRight, ShieldCheck, Gift } from 'lucide-react'

export const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Trigger luxury confetti celebration!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c98a55', '#592a35', '#faf6f1'],
    })

    setIsSubscribed(true)
  }

  const articles = [
    {
      title: 'L’Art du Tempérage Parfait : Le Secret de la Cristallisation',
      category: 'Atelier & Savoir-Faire',
      date: 'Printemps 2026',
      desc: 'Plongée dans les coulisses de notre laboratoire : pourquoi 31°C est la température magique du beurre de cacao pur.',
    },
    {
      title: 'Truffes au Gingembre Frais Sans Sucre : Genèse d’une Recette Saine',
      category: 'Nutrition & Santé',
      date: 'Édition Spéciale',
      desc: 'Comment notre fille diététicienne a concilié intensité cacaotée, fraîcheur du gingembre et absence totale de sucres raffinés.',
    },
    {
      title: 'Guide : Réussir la Présentation de Chocolats pour une Naissance',
      category: 'Événements & Célébrations',
      date: 'Tendances',
      desc: 'Choix des contenants, équilibre des couleurs or et pastel, conservation durant les visites à la clinique.',
    },
  ]

  return (
    <div style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Header */}
      <section className="shell" style={{ marginBottom: 60 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>Le Cercle Privilège WigaChoco</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)', maxWidth: 840, marginBottom: 18 }}>
          L’Écrin des Amateurs de Grand Cacao.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: 660, lineHeight: 1.8 }}>
          Rejoignez notre cercle restreint pour recevoir nos lettres confidentielles, invitations aux dégustations
          privées et avant-premières des coffrets de fête.
        </p>
      </section>

      {/* Subscription Card */}
      <section className="shell" style={{ marginBottom: 90 }}>
        <div className="doppel-shell dark" style={{ background: 'var(--plum)' }}>
          <div
            className="doppel-core dark"
            style={{
              padding: 'clamp(36px, 6vw, 70px)',
              background: 'var(--plum)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow-badge cream" style={{ marginBottom: 16 }}>
                <Sparkles size={14} />
                <span>Adhésion Gratuite</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '2.4rem', marginBottom: 16 }}>
                Recevez nos Inspirations Gourmandes
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: 28 }}>
                Une missive par mois, sans superflu. Juste l’essence de l’artisanat chocolatier et des privilèges
                réservés à nos membres.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--champagne)', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--gold)" />
                  <span>Accès prioritaire aux séries limitées de Ramadan & fêtes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--champagne)', fontSize: '0.9rem' }}>
                  <Gift size={18} color="var(--gold)" />
                  <span>Avantages exclusifs sur vos créations de naissance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--champagne)', fontSize: '0.9rem' }}>
                  <ShieldCheck size={18} color="var(--gold)" />
                  <span>Confidentialité absolue : vos coordonnées restent protégées</span>
                </div>
              </div>
            </div>

            <div>
              {isSubscribed ? (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    padding: 36,
                    borderRadius: 20,
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <Sparkles size={36} color="var(--gold)" style={{ marginBottom: 12 }} />
                  <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: 8 }}>
                    Bienvenue dans le Cercle !
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', margin: 0 }}>
                    Votre inscription avec <strong>{email}</strong> est confirmée. Surveillez votre boîte de réception pour votre premier privilège.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '36px 30px',
                    borderRadius: 22,
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <label
                    htmlFor="newsletter-email"
                    style={{
                      display: 'block',
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: 12,
                      fontSize: '0.95rem',
                    }}
                  >
                    Votre adresse e-mail professionnelle ou personnelle
                  </label>

                  <div style={{ position: 'relative', marginBottom: 20 }}>
                    <Mail
                      size={18}
                      color="rgba(255,255,255,0.6)"
                      style={{ position: 'absolute', left: 16, top: 16 }}
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="nom@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        height: 52,
                        paddingLeft: 46,
                        paddingRight: 16,
                        borderRadius: 999,
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury btn-luxury-gold"
                    style={{ width: '100%', justifyContent: 'center', height: 50 }}
                  >
                    <span>Rejoindre le Cercle Privilège</span>
                    <div className="btn-icon-pill" style={{ width: 32, height: 32 }}>
                      <ArrowRight size={16} />
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles & Journal */}
      <section className="shell">
        <div style={{ maxWidth: 700, marginBottom: 40 }}>
          <div className="eyebrow-badge">
            <span className="gold-dot" />
            <span>Le Journal du Chocolatier</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 12 }}>Dernières Publications & Chroniques.</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Articles et récits de nos artisans pour approfondir votre culture du cacao noble.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {articles.map((item) => (
            <div key={item.title} className="doppel-shell">
              <div className="doppel-core" style={{ padding: 28, justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--plum)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 12, lineHeight: 1.35 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>

                <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(var(--cocoa-rgb), 0.08)' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem' }}>
                    Disponible prochainement aux membres →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

