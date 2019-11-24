/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function FileExplorerNode({
  isFile,
  name,
  children,
  nodeOnClick,
  path,
}) {
  const [showChild, setShowChild] = useState(false)
  function toggleShowChild() {
    setShowChild(!showChild)
  }

  function clickNodeAndToggleShowChild(
    usingToggle = false,
    changeCurrenFolder = false
  ) {
    if (usingToggle || !showChild) toggleShowChild()
    nodeOnClick(path, isFile, children, changeCurrenFolder)
  }

  function getListFileComponent() {
    const listFile = children
      .filter(() => showChild)
      .filter(f => f.isFile)
      .map((file, idx) => (
        <FileExplorerNode
          key={`file-${idx.toString()}`}
          {...file}
          nodeOnClick={nodeOnClick}
        />
      ))
    return listFile
  }

  function getListFolderComponent() {
    const listFolder = children
      .filter(() => showChild)
      .filter(f => !f.isFile)
      .map((folder, i) => (
        <FileExplorerNode
          key={`folder-${i.toString()}`}
          {...folder}
          nodeOnClick={nodeOnClick}
        />
      ))
    return listFolder
  }

  function getItemBadge() {
    const numChild = children.length
    if (isFile) return 'button switch center_docu'

    return numChild && showChild
      ? 'button switch roots_open'
      : 'button switch center_close'
  }

  function getItemIcon() {
    const numChild = children.length
    if (isFile) return 'button ico_docu'

    return numChild && showChild ? 'button ico_open' : 'button ico_close'
  }

  return (
    <li>
      <span
        className={getItemBadge()}
        onClick={() => clickNodeAndToggleShowChild(true)}
      ></span>
      <span className="link" onClick={() => clickNodeAndToggleShowChild(false, true)}>
        <span className={getItemIcon()}></span>
        <span className="node_name">{name}</span>
      </span>
      <ul className="line">
        {getListFolderComponent()}
        {getListFileComponent()}
      </ul>
    </li>
  )
}

FileExplorerNode.propTypes = {
  isFile: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
  nodeOnClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}
