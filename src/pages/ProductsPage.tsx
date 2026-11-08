import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  RotateCcw,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { officialProducts } from '../officialProducts'
import { useBox } from '../context/BoxContext'
import type { OfficialProduct, ProductCategory } from '../types'

interface ProductsPageProps {
  onQuickView: (product: OfficialProduct) => void
  whatsappUrl: string
}

function getProductCategory(name: string): ProductCategory {
  const n = name.toUpperCase()
  if (n.includes('SANS SUCRE')) return 'sans-sucre'
  if (n.includes('ÉCLAT') || n.includes('ECLAT')) return 'eclats'
  if (n.includes('TRUFFE') || n.includes('DOUCEUR')) return 'truffes'
  if (
    n.includes('COUPE') ||
    n.includes('VASE') ||
    n.includes('PLATEAU') ||
    n.includes('BOMBONIERE') ||
    n.includes('BONBONNIERE') ||
    n.includes('SUPPORT') ||
    n.includes('CORBEILLE')
  ) {
    return 'presentoirs'
  }
  return 'coffrets'
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onQuickView, whatsappUrl }) => {
  const productsPerPage = 24
  const { addItem } = useBox()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default')
  const [currentPage, setCurrentPage] = useState(1)

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: `Tous (${officialProducts.length})` },
    { id: 'coffrets', label: 'Coffrets & Mugs' },
    { id: 'eclats', label: 'Éclats Gourmands' },
    { id: 'truffes', label: 'Truffes & Douceurs' },
    { id: 'presentoirs', label: 'Présentoirs & Coupes' },
    { id: 'sans-sucre', label: 'Sans Sucre • Nutrition' },
  ]

  const filteredProducts = useMemo(() => {
    let result = officialProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.slug.toLowerCase().includes(search.toLowerCase())

      if (!matchesSearch) return false

      if (selectedCategory === 'all') return true
      return getProductCategory(product.name) === selectedCategory
    })

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [search, selectedCategory, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))
  const firstProductIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(firstProductIndex, firstProductIndex + productsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCategory, sortBy])

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ paddingTop: 140, paddingBottom: 120 }}>
      {/* Page Hero Header */}
      <section className="shell" style={{ marginBottom: 48 }}>
        <div className="eyebrow-badge">
          <span className="gold-dot" />
          <span>Haute Chocolaterie Artisanale</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', marginBottom: 16 }}>
          Notre Collection de Maître.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.08rem', maxWidth: 640 }}>
          {officialProducts.length} créations authentiques élaborées au Maroc avec un savoir-faire d’exception.
          Prix officiels en Dirhams marocains (MAD).
        </p>
      </section>

      {/* Interactive Toolbar */}
      <section className="shell">
        <div className="catalogue-toolbar">
          {/* Live Search */}
          <div className="search-box-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher par saveur, ingrédient (ex: gingembre, pistache, coupe)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SlidersHorizontal size={16} color="var(--text-muted)" />
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Tri par défaut</option>
              <option value="price-asc">Prix : Moins cher d’abord</option>
              <option value="price-desc">Prix : Plus cher d’abord</option>
              <option value="name">Alphabétique (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Reset Filter if search applied */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 28,
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            {filteredProducts.length > 0 ? (
              <>
                Affichage de <strong>{firstProductIndex + 1}–{Math.min(firstProductIndex + productsPerPage, filteredProducts.length)}</strong>{' '}
                sur <strong>{filteredProducts.length}</strong> création{filteredProducts.length > 1 ? 's' : ''}
              </>
            ) : (
              <>0 création</>
            )}
          </span>

          {(search || selectedCategory !== 'all' || sortBy !== 'default') && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
                setSortBy('default')
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--plum)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <RotateCcw size={14} />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>

        {/* Product Grid with Double-Bezel cards */}
        {filteredProducts.length > 0 ? (
          <>
          <motion.div layout className="product-grid-refined">
            <AnimatePresence>
              {currentProducts.map((product) => {
                const orderWaUrl = `${whatsappUrl}?text=${encodeURIComponent(
                  `Bonjour WigaChoco, je souhaite commander la création : "${product.name}" (${product.price} MAD).`
                )}`

                return (
                  <motion.article
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="doppel-shell product-luxury-card"
                  >
                    <div className="doppel-core" style={{ padding: 12 }}>
                      {/* Image Container with Quick View */}
                      <div
                        className="product-image-container"
                        onClick={() => onQuickView(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                        <div className="product-card-badge">
                          <Sparkles size={11} style={{ display: 'inline', marginRight: 4 }} />
                          Artisanal
                        </div>

                        <button
                          type="button"
                          className="product-quick-view-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            onQuickView(product)
                          }}
                        >
                          <Eye size={14} />
                          <span>Aperçu rapide</span>
                        </button>
                      </div>

                      {/* Product Metadata */}
                      <div className="product-meta">
                        <h3 className="product-name" title={product.name}>
                          {product.name}
                        </h3>

                        <div className="product-price-row">
                          <span className="product-price">
                            {product.price.toLocaleString('fr-MA', { minimumFractionDigits: 2 })}{' '}
                            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>MAD</span>
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <button
                              type="button"
                              onClick={() => addItem(product)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '5px 12px',
                                borderRadius: 999,
                                border: '1px solid rgba(var(--plum-rgb), 0.25)',
                                background: 'rgba(var(--plum-rgb), 0.06)',
                                color: 'var(--plum)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                              title="Ajouter au panier"
                            >
                              <ShoppingBag size={13} />
                              <span>Panier</span>
                            </button>

                            <a
                              href={orderWaUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="product-buy-wa"
                              title="Commander directement sur WhatsApp"
                            >
                              <span>Direct</span>
                              <MessageCircle size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
          {totalPages > 1 && (
            <nav
              aria-label="Pagination des créations"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                marginTop: 40,
              }}
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Page précédente"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 14px',
                  border: '1px solid rgba(var(--plum-rgb), 0.2)',
                  borderRadius: 999,
                  background: '#fff',
                  color: 'var(--plum)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.45 : 1,
                  fontWeight: 700,
                }}
              >
                <ChevronLeft size={17} />
                Précédent
              </button>

              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>
                Page {currentPage} sur {totalPages}
              </span>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Page suivante"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 14px',
                  border: '1px solid var(--plum)',
                  borderRadius: 999,
                  background: 'var(--plum)',
                  color: '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.45 : 1,
                  fontWeight: 700,
                }}
              >
                Suivant
                <ChevronRight size={17} />
              </button>
            </nav>
          )}
          </>
        ) : (
          <div
            style={{
              padding: '80px 20px',
              textAlign: 'center',
              background: '#ffffff',
              borderRadius: 24,
              border: '1px solid rgba(var(--cocoa-rgb), 0.08)',
            }}
          >
            <Sparkles size={40} color="var(--gold)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: '1.6rem', marginBottom: 8 }}>Aucune création trouvée</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
              Aucun produit ne correspond à votre recherche « {search} ».
            </p>
            <button
              type="button"
              className="btn-luxury btn-luxury-outline"
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
              }}
            >
              <span>Voir toute la collection</span>
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

