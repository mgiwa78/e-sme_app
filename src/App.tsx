import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from './i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './layouts/core'
import {MasterInit} from './layouts/MasterInit'
import {AuthInit} from './services/auth'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
