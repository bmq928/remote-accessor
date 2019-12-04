import React from 'react'
import {setGlobal} from 'reactn'

import { ProcessList, Sidebar, store } from './vendors'
import './ProcessMonitorPage.scss'

setGlobal(store)
export default function ProcessMonitorPage() {
  return (
    <div className="ProcessMonitorPage">
      <Sidebar />
      <ProcessList />
    </div>
  )
}
