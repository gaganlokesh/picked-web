import '../styles/globals.css'

import { ReactElement } from 'react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
