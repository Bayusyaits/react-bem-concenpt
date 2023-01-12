import React from 'react'
import type { PropsWithChildren } from 'react'

import Footer from 'components/footer'
export interface ViewProps {
  handleSnackbarClose: (el: string) => void
}

export default function LayoutView({ 
  children, 
  ...props }: PropsWithChildren<any>) {
  return (
    <>
      <main id="main">
        {children}
      </main>
      {<Footer />}
    </>
  )
}
