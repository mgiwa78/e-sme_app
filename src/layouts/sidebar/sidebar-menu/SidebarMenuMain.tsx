/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title='Dashboard'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Menu</span>
        </div>
      </div>
      <SidebarMenuItemWithSub to='#' title='Agencies' icon='bi bi-activity'>
        <SidebarMenuItem to='#' title='CAC' hasBullet={true} />
        <SidebarMenuItem to='#' title='AEA' hasBullet={true} />
        <SidebarMenuItem to='#' title='SMEDAN' hasBullet={true} />
        <SidebarMenuItem to='#' title='FIRS' hasBullet={true} />
        <SidebarMenuItem to='#' title='SON' hasBullet={true} />
        <SidebarMenuItem to='#' title='NAFDAC' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem to='/#' title='Profile' icon='bi bi-person-square' />
      <SidebarMenuItem to='/#' title='Knowledge' icon='bi bi-journal-text' />
      <SidebarMenuItem to='/#' title='Tools' icon='bi bi-wrench-adjustable-circle' />
      <SidebarMenuItem to='/#' title='Funding' icon='bi bi-wallet2' />
      <SidebarMenuItem to='/#' title='Support' icon='bi bi-question-circle' />
      <SidebarMenuItem to='/#' title='Opportunity' icon='bi bi-list-task' />
      <SidebarMenuItem to='/#' title='FAQ' icon='bi bi-patch-question' />
    </>
  )
}

export {SidebarMenuMain}
