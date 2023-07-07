/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../helpers'
import {PageTitle} from '../../layouts/core'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'></div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
