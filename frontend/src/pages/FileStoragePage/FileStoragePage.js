import React from 'react'
import { setGlobal } from 'reactn'

import {
  FileExplorer,
  FileRepresentation,
  LoadingContainer,
  Preview,
  store,
} from './vendors'
import './FileStoragePage.scss'

export default function FileStoragePage() {
  setGlobal(store)
  return (
    <div className="FileStoragePage">
      <FileExplorer />
      <FileRepresentation />
      <LoadingContainer />
      <Preview />
    </div>
  )
}
