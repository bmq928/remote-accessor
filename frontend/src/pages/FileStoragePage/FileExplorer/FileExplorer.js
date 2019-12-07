import React from 'react'
import { useGlobal } from 'reactn'

import {svc, utils} from '../vendors'
import FileExplorerNode from './FileExplorerNode'
import './FileExplorer.scss'

export default function FileExplorer() {
  const [rootNode, setRootNode] = useGlobal('rootNode')
  const [, setCurrentFolder] = useGlobal('currentFolder')
  const [, setLoading] = useGlobal('loading')

  function exploreFolder(
    path,
    nodeIsFile,
    nodeChildren,
    changeCurrentFolder = false
  ) {
    if (nodeIsFile) return

    setLoading(true)
    const currentFolderInTree = utils.findNodeBy(rootNode, node => node.path === path)
    if (nodeChildren && nodeChildren.length) {
      if (changeCurrentFolder) setCurrentFolder(currentFolderInTree)
      setLoading(false)
      return
    }
    svc.showFolderTree(path, 2).then(resp => {
      currentFolderInTree.children = [...resp.children]
      setRootNode({ ...rootNode })
      if (changeCurrentFolder) setCurrentFolder(resp)
    })
    .finally(() => setLoading(false))
  }

  return (
    <table className="FileExplorer">
      <tbody>
        <tr>
          <td width="260px" align="left" valign="top">
            <ul className="ztree">
              <FileExplorerNode
                // {...rootNode}
                // eslint-disable-next-line react/no-children-prop
                children={rootNode.children}
                path={rootNode.path}
                name={rootNode.name}
                isFile={rootNode.isFile}
                nodeOnClick={exploreFolder}
                rootName="/"
              />
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
