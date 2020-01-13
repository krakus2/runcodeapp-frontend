import React, { Suspense } from 'react'
import { ThemeProvider } from 'styled-components'

import ContextProvider from './context/ContextProvider'
import GlobalStyle from './GlobalStyle'
import Header from './components/layout/Header'
import Form from './components/pages/Form'
import theme from './theme'

const App = () => (
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: '700',
              margin: '100px'
            }}
          >
            Loading...
          </div>
        }
      >
        <GlobalStyle />
        <Header />
        <Form />
      </Suspense>
    </ThemeProvider>
  </ContextProvider>
)

export default App
