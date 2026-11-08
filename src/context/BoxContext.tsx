import React, { createContext, useContext, useState, useEffect } from 'react'
import type { OfficialProduct } from '../types'

export interface BoxItem {
  product: OfficialProduct
  quantity: number
}

interface BoxContextType {
  items: BoxItem[]
  addItem: (product: OfficialProduct) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, delta: number) => void
  clearBox: () => void
  totalCount: number
  totalPrice: number
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  ribbonColor: string
  setRibbonColor: (color: string) => void
}

const BoxContext = createContext<BoxContextType | undefined>(undefined)

const STORAGE_KEY = 'wigachoco_custom_box'

export const BoxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BoxItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [ribbonColor, setRibbonColor] = useState('Or Artisanal Scintillant')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors
    }
  }, [items])

  const addItem = (product: OfficialProduct) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.slug === product.slug)
      if (existing) {
        return prev.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setIsDrawerOpen(true)
  }

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.product.slug !== slug))
  }

  const updateQuantity = (slug: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.slug === slug) {
            const newQ = item.quantity + delta
            return newQ > 0 ? { ...item, quantity: newQ } : null
          }
          return item
        })
        .filter((item): item is BoxItem => item !== null)
    )
  }

  const clearBox = () => setItems([])

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <BoxContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBox,
        totalCount,
        totalPrice,
        isDrawerOpen,
        setIsDrawerOpen,
        ribbonColor,
        setRibbonColor,
      }}
    >
      {children}
    </BoxContext.Provider>
  )
}

export const useBox = () => {
  const context = useContext(BoxContext)
  if (!context) {
    throw new Error('useBox must be used within a BoxProvider')
  }
  return context
}

