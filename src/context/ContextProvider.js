import React from 'react'

import { useMatchMedia } from '../hooks'

import { ContextProvider } from './index'

const ContextComponent = ({ children }) => {
  const { isMobile } = useMatchMedia()

  return (
    <ContextProvider
      value={{
        isMobile
      }}
    >
      {children}
    </ContextProvider>
  )
}

export default ContextComponent
