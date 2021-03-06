import { useCallback, useEffect, useState, useRef } from 'react'

import { sizes } from 'theme'

const BREAKPOINTS = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
}

const useMatchMedia = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState()
  const mobileMediaRef = useRef()

  const checkMedia = useCallback(() => {
    if (!mobileMediaRef.current.matches) {
      setCurrentBreakpoint(BREAKPOINTS.DESKTOP)
    } else {
      setCurrentBreakpoint(BREAKPOINTS.MOBILE)
    }
  }, [])

  useEffect(() => {
    mobileMediaRef.current = window.matchMedia(`(max-width: ${sizes.desktop})`)
    checkMedia()

    mobileMediaRef.current.addListener(checkMedia)
    return () => {
      mobileMediaRef.current.removeListener(checkMedia)
    }
  }, [])

  return {
    isMobile: currentBreakpoint === BREAKPOINTS.MOBILE
  }
}

export default useMatchMedia
