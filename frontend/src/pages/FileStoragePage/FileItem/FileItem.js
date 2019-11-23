import React from 'react'
import FileIcon, { defaultStyles } from 'react-file-icon'
import PropTypes from 'prop-types'

import folderIcon from './folder-icon.png'
import './FileItem.scss'

export default function FileItem({ itemPath, isFolder }) {
  const iconSize = 55
  const name = getBaseName(itemPath)
  const ext = getExt(name)
  
  function getExt(name) {
    const chunks = name.split('.')
    return chunks.length > 1 ? chunks[chunks.length - 1] : ''
  }

  function getBaseName(path) {
    const chunks = path.split('/')
    return chunks[chunks.length - 1 ]
  }

  return (
    <div className="FileItem">
      {isFolder && <img src={folderIcon} height={iconSize} width={iconSize} alt="folder" />}
      {!isFolder && (
        <FileIcon extension={ext} {...defaultStyles[ext]} size={iconSize} />
      )}
      <div className="file-detail">
        <small>{name}</small>
      </div>
    </div>
  )
}

FileItem.propTypes = {
  itemPath: PropTypes.string.isRequired,
  isFolder: PropTypes.bool.isRequired,
}
