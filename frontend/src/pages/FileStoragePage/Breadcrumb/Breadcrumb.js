/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useGlobal } from 'reactn'

import { utils } from '../vendors'

export default function Breadcrumb() {
  const [rootNode] = useGlobal('rootNode')
  const [currentFolder, setCurrentFolder] = useGlobal('currentFolder')

  const curFolderRelativePath = currentFolder.path.replace(rootNode.path, '')
  const breadcrumbItems = curFolderRelativePath.split('/').filter(i => i)

  function goToFolder(idxFolder) {
    const folderParentNames = breadcrumbItems.filter((item, i) => i < idxFolder)
    const folderToGoName = breadcrumbItems[idxFolder]
    const folderToGoPath = [
      rootNode.path,
      ...folderParentNames,
      folderToGoName,
    ].join('/')
    const folderToGoNode = utils.findNodeBy(
      rootNode,
      f => f.path === folderToGoPath
    )
    setCurrentFolder(folderToGoNode)
  }

  function ExtraSlash() {
    return (
      <>
        <li>
          <a></a>
        </li>
        {breadcrumbItems.length === 0 && (
          <li>
            <a></a>
          </li>
        )}
      </>
    )
  }

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {breadcrumbItems.map((item, idx) => (
          <li key={item} onClick={() => goToFolder(idx)}>
            <a>{item}</a>
          </li>
        ))}
        <ExtraSlash />
      </ul>
    </nav>
  )
}
