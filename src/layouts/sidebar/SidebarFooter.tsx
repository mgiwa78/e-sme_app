/* eslint-disable react/jsx-no-target-blank */
import {KTIcon} from '../../helpers'
import {useAuth} from '../../services/auth/Auth'

const SidebarFooter = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <button
        onClick={logout}
        className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='Metronic Docs & Components'
      >
        <span className='btn-label'>Sign Out</span>
        <KTIcon iconName='document' className='btn-icon fs-2 m-0' />
      </button>
    </div>
  )
}

export {SidebarFooter}
