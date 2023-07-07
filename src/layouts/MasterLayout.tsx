import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from '../layouts/header'
import {ScrollTop} from '../layouts/scroll-top'
import {Content} from '../layouts/content'
import {FooterWrapper} from '../layouts/footer'
import {Sidebar} from '../layouts/sidebar'
import {
  DrawerMessenger,
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
  ThemeModeProvider,
} from '../components/partials'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import {ToolbarWrapper} from '../layouts/toolbar'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
          <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            <HeaderWrapper />
            <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
              <Sidebar />
              <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                <div className='d-flex flex-column flex-column-fluid'>
                  <ToolbarWrapper />
                  <Content>
                    <Outlet />
                  </Content>
                </div>
                <FooterWrapper />
              </div>
            </div>
          </div>
        </div>

        {/* begin:: Drawers */}
        <ActivityDrawer />
        <DrawerMessenger />
        {/* end:: Drawers */}

        {/* begin:: Modals */}
        <InviteUsers />
        <UpgradePlan />
        {/* end:: Modals */}
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
