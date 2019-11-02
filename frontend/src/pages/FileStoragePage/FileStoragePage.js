import React, { useEffect } from 'react'
import { setGlobal } from 'reactn'

import { FileExplorer, FileRepresentation, svc, store } from './vendors'
import './FileStoragePage.scss'

export default function FileStoragePage() {
  setGlobal(store)
  useEffect(() => {
    svc.connect()

    return svc.disconnect
  }, [])
  return (
    <div className="FileStoragePage">
      <FileExplorer />
      <FileRepresentation />
    </div>
  )
}
