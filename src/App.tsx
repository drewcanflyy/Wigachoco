import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import { BoxProvider } from './context/BoxContext'
import { Navbar, type NavItem } from './components/Navbar'
import { Footer } from './components/Footer'
import { QuickViewModal } from './components/QuickViewModal'
import { BespokeBoxDrawer } from './components/BespokeBoxDrawer'
import { CustomCursor } from './components/CustomCursor'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { StoryPage } from './pages/StoryPage'
import { GiftsPage } from './pages/GiftsPage'
import { ShowroomPage } from './pages/ShowroomPage'
import { TipsPage } from './pages/TipsPage'
import { NewsletterPage } from './pages/NewsletterPage'
import { ContactPage } from './pages/ContactPage'
import type { OfficialProduct } from './types'

const whatsappUrl = 'https://wa.me/212785466044'

const pages: NavItem[] = [
  { label: 'Accueil', path: '/' },
  { label: 'Notre Histoire', path: '/notre-histoire' },
  { label: 'Nos Créations', path: '/produits' },
  { label: 'Cadeaux & Naissances', path: '/cadeaux-nouveau-nee' },
  { label: 'Showroom', path: '/showroom' },
  { label: 'Secrets & Astuces', path: '/astuces' },
  { label: 'Cercle Privilège', path: '/newsletters' },
  { label: 'Contact', path: '/contact' },
]

export function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [quickViewProduct, setQuickViewProduct] = useState<OfficialProduct | null>(null)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, nextPath: string) => {
    event.preventDefault()
    if (window.location.pathname === nextPath) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    switch (path) {
      case '/notre-histoire':
        return (
          <StoryPage
            key="/notre-histoire"
            onNavigate={navigate}
          />
        )
      case '/produits':
        return (
          <ProductsPage
            key="/produits"
            onQuickView={(product) => setQuickViewProduct(product)}
            whatsappUrl={whatsappUrl}
          />
        )
      case '/cadeaux-nouveau-nee':
        return (
          <GiftsPage
            key="/cadeaux-nouveau-nee"
            whatsappUrl={whatsappUrl}
          />
        )
      case '/showroom':
        return (
          <ShowroomPage
            key="/showroom"
            whatsappUrl={whatsappUrl}
          />
        )
      case '/astuces':
        return <TipsPage key="/astuces" />
      case '/newsletters':
        return <NewsletterPage key="/newsletters" />
      case '/contact':
        return <ContactPage key="/contact" whatsappUrl={whatsappUrl} />
      default:
        return (
          <HomePage
            key="/"
            onNavigate={navigate}
            onQuickView={(product) => setQuickViewProduct(product)}
            whatsappUrl={whatsappUrl}
          />
        )
    }
  }

  return (
    <BoxProvider>
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Subtle luxury cursor follower on desktop */}
        <CustomCursor />

        {/* Subtle tactile grain overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Floating Island Navigation */}
        <Navbar
          currentPath={path}
          pages={pages}
          onNavigate={navigate}
          whatsappUrl={whatsappUrl}
        />

        {/* Main Page Area with AnimatePresence */}
        <main style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bespoke Box Customizer Drawer */}
        <BespokeBoxDrawer
          whatsappUrl={whatsappUrl}
          onBrowseProducts={() => {
            window.history.pushState({}, '', '/produits')
            setPath('/produits')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />

        {/* Global Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          whatsappUrl={whatsappUrl}
        />

        {/* High-End Editorial Footer */}
        <Footer onNavigate={navigate} whatsappUrl={whatsappUrl} />
      </div>
    </BoxProvider>
  )
}

export default App
