import { createContext, useContext, useState, useEffect } from 'react'

const RecentlyViewedContext = createContext()

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  }
  return context
}

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('lepus-recently-viewed')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('lepus-recently-viewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id)
      // Add to beginning and limit to 8 items
      return [product, ...filtered].slice(0, 8)
    })
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

