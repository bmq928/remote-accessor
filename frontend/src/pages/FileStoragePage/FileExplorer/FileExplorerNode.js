import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function FileExplorerNode({
  isFile,
  rootName,
  files,
  folders,
  nodeOnClick,
  path,
}) {
  const [showChild, setShowChild] = useState(false)

  function toggleShowChild() {
    setShowChild(!showChild)
  }

  function getListFileComponent() {
    const listFile = files
      .filter(() => showChild)
      .map((file, idx) => (
        <FileExplorerNode
          key={'file' + idx.toString()}
          {...file}
          nodeOnClick={nodeOnClick}
        />
      ))
    return listFile
  }

  function getListFolderComponent() {
    const listFolder = folders
      .filter(() => showChild)
      .map((folder, i) => (
        <FileExplorerNode
          key={'folder' + i.toString()}
          {...folder}
          nodeOnClick={nodeOnClick}
        />
      ))
    return listFolder
  }

  function getItemBadge() {
    const numChild = files.length + folders.length
    if (isFile) return 'button switch center_docu'

    return numChild && showChild
      ? 'button switch roots_open'
      : 'button switch center_close'
  }

  function getItemIcon() {
    const numChild = files.length + folders.length
    if (isFile) return 'button ico_docu'

    return numChild && showChild ? 'button ico_open' : 'button ico_close'
  }

  return (
    <li>
      <span className={getItemBadge()} onClick={e => toggleShowChild()}></span>
      <span className="link" onClick={e => nodeOnClick(path, isFile, [...folders, ...files])}>
        <span className={getItemIcon()}></span>
        <span className="node_name">{rootName}</span>
      </span>
      <ul className="line">
        {getListFolderComponent()}
        {getListFileComponent()}
      </ul>
    </li>
  )
}

const NodePropType = {
  isFile: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  
}

NodePropType.children = PropTypes.arrayOf(
  PropTypes.shape(NodePropType).isRequired
)

FileExplorerNode.propTypes = {
  isFile: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      isFile: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,

    })
  ).isRequired,
  nodeOnClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}
