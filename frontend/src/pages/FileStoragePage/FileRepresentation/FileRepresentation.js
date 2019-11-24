import React, { useState } from 'react'
import { useGlobal } from 'reactn'
import shortid from 'shortid'

import { FileItem } from '../vendors'
import './FileRepresentation.scss'

export default function FileRepresentation() {
  const [rootNode] = useGlobal('rootNode')
  const [itemSelected, setItemSelected] = useState([])

  const NUM_ITEM_PER_ROW = 6
  const fileOrFolders = rootNode.children
  const rows = splitArrayIntoChunkWithLength(fileOrFolders, NUM_ITEM_PER_ROW)

  function splitArrayIntoChunkWithLength(arr, chunkLength) {
    const chunks = []
    const numChunk = Math.floor(
      arr.length % chunkLength === 0
        ? arr.length / chunkLength
        : arr.length / chunkLength + 1
    )

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

  function openItem() {}

  return (
    <div
      className="FileRepresentation"
      onClick={() => deSelectAllItem()}
      onKeyDown={() => {}}
    >
      {rows.map(row => (
        <div className="columns" key={row.id}>
          {row.map(item => (
            <div
              key={item.path}
              className={
                itemSelected.includes(item) ? 'column item-selected' : 'column'
              }
              onClick={evt => selectItem(evt, item)}
              onDoubleClick={evt => openItem(evt, item)}
              onKeyUp={() => {}}
            >
              <FileItem itemPath={item.path} isFolder={!item.isFile} />
            </div>
          ))}
          {// the rest part to make sure each row have enough
          new Array(NUM_ITEM_PER_ROW - row.length).fill().map(() => (
            <div key={shortid.generate()} className="column" />
          ))
          }
        </div>
      ))}
    </div>
  )
}
