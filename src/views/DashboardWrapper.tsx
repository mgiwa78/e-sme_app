/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

import '../assets/styles/ads.css'
// import {toAbsoluteUrl} from '../../helpers'
import {PageTitle} from '../layouts/core'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='row'>
        <div
          className='col-12 col-lg-6 my-10 ads-1'
          style={{
            backgroundImage: `url("/media/ads/1.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className='col-12 col-lg-6 my-10'>
          <div
            className='card ads-2'
            style={{
              backgroundImage: `url("/media/ads/2.jpg")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div className='col-12 col-xl-6 my-10'>
          <div
            className='card ads-3'
            style={{
              backgroundImage: `url("/media/ads/3.jpg")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
        <div className='col-6'></div>
      </div>
    </div>
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
