import React from 'react'
import { Award, Heart, ShieldCheck, Sparkles, Clock, Users, ArrowRight } from 'lucide-react'

interface StoryPageProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  const values = [
    {
      title: 'Savoir-Faire Artisanal',
      desc: 'Une technicité sans compromis, où chaque tablette, éclat et praliné est manipulé avec la patience et la minutie des grands maîtres.',
      icon: Award,
    },
    {
      title: 'Authenticité & Modernité',
      desc: 'Un héritage culinaire marocain sublimé par les techniques européennes de tempérage et les exigences diététiques contemporaines.',
      icon: Sparkles,
    },
    {
      title: 'Engagement Émotionnel',
      desc: 'Le chocolat n’est pas qu’un mets : c’est un message d’amour, de tendresse pour une naissance ou un hommage pour un proche.',
      icon: Heart,
    },
    {
      title: 'Élégance & Pureté',
      desc: 'Une esthétique sobre et noble, des écrins dorés martelés aux rubans de soie, pour une expérience visuelle et tactile intégrale.',
      icon: ShieldCheck,
    },
    {
      title: 'Éthique & Bien-Être',
      desc: 'Un cacao pur beurre sélectionné avec responsabilité, des alternatives sans sucres raffinés pour concilier gourmandise et santé.',
      icon: Users,
    },
  ]

  return (
    <div className="page-content" style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Editorial Header */}
      <section className="shell" style={{ marginBottom: 70 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>Histoire Familiale • Fondée en 2025</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', maxWidth: 860, marginBottom: 20 }}>
          Le Rêve d’une Famille Marocaine Passionnée par le Cacao.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: 680, lineHeight: 1.8 }}>
          Cinq années de recherche, d’études et d’expérimentations culinaires ont donné naissance à WigaChoco
          en décembre 2025, une maison dédiée à la pure émotion chocolatée.
        </p>
      </section>

      {/* Narrative Split Chapter 1 */}
      <section className="shell" style={{ marginBottom: 100 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 60,
            alignItems: 'center',
          }}
        >
          <div className="doppel-shell">
            <div className="doppel-core" style={{ overflow: 'hidden', height: 480 }}>
              <img
                src="/images/corporate-placeholder.png"
                alt="Atelier de création artisanale WigaChoco"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div>
            <div className="eyebrow-badge">
              <span className="gold-dot" />
              <span>La Genèse</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Une passion transmise et partagée.</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 18, fontSize: '1.02rem' }}>
              À l’origine de l’aventure : <strong>Mouna</strong>, son époux et leur fille, nutritionniste et
              diététicienne. Tous trois partagent un amour inconditionnel de l’art culinaire, de la pâtisserie
              fine et du chocolat transmis entre générations.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '1.02rem' }}>
              Après avoir étudié avec ferveur les secrets du cacao, les courbes de cristallisation et l’équilibre
              entre douceur et santé, la famille concrétise son ambition : offrir au Maroc un chocolat artisanal
              comparable aux plus grandes maisons internationales.
            </p>

            <div
              style={{
                padding: '20px 24px',
                borderRadius: 16,
                background: 'rgba(var(--gold-rgb), 0.1)',
                borderLeft: '4px solid var(--gold)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: 'var(--cocoa)',
                  margin: 0,
                }}
              >
                « Le chocolat doit émouvoir l’âme tout en respectant le corps. C’est la promesse intime de notre maison. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Name Origin Chapter 2 */}
      <section className="shell" style={{ marginBottom: 100 }}>
        <div
          className="doppel-shell dark"
          style={{
            background: 'var(--plum)',
            color: '#ffffff',
            padding: 12,
          }}
        >
          <div
            className="doppel-core dark"
            style={{
              padding: 'clamp(40px, 6vw, 70px)',
              background: 'var(--plum)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 50,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow-badge cream" style={{ marginBottom: 16 }}>
                <span>L’Héritage du Nom</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '2.8rem', marginBottom: 18 }}>
                Wissal + Ghali = WigaChoco.
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                Le nom <strong>WigaChoco</strong> puise sa force dans les initiales de Wissal et Ghali, les
                enfants des membres fondateurs. Il incarne l’amour familial, la continuité des valeurs et le désir
                de bâtir un héritage d’élégance pérenne pour les générations futures.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="story-milestone-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <Clock size={20} color="var(--gold)" />
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: 0 }}>Décembre 2025</h4>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', margin: 0 }}>
                  Ouverture officielle de notre showroom et lancement des collections exclusives pour nouveau-nés.
                </p>
              </div>

              <div className="story-milestone-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <Award size={20} color="var(--gold)" />
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: 0 }}>Conception Diététique</h4>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', margin: 0 }}>
                  Formulation par notre fille nutritionniste de truffes fraîches et douceurs sans sucre ajouté.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="shell">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 50px' }}>
          <div className="eyebrow-badge">
            <span className="gold-dot" />
            <span>Nos Engagements Inébranlables</span>
          </div>
          <h2 style={{ fontSize: '2.8rem', marginBottom: 14 }}>Les Piliers de la Maison.</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Chaque geste en laboratoire et chaque ruban noué répond à une charte d’excellence stricte.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.title} className="doppel-shell">
                <div className="doppel-core" style={{ padding: 28 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'rgba(var(--plum-rgb), 0.08)',
                      color: 'var(--plum)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 18,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{v.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <a
            href="/produits"
            onClick={(e) => onNavigate(e, '/produits')}
            className="btn-luxury btn-luxury-primary"
          >
            <span>Découvrir nos créations</span>
            <div className="btn-icon-pill">
              <ArrowRight size={16} />
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}
