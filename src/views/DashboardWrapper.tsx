/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
// import {toAbsoluteUrl} from '../../helpers'
import {PageTitle} from '../layouts/core'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'></div>
  </>
)

const DashboardWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Dashboard</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
