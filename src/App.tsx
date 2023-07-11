import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from './layouts/core'
import {MasterInit} from './layouts/MasterInit'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <Outlet />
        <MasterInit />
      </LayoutProvider>
    </Suspense>
  )
}

export {App}
