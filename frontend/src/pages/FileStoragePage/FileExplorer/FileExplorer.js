import React, { useEffect } from 'react'
import { useGlobal } from 'reactn'

import { svc, constants } from '../vendors'
import FileExplorerNode from './FileExplorerNode'
import './FileExplorer.scss'

export default function FileExplorer() {
  const [rootNode, setRootNode] = useGlobal('rootNode')

  useEffect(() => {
    const rootFolder = constants.FILE_EXPLORER_ROOT
    svc.showFolderTree(rootFolder, 3)
      .then(resp => setRootNode(resp))
      .catch(e => e)
  })

  function nodeOnClick(path, nodeIsFile, nodeChildItems) {
    console.log({ path, nodeIsFile, nodeChildItems })
  }

  return (
    <table className="FileExplorer">
      <tbody>
        <tr>
          <td width="260px" align="left" valign="top">
            <ul className="ztree" style={{ width: '260px', overflow: 'auto' }}>
              <FileExplorerNode
                {...rootNode}
                nodeOnClick={nodeOnClick}
                rootName="/"
              />
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
