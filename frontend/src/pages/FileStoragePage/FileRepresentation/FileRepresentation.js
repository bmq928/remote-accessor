/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useGlobal } from 'reactn'
import shortid from 'shortid'

import { FileItem, svc, Breadcrumb, utils } from '../vendors'
import './FileRepresentation.scss'

export default function FileRepresentation() {
  const [rootNode, setRootNode] = useGlobal('rootNode')
  const [currentFolder, setCurrentFolder] = useGlobal('currentFolder')
  const [, setLoading] = useGlobal('loading')
  const [, setPreviewing] = useGlobal('previewing')
  const [, setPreviewContent] = useGlobal('previewContent')
  const [, setPreviewType] = useGlobal('previewType')
  const [, setpreviewFileExt] = useGlobal('previewFileExt')
  const [itemSelected, setItemSelected] = useState([])
  if (!window._clickTimeout) window._clickTimeout = {}

  const NUM_ITEM_PER_ROW = 6
  const fileOrFolders = currentFolder.children
  const rows = splitArrayIntoChunkWithLength(fileOrFolders, NUM_ITEM_PER_ROW)

  function splitArrayIntoChunkWithLength(arr, chunkLength) {
    const chunks = []
    const numChunk = Math.floor(
      arr.length % chunkLength === 0
        ? arr.length / chunkLength
        : arr.length / chunkLength + 1
    )

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numChunk; ++i) {
      const chunk = arr.filter(
        (val, idx) => Math.floor(idx / chunkLength) === i
      )

      if (chunk.length) {
        chunk.id = shortid.generate()
        chunks.push(chunk)
      }
    }
    return chunks
  }

  function selectItem(evt, item) {
    evt.stopPropagation()
    setItemSelected([item])
  }

  function deSelectAllItem() {
    setItemSelected([])
  }

  function openItem(evt, item) {
    evt.stopPropagation()
    if (item.isFile) {
      openFile(item)
      return
    }

    if (!item.isFile) {
      openFolder(item)
    }
  }

  function openFile(item) {
    setPreviewing(true)
    svc.readFileContent(item.path).then(resp => {
      if (resp.error) throw new Error(resp.error)
      setPreviewContent(resp.content)
      setPreviewType(resp.isText ? 'text' : 'base64')
      setpreviewFileExt(resp.ext)
    })
  }

  function openFolder(item) {
    if (item.children.length) {
      setCurrentFolder(item)
      updateNodeInRootNode(item)
      return
    }

    setLoading(true)
    svc
      .showFolderTree(item.path)
      .then(resp => {
        setCurrentFolder(resp)
        updateNodeInRootNode(resp)
      })
      .finally(() => setLoading(false))
  }

  function updateNodeInRootNode(nodeData) {
    if (nodeData.path === rootNode.path) return
    const parrentNodePath = nodeData.path
      .split('/')
      .filter((val, idx, arr) => idx !== arr.length - 1)
      .join('/')
    const parrentNode = utils.findNodeBy(
      rootNode,
      node => node.path === parrentNodePath
    )
    const siblingAndCurFolderNodes = parrentNode.children.map(child => {
      if (child.path === nodeData.path) return nodeData
      return child
    })

    parrentNode.children = [...siblingAndCurFolderNodes]
    setRootNode(rootNode)
  }

  function handleClick(evt, item) {
    const itemPath = item.path
    const timeDefineDbClick = 200

    if (!window._clickTimeout[itemPath]) {
      selectItem(evt, item)
      window._clickTimeout[itemPath] = setTimeout(() => {
        clearTimeout(window._clickTimeout[itemPath])
        window._clickTimeout[itemPath] = null
      }, timeDefineDbClick)
    } else {
      openItem(evt, item)
      clearTimeout(window._clickTimeout[itemPath])
      window._clickTimeout[itemPath] = null
    }
  }

  return (
    <div
      className="FileRepresentation"
      onClick={() => deSelectAllItem()}
      onKeyDown={() => {}}
    >
      <Breadcrumb />
      {rows.map(row => (
        <div className="columns" key={row.id}>
          {row.map(item => (
            <div
              key={item.path}
              className={
                itemSelected.includes(item) ? 'column item-selected' : 'column'
              }
              onClick={evt => handleClick(evt, item)}
              onKeyDown={() => {}}
            >
              <div>
                <FileItem itemPath={item.path} isFolder={!item.isFile} />
              </div>
            </div>
          ))}
          {// the rest part to make sure each row have enough
          new Array(NUM_ITEM_PER_ROW - row.length).fill().map(() => (
            <div key={shortid.generate()} className="column" />
          )) //
          }
        </div>
      ))}
    </div>
  )
}
