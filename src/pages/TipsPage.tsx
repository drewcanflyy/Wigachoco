import React, { useState } from 'react'
import { Eye, Volume2, Hand, Wind, Coffee, Thermometer, Sparkles, Heart } from 'lucide-react'

export const TipsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'degustation' | 'conservation' | 'accords' | 'nutrition'>('degustation')

  const sensorySteps = [
    {
      sense: '1. La Vue',
      icon: Eye,
      title: 'L’Éclat & le Brillant Miroir',
      text: 'Un chocolat parfaitement tempéré présente une robe satinée, sans voile blanc ni rayures. Ce brillant témoigne de la cristallisation idéale du beurre de cacao sous la forme bêta V.',
    },
    {
      sense: '2. L’Ouïe',
      icon: Volume2,
      title: 'Le Claquement (« Le Snap »)',
      text: 'Brisez un morceau près de votre oreille. Le son doit être franc, net et sec. Un bruit sourd ou mou indique un chocolat qui a pris la chaleur ou manque de pur beurre de cacao.',
    },
    {
      sense: '3. Le Toucher',
      icon: Hand,
      title: 'La Fonte Contrôlée',
      text: 'Le beurre de cacao fond précisément à la température du corps humain (34-35°C). Entre vos doigts, il doit rester ferme pendant quelques secondes avant de déposer un film satiné.',
    },
    {
      sense: '4. L’Odorat',
      icon: Wind,
      title: 'Le Bouquet Aromatique',
      text: 'Frottez doucement la surface et respirez profondément. Vous percevrez d’abord les notes torréfiées, puis les arômes boisés, floraux ou fruités propres à chaque terroir de cacao.',
    },
    {
      sense: '5. Le Goût',
      icon: Sparkles,
      title: 'La Fonte sur la Langue',
      text: 'Ne croquez pas immédiatement. Laissez le carré fondre lentement contre le palais. La chaleur de votre bouche libère successivement l’acidité noble, l’amertume douce et la longueur en bouche.',
    },
  ]

  return (
    <div style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Header */}
      <section className="shell" style={{ marginBottom: 60 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>Masterclass de l’Artisan • Secrets & Conseils</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)', maxWidth: 840, marginBottom: 18 }}>
          L’Art d’Apprécier le Vrai Chocolat.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: 660, lineHeight: 1.8 }}>
          Les artisans chocolatiers et la diététicienne de WigaChoco partagent leurs secrets pour sublimer
          chaque instant de dégustation à la maison.
        </p>
      </section>

      {/* Interactive Tabs */}
      <section className="shell" style={{ marginBottom: 50 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button
            type="button"
            className={`category-pill ${activeTab === 'degustation' ? 'active' : ''}`}
            onClick={() => setActiveTab('degustation')}
          >
            Le Rituel en 5 Sens
          </button>
          <button
            type="button"
            className={`category-pill ${activeTab === 'conservation' ? 'active' : ''}`}
            onClick={() => setActiveTab('conservation')}
          >
            Conservation Idéale
          </button>
          <button
            type="button"
            className={`category-pill ${activeTab === 'accords' ? 'active' : ''}`}
            onClick={() => setActiveTab('accords')}
          >
            Accords Marocains & Thés
          </button>
          <button
            type="button"
            className={`category-pill ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Chocolat & Nutrition
          </button>
        </div>
      </section>

      {/* Tab Content 1: Rituel en 5 Sens */}
      {activeTab === 'degustation' && (
        <section className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {sensorySteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.sense} className="doppel-shell">
                  <div className="doppel-core" style={{ padding: 28 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--gold)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {step.sense}
                      </span>
                      <Icon size={20} color="var(--plum)" />
                    </div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: 12 }}>{step.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                      {step.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Tab Content 2: Conservation */}
      {activeTab === 'conservation' && (
        <section className="shell">
          <div className="doppel-shell">
            <div className="doppel-core" style={{ padding: 'clamp(32px, 5vw, 60px)' }}>
              <div style={{ maxWidth: 740 }}>
                <div className="eyebrow-badge" style={{ marginBottom: 16 }}>
                  <Thermometer size={16} />
                  <span>Température Optimale : 16°C – 19°C</span>
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 18 }}>Comment Préserver Vos Écrins WigaChoco</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 20 }}>
                  Le chocolat est un aliment délicat qui craint trois ennemis majeurs : la chaleur excessive,
                  l’humidité et les odeurs ambiantes.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ padding: 18, borderRadius: 14, background: '#faf6f1', borderLeft: '4px solid var(--plum)' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Évitez le réfrigérateur classique</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                      Le froid brutal et l’humidité du frigo provoquent la migration du sucre en surface (« le blanchiment »).
                      Conservez-le plutôt dans une pièce fraîche ou une cave à vin tempérée.
                    </p>
                  </div>

                  <div style={{ padding: 18, borderRadius: 14, background: '#faf6f1', borderLeft: '4px solid var(--gold)' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: 4 }}>À l’abri des odeurs</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                      Le beurre de cacao absorbe immédiatement les effluves d’épices ou de café environnants. Gardez toujours vos chocolats dans leur boîte hermétiquement fermée.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab Content 3: Accords Marocains */}
      {activeTab === 'accords' && (
        <section className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div className="doppel-shell">
              <div className="doppel-core" style={{ padding: 30 }}>
                <Coffee size={28} color="var(--gold)" style={{ marginBottom: 14 }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: 10 }}>Thé Vert à la Menthe & Chocolat Noir</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                  La vivacité et la fraîcheur mentholée du thé marocain réveillent l’amertume boisée de notre
                  chocolat noir grand cru 70%, créant un contraste thermique et aromatique sublime.
                </p>
              </div>
            </div>

            <div className="doppel-shell">
              <div className="doppel-core" style={{ padding: 30 }}>
                <Sparkles size={28} color="var(--plum)" style={{ marginBottom: 14 }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: 10 }}>Café Épicé & Éclats Caramel Noisettes</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                  Les touches de cardamome ou de cannelle d’un café bien serré prolongent les rondeurs beurrées
                  et pralinées de nos éclats de caramel dorés.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab Content 4: Nutrition */}
      {activeTab === 'nutrition' && (
        <section className="shell">
          <div className="doppel-shell">
            <div className="doppel-core" style={{ padding: 'clamp(32px, 5vw, 60px)' }}>
              <div style={{ maxWidth: 740 }}>
                <div className="eyebrow-badge" style={{ marginBottom: 16 }}>
                  <Heart size={16} />
                  <span>Conseils de notre Diététicienne-Nutritionniste</span>
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 18 }}>Le Plaisir Allié à la Santé</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 20 }}>
                  « Le chocolat de haute qualité n’est pas un pêché : c’est une source exceptionnelle de polyphénols,
                  de magnésium et de théobromine favorisant le bien-être cérébral et cardiovasculaire. »
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                  Découvrez également notre gamme exclusive de <strong>douceurs sans sucre ajouté</strong>,
                  élaborée spécifiquement pour les personnes surveillant leur glycémie sans renoncer à l’émotion d’un chocolat artisanal.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
