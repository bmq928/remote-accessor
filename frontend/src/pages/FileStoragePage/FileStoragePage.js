import React, { useEffect } from 'react'
import { setGlobal, useGlobal } from 'reactn'

import {
  FileExplorer,
  FileRepresentation,
  svc,
  constants,
  LoadingContainer,
  Preview,
  store,
} from './vendors'
import './FileStoragePage.scss'


setGlobal(store)
export default function FileStoragePage() {
  const [, setRootNode] = useGlobal('rootNode')
  const [, setCurrentFolder] = useGlobal('currentFolder')
  const [, setLoading] = useGlobal('loading')

  useEffect(() => {
    const rootFolder = constants.FILE_EXPLORER_ROOT
    setLoading(true)
    svc
      .showFolderTree(rootFolder, 3)
      .then(resp => {
        setRootNode(resp)
        setCurrentFolder(resp)
      })
      .catch(e => e)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="FileStoragePage">
      <FileExplorer />
      <FileRepresentation />
      <LoadingContainer />
      <Preview />
    </div>
  )
}
