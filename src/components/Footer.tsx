import React from 'react'
import { Sparkles, MessageCircle, Phone, Mail, ArrowUpRight } from 'lucide-react'

interface FooterProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void
  whatsappUrl: string
}

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC<FooterProps> = ({ onNavigate, whatsappUrl }) => {
  return (
    <footer className="luxury-footer">
      <div className="shell">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <h3>WIGA<span>CHOCO</span></h3>
            <p>
              Maison artisanale marocaine d’excellence. Fondée avec amour pour sublimer les fèves de cacao et célébrer vos moments les plus précieux.
            </p>
            <div style={{ marginTop: 24 }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury btn-luxury-gold"
                style={{ fontSize: '0.82rem', padding: '6px 8px 6px 18px' }}
              >
                <span>Conseil & Commande</span>
                <div className="btn-icon-pill" style={{ width: 30, height: 30 }}>
                  <MessageCircle size={14} />
                </div>
              </a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="footer-col">
            <h4>Collections</h4>
            <ul>
              <li><a href="/produits" onClick={(e) => onNavigate(e, '/produits')}>Tous les Produits (85)</a></li>
              <li><a href="/cadeaux-nouveau-nee" onClick={(e) => onNavigate(e, '/cadeaux-nouveau-nee')}>Cadeaux & Naissances</a></li>
              <li><a href="/showroom" onClick={(e) => onNavigate(e, '/showroom')}>Galerie Showroom</a></li>
              <li><a href="/produits" onClick={(e) => onNavigate(e, '/produits')}>Éclats & Douceurs</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="footer-col">
            <h4>Maison</h4>
            <ul>
              <li><a href="/notre-histoire" onClick={(e) => onNavigate(e, '/notre-histoire')}>Notre Histoire Familiale</a></li>
              <li><a href="/astuces" onClick={(e) => onNavigate(e, '/astuces')}>Secrets & Dégustation</a></li>
              <li><a href="/newsletters" onClick={(e) => onNavigate(e, '/newsletters')}>Le Cercle Privilège</a></li>
              <li><a href="/contact" onClick={(e) => onNavigate(e, '/contact')}>Nous Contacter</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col">
            <h4>Atelier & Boutique</h4>
            <ul>
              <li>
                <a href="tel:+212523314502" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={14} color="var(--gold)" /> 05 23 31 45 02
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <MessageCircle size={14} color="var(--gold)" /> 07 85 46 60 44
                </a>
              </li>
              <li>
                <a href="mailto:contact@wigachoco.ma" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={14} color="var(--gold)" /> contact@wigachoco.ma
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/wigachoco/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@wigachoco</span>
                  <ArrowUpRight size={12} opacity={0.6} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {CURRENT_YEAR} WigaChoco. Tous droits réservés. Cacao de Maître & Passion Marocaine.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Sparkles size={14} color="var(--gold)" />
            <span>Wissal + Ghali • Fondé en 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

