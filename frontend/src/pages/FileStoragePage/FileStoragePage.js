import React, { useEffect } from 'react'
import { setGlobal } from 'reactn'

import {
  FileExplorer,
  FileRepresentation,
  svc,
  store,
  constants,
} from './vendors'
import './FileStoragePage.scss'

export default function FileStoragePage() {
  setGlobal(store)
  useEffect(() => {
    svc.showFolderTree(constants.FILE_EXPLORER_ROOT)
      .then(resp => console.log({resp}))
  }, [])
  return (
    <div className="FileStoragePage">
      <FileExplorer />
      <FileRepresentation />
    </div>
  )
}
