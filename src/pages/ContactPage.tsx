import React, { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Sparkles } from 'lucide-react'

interface ContactPageProps {
  whatsappUrl: string
}

export const ContactPage: React.FC<ContactPageProps> = ({ whatsappUrl }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('Commande Spéciale')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open WhatsApp with pre-filled content
    const text = `Bonjour WigaChoco,
Nom : ${name}
Téléphone : ${phone}
Sujet : ${subject}
Message : ${message}`

    const directUrl = `${whatsappUrl}?text=${encodeURIComponent(text)}`
    window.open(directUrl, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="page-content" style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Header */}
      <section className="shell" style={{ marginBottom: 60 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>Conciergerie & Atelier • Contact</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)', maxWidth: 840, marginBottom: 18 }}>
          Parlons de Votre Prochaine Attention Gourmande.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: 660, lineHeight: 1.8 }}>
          Une question sur nos créations, une composition personnalisée de naissance ou une commande d’entreprise ?
          Notre équipe est à votre entière écoute.
        </p>
      </section>

      {/* Grid: Contact Details & Interactive Form */}
      <section className="shell">
        <div
          className="responsive-two-column contact-layout"
        >
          {/* Left Column: Direct Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="doppel-shell">
              <div className="doppel-core" style={{ padding: 32 }}>
                <h3 style={{ fontSize: '1.45rem', marginBottom: 20 }}>Nos Lignes Directes</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <a
                    href="tel:+212523314502"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--cocoa)' }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(var(--plum-rgb), 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--plum)',
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Ligne Fixe Boutique
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>05 23 31 45 02</div>
                    </div>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--cocoa)' }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(37, 211, 102, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#25d366',
                      }}
                    >
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        WhatsApp Conciergerie
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>07 85 46 60 44</div>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@wigachoco.ma"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--cocoa)' }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(var(--gold-rgb), 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold)',
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        E-mail Officiel
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>contact@wigachoco.ma</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="doppel-shell">
              <div className="doppel-core" style={{ padding: 32 }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: 16 }}>Horaires & Accueil</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <Clock size={18} color="var(--gold)" style={{ marginTop: 3 }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Lundi au Samedi</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>09h30 – 19h30</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <MapPin size={18} color="var(--gold)" style={{ marginTop: 3 }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Maison WigaChoco Maroc</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Expéditions et livraisons climatisées express dans tout le Royaume.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="doppel-shell">
            <div className="doppel-core" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
              <div className="eyebrow-badge" style={{ marginBottom: 12 }}>
                <Sparkles size={14} />
                <span>Message Instantané</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Écrivez à Nos Artisans</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: 24 }}>
                Remplissez ce formulaire : il vous dirigera directement vers notre équipe avec votre demande pré-remplie.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--cocoa)',
                    }}
                  >
                    Votre Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mme / M. ..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="search-input"
                    style={{ paddingLeft: 18 }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--cocoa)',
                    }}
                  >
                    Numéro de Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="search-input"
                    style={{ paddingLeft: 18 }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--cocoa)',
                    }}
                  >
                    Nature de Votre Demande
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="sort-select"
                    style={{ width: '100%' }}
                  >
                    <option value="Cadeau de Naissance / Baptême">Cadeau de Naissance / Baptême</option>
                    <option value="Commande Spéciale Coffret">Commande Spéciale Coffret</option>
                    <option value="Cadeaux d’Affaires & Entreprises">Cadeaux d’Affaires & Entreprises</option>
                    <option value="Visite & Dégustation au Showroom">Visite & Dégustation au Showroom</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--cocoa)',
                    }}
                  >
                    Votre Message ou Précisions (quantité, date d’événement, etc.)
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Décrivez votre besoin..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 16,
                      border: '1px solid rgba(var(--cocoa-rgb), 0.14)',
                      background: '#ffffff',
                      color: 'var(--cocoa)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury btn-luxury-primary contact-submit-button"
                  style={{ width: '100%', justifyContent: 'center', height: 50, marginTop: 10 }}
                >
                  <span>Envoyer la demande sur WhatsApp</span>
                  <div className="btn-icon-pill">
                    <Send size={16} />
                  </div>
                </button>

                {submitted && (
                  <p style={{ color: '#2a5a3a', fontSize: '0.85rem', textAlign: 'center', margin: '4px 0 0' }}>
                    Votre message a été transmis à notre service WhatsApp !
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
