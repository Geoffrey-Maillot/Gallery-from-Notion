import { useState, useEffect } from 'react'

/**
 * @returns {number} // window's width
 */
export const useGetWindowWidth = () => {
  const [dimensions, setDimensions] = useState(window.innerWidth)

  const handleResize = () => {
    setDimensions(
      window.innerWidth
    )
  }

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', handleResize)
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return dimensions
}
